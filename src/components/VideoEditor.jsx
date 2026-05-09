import React, { useRef, useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Timeline from './Timeline.jsx';
import { useFFmpeg } from '../hooks/useFFmpeg.js';

function fmt(s) {
  if (s == null || isNaN(s)) return '0:00.0';
  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(1).padStart(4, '0');
  return `${m}:${sec}`;
}

export default function VideoEditor() {
  const videoRef = useRef(null);
  const wavesurferRef = useRef(null);
  const wsReadyRef = useRef(false);

  const [clips, setClips] = useState([]);
  const [selectedClip, setSelectedClip] = useState(null);
  const [message, setMessage] = useState('Ready. Add a video to get started.');

  const { ffmpeg, fetchFile, loaded, progress, load } = useFFmpeg();

  // ── Init WaveSurfer ───────────────────────────────────────────
  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#0ea5a4',
      progressColor: '#3b82f6',
      height: 80,
      interact: true,
    });
    return () => wavesurferRef.current?.destroy();
  }, []);

  // ── Sync video → waveform ─────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      const ws = wavesurferRef.current;
      if (ws && wsReadyRef.current && video.duration > 0) {
        ws.seekTo(video.currentTime / video.duration);
      }
    };
    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  // ── Add clips ─────────────────────────────────────────────────
  function handleFiles(e) {
    const files = Array.from(e.target.files).filter(f => f.type.startsWith('video/'));
    files.forEach(f => {
      const url = URL.createObjectURL(f);
      const probe = document.createElement('video');
      probe.src = url;
      probe.onloadedmetadata = () => {
        setClips(prev => [
          ...prev,
          { file: f, name: f.name, start: 0, end: probe.duration, duration: probe.duration, url },
        ]);
      };
    });
    e.target.value = '';
  }

  // ── Trim ─────────────────────────────────────────────────────
  function setClipRange(index, start, end) {
    setClips(prev =>
      prev.map((c, i) =>
        i === index
          ? { ...c, start: Number(start), end: end === null ? null : Number(end) }
          : c
      )
    );
  }

  // ── Remove ───────────────────────────────────────────────────
  function removeClip(i) {
    setClips(prev => prev.filter((_, idx) => idx !== i));
    if (selectedClip === i) setSelectedClip(null);
    else if (selectedClip > i) setSelectedClip(s => s - 1);
  }

  // ── Preview ──────────────────────────────────────────────────
  function previewClip(c) {
    const video = videoRef.current;
    video.src = c.url;
    video.currentTime = c.start || 0;
    video.play();
    wsReadyRef.current = false;
    wavesurferRef.current?.load(c.url);
    wavesurferRef.current?.once('ready', () => { wsReadyRef.current = true; });
  }

  // ── Helpers ──────────────────────────────────────────────────
  function triggerDownload(data, filename, mime) {
    const url = URL.createObjectURL(new Blob([data.buffer], { type: mime }));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  // ── Export MP4 ───────────────────────────────────────────────
  async function exportVideo() {
    if (clips.length === 0) return alert('Add at least one clip first.');
    try {
      setMessage('Loading FFmpeg…');
      await load();
      const segFiles = [];

      for (let i = 0; i < clips.length; i++) {
        const c = clips[i];
        const inName = `in${i}.mp4`;
        const segName = `seg${i}.mp4`;
        setMessage(`Encoding clip ${i + 1} of ${clips.length}…`);
        await ffmpeg.writeFile(inName, await fetchFile(c.file));
        const start = c.start || 0;
        const dur = c.end != null ? c.end - start : null;
        await ffmpeg.exec([
          '-ss', `${start}`, '-i', inName,
          ...(dur ? ['-t', `${dur}`] : []),
          '-c:v', 'libx264', '-preset', 'veryfast', '-c:a', 'aac',
          segName,
        ]);
        segFiles.push(segName);
      }

      await ffmpeg.writeFile('concat.txt', segFiles.map(f => `file '${f}'`).join('\n'));
      setMessage('Joining clips…');
      try {
        await ffmpeg.exec(['-f', 'concat', '-safe', '0', '-i', 'concat.txt', '-c', 'copy', 'output.mp4']);
      } catch {
        setMessage('Re-encoding for compatibility…');
        await ffmpeg.exec(['-f', 'concat', '-safe', '0', '-i', 'concat.txt',
          '-c:v', 'libx264', '-preset', 'veryfast', '-c:a', 'aac', 'output.mp4']);
      }

      const data = await ffmpeg.readFile('output.mp4');
      triggerDownload(data, 'edited-video.mp4', 'video/mp4');
      setMessage('✅ MP4 download started!');
    } catch (err) {
      console.error(err);
      setMessage(`❌ Export failed: ${err.message}`);
    }
  }

  // ── Export MP3 ───────────────────────────────────────────────
  async function exportAudio() {
    if (clips.length === 0) return alert('Add at least one clip first.');
    try {
      setMessage('Loading FFmpeg…');
      await load();
      const segFiles = [];

      for (let i = 0; i < clips.length; i++) {
        const c = clips[i];
        const inName = `in${i}.mp4`;
        const segName = `seg${i}.mp3`;
        setMessage(`Extracting audio ${i + 1} of ${clips.length}…`);
        await ffmpeg.writeFile(inName, await fetchFile(c.file));
        const start = c.start || 0;
        const dur = c.end != null ? c.end - start : null;
        await ffmpeg.exec([
          '-ss', `${start}`, '-i', inName,
          ...(dur ? ['-t', `${dur}`] : []),
          '-vn', '-c:a', 'libmp3lame', segName,
        ]);
        segFiles.push(segName);
      }

      await ffmpeg.writeFile('concat.txt', segFiles.map(f => `file '${f}'`).join('\n'));
      setMessage('Merging audio…');
      await ffmpeg.exec(['-f', 'concat', '-safe', '0', '-i', 'concat.txt', '-c', 'copy', 'output.mp3']);
      const data = await ffmpeg.readFile('output.mp3');
      triggerDownload(data, 'audio.mp3', 'audio/mp3');
      setMessage('✅ MP3 download started!');
    } catch (err) {
      console.error(err);
      setMessage(`❌ Export failed: ${err.message}`);
    }
  }

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="video-editor">

      <div className="toolbar-row">
        <label className="file-label">
          📁 Add Videos
          <input className="file-input" type="file" accept="video/*" multiple onChange={handleFiles} />
        </label>
        <button className="secondary" onClick={() => load().then(() => setMessage('✅ FFmpeg ready!'))} disabled={loaded}>
          {loaded ? '✅ FFmpeg Ready' : '⚡ Preload FFmpeg'}
        </button>
        <button onClick={exportVideo} disabled={clips.length === 0}>⬇ Export MP4</button>
        <button onClick={exportAudio} disabled={clips.length === 0}>🎵 Export MP3</button>
      </div>

      {progress > 0 && progress < 100 && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          <span className="progress-label">{progress}%</span>
        </div>
      )}

      <div className="editor-body">
        <div className="preview-column">
          <div style={{ position: 'relative' }}>
            <video 
              ref={videoRef} 
              className={`editor-preview ${clips.length > 0 && selectedClip !== null ? 'playing' : ''}`} 
              controls={false}
            />
            {/* Glass-morphism playback controls */}
            <div className="playback-controls">
              <button 
                onClick={() => videoRef.current?.play()}
                title="Play"
              >
                ▶
              </button>
              <button 
                onClick={() => videoRef.current?.pause()}
                title="Pause"
              >
                ⏸
              </button>
              <button 
                onClick={() => { if (videoRef.current) videoRef.current.currentTime = 0; }}
                title="Stop"
              >
                ⏹
              </button>
            </div>
          </div>
          <div id="waveform" style={{ width: '100%', marginTop: 12, borderRadius: 6, overflow: 'hidden' }} />
          <div className="waveform-controls">
            <button onClick={() => wavesurferRef.current?.play()}>▶ Play</button>
            <button onClick={() => wavesurferRef.current?.pause()}>⏸ Pause</button>
            <label>Zoom:</label>
            <input type="range" min="0" max="200" defaultValue="0"
              onChange={e => wavesurferRef.current?.zoom(Number(e.target.value))} />
          </div>
          {clips.length > 0 && <p className="hint">💡 Click Preview on a clip to load it here. Use the floating controls for playback.</p>}
        </div>

        <aside className="clips-sidebar">
          <h3>Clips {clips.length > 0 && <span className="badge">{clips.length}</span>}</h3>
          {clips.length === 0 && <p className="muted">No clips yet — use "Add Videos" above.</p>}

          {clips.map((c, idx) => (
            <div key={idx} className={`clip-item${selectedClip === idx ? ' selected' : ''}`}>
              <div className="clip-row">
                <div className="clip-name" title={c.name}>{c.name}</div>
                <div className="clip-actions">
                  <button onClick={() => { setSelectedClip(idx); previewClip(c); }}>▶ Preview</button>
                  <button className="danger" onClick={() => removeClip(idx)}>✕</button>
                </div>
              </div>
              <div className="clip-controls">
                <div className="range-row">
                  <label>Start <span className="time-badge">{fmt(c.start)}</span></label>
                  <input type="range" min="0" max={c.duration ?? 30} step="0.1"
                    value={c.start} onChange={e => setClipRange(idx, e.target.value, c.end)} />
                </div>
                <div className="range-row">
                  <label>End <span className="time-badge">{fmt(c.end ?? c.duration)}</span></label>
                  <input type="range" min={c.start} max={c.duration ?? 30} step="0.1"
                    value={c.end ?? c.duration ?? 30}
                    onChange={e => setClipRange(idx, c.start, e.target.value)} />
                </div>
                <div className="clip-duration-info">
                  Duration: {fmt((c.end ?? c.duration ?? 0) - c.start)}
                </div>
              </div>
            </div>
          ))}
        </aside>
      </div>

      {clips.length > 0 && (
        <Timeline
          clips={clips}
          onRemove={removeClip}
          onSelect={i => { setSelectedClip(i); previewClip(clips[i]); }}
          selectedIndex={selectedClip}
        />
      )}

      <div className="status-row">
        <span className="status-dot" style={{ background: loaded ? '#22c55e' : '#f59e0b' }} />
        <strong>Status:</strong>&nbsp;{message}
      </div>
      <div className="note muted">
        <small>🔒 All processing happens in your browser. No uploads. No watermarks.</small>
      </div>
    </div>
  );
}