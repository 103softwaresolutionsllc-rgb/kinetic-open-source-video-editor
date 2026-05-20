import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import WaveSurfer from 'wavesurfer.js';
import MultiLayerTimeline from './MultiLayerTimeline.jsx';
import TransitionControls from './TransitionControls.jsx';
import { useFFmpeg } from '../hooks/useFFmpeg.js';
import { useEditor } from '../contexts/EditorContext.jsx';
import { useTimeline } from '../contexts/TimelineContext.jsx';
import {
  VIDEO_LAYER_ID,
  AUDIO_LAYER_ID,
  clipTrimmedDuration,
  findClipAtTimeOnProject,
  findClipById,
  getOrderedVideoClips,
  getOrderedAudioClips,
  projectDuration,
  isAudioFile,
  isVideoFile,
} from '../utils/clipTimeline.js';
import { applyBrandToVideo, buildFadeFilters } from '../utils/exportBranding.js';
import { mixAudioTrackIntoVideo } from '../utils/exportAudioMix.js';

function fmt(s) {
  if (s == null || isNaN(s)) return '0:00.0';

  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(1).padStart(4, '0');

  return `${m}:${sec}`;
}

export default function VideoEditor() {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const audioFileInputRef = useRef(null);
  const wavesurferRef = useRef(null);
  const wsReadyRef = useRef(false);
  const previewIsAudioRef = useRef(false);

  const [previewClipId, setPreviewClipId] = useState(null);
  const [message, setMessage] = useState('Ready. Add a video to get started.');

  const { ffmpeg, fetchFile, loaded, progress, load } = useFFmpeg();
  const { registerActions, setFFmpegLoaded, brandSettings } = useEditor();
  const {
    layers,
    currentTime,
    selectedClip,
    isPlaying,
    addClip,
    removeClip,
    updateClip,
    selectClip,
    setCurrentTime,
    setDuration,
    setPlaying,
    clearProject: clearTimeline,
  } = useTimeline();

  const videoClips = useMemo(
    () => getOrderedVideoClips(layers),
    [layers]
  );

  const audioClips = useMemo(
    () => getOrderedAudioClips(layers),
    [layers]
  );

  const selectedClipIndex = useMemo(
    () => videoClips.findIndex((c) => c.id === selectedClip),
    [videoClips, selectedClip]
  );

  const hasContent = videoClips.length > 0 || audioClips.length > 0;

  useEffect(() => {
    setDuration(Math.max(projectDuration(layers), 60));
  }, [layers, setDuration]);

  // ─────────────────────────────────────────────
  // WaveSurfer Init
  // ─────────────────────────────────────────────
  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#0ea5a4',
      progressColor: '#3b82f6',
      height: 80,
      interact: true,
    });

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, []);

  // ─────────────────────────────────────────────
  // RAF timeline sync (sequence position when previewing)
  // ─────────────────────────────────────────────
  useEffect(() => {
    let frame;

    const updateTime = () => {
      const video = videoRef.current;

      if (previewClipId) {
        const found = findClipById(layers, previewClipId);

        if (found?.clip.type === 'audio' && wavesurferRef.current && wsReadyRef.current) {
          const { clip } = found;
          const wsTime = wavesurferRef.current.getCurrentTime();
          setCurrentTime(
            (clip.timelineStart ?? 0) +
              Math.max(0, wsTime - (clip.sourceStart ?? 0))
          );
        } else if (video && found?.clip.type !== 'audio') {
          const { clip } = found;
          setCurrentTime(
            (clip.timelineStart ?? 0) +
              Math.max(0, (video.currentTime || 0) - (clip.sourceStart ?? 0))
          );
        }
      }

      frame = requestAnimationFrame(updateTime);
    };

    frame = requestAnimationFrame(updateTime);

    return () => cancelAnimationFrame(frame);
  }, [layers, previewClipId, setCurrentTime]);

  // ─────────────────────────────────────────────
  // Video event listeners
  // ─────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const onTimeUpdate = () => {
      const ws = wavesurferRef.current;

      if (
        ws &&
        wsReadyRef.current &&
        video.duration > 0
      ) {
        const target = video.currentTime / video.duration;
        const current = ws.getCurrentTime() / video.duration;

        if (Math.abs(target - current) > 0.01) {
          ws.seekTo(target);
        }
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  // ─────────────────────────────────────────────
  // Timeline handlers
  // ─────────────────────────────────────────────
  const handleTimelineSeek = useCallback(
    (newTime) => {
      const hit = findClipAtTimeOnProject(layers, newTime);

      if (!hit?.clip) return;

      setCurrentTime(newTime);
      selectClip(hit.clip.id, hit.layerId);
      previewClip(hit.clip, hit.clip.id, hit.layerId);

      const mediaTime = (hit.clip.sourceStart ?? 0) + hit.localTime;

      if (hit.clip.type === 'audio') {
        wavesurferRef.current?.setTime(mediaTime);
      } else if (videoRef.current) {
        videoRef.current.currentTime = mediaTime;
      }
    },
    [layers, selectClip, setCurrentTime]
  );

  const handleClipSelect = useCallback(
    (clipId, layerId) => {
      const found = findClipById(layers, clipId);
      if (found) {
        previewClip(found.clip, clipId, layerId);
      }
    },
    [layers]
  );

  const handleFadeChange = useCallback(
    (clipIndex, field, value) => {
      const clip = videoClips[clipIndex];
      if (!clip) return;
      updateClip(VIDEO_LAYER_ID, clip.id, { [field]: value });
    },
    [videoClips, updateClip]
  );

  const handlePlayToggle = useCallback(
    (playing) => {
      setPlaying(playing);

      if (previewIsAudioRef.current) {
        if (playing) wavesurferRef.current?.play();
        else wavesurferRef.current?.pause();
        return;
      }

      const video = videoRef.current;
      if (!video) return;
      if (playing) video.play();
      else video.pause();
    },
    [setPlaying]
  );

  const clearProject = useCallback(() => {
    clearTimeline();
    setPreviewClipId(null);
    previewIsAudioRef.current = false;
    setMessage('Project cleared.');

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }

    wavesurferRef.current?.empty();
    wsReadyRef.current = false;
  }, [clearTimeline]);

  useEffect(() => {
    setFFmpegLoaded(loaded);
  }, [loaded, setFFmpegLoaded]);


  function probeMediaDuration(url, isVideo) {
    return new Promise((resolve) => {
      const probe = document.createElement(isVideo ? 'video' : 'audio');
      probe.preload = 'metadata';
      probe.src = url;

      probe.onloadedmetadata = () => {
        resolve(probe.duration || 0);
        probe.remove();
      };

      probe.onerror = () => {
        resolve(0);
        probe.remove();
      };
    });
  }

  async function importMediaFiles(files, layerId, type) {
    const isVideo = type === 'video';

    for (const f of files) {
      const url = URL.createObjectURL(f);
      const clipDuration = await probeMediaDuration(url, isVideo);

      addClip(layerId, {
        id: crypto.randomUUID(),
        file: f,
        name: f.name,
        url,
        type,
        duration: clipDuration,
        sourceStart: 0,
        sourceEnd: clipDuration,
        fadeIn: 0,
        fadeOut: 0,
        volume: 1,
        muted: false,
      });
    }
  }

  function handleFiles(e) {
    const files = Array.from(e.target.files).filter(isVideoFile);
    importMediaFiles(files, VIDEO_LAYER_ID, 'video');
    e.target.value = '';
  }

  function handleAudioFiles(e) {
    const files = Array.from(e.target.files).filter(isAudioFile);
    importMediaFiles(files, AUDIO_LAYER_ID, 'audio');
    e.target.value = '';
  }

  // ─────────────────────────────────────────────
  // Clip range update
  // ─────────────────────────────────────────────
  function setClipRange(layerId, clipId, sourceStart, sourceEnd) {
    updateClip(layerId, clipId, {
      sourceStart: Number(sourceStart),
      sourceEnd: sourceEnd === null ? null : Number(sourceEnd),
    });
  }

  function removeClipById(layerId, clipId) {
    removeClip(layerId, clipId);
    if (previewClipId === clipId) {
      setPreviewClipId(null);
      previewIsAudioRef.current = false;
    }
  }

  function previewClip(clip, clipId, layerId) {
    if (clipId != null && layerId) {
      setPreviewClipId(clipId);
      selectClip(clipId, layerId);
    }

    const isAudio = clip.type === 'audio';
    previewIsAudioRef.current = isAudio;
    wsReadyRef.current = false;

    const video = videoRef.current;

    if (isAudio) {
      video?.pause();
      wavesurferRef.current?.load(clip.url);
      wavesurferRef.current?.once('ready', () => {
        wsReadyRef.current = true;
        wavesurferRef.current?.setTime(clip.sourceStart ?? 0);
        wavesurferRef.current?.play();
      });
      return;
    }

    if (!video) return;

    video.src = clip.url;
    video.currentTime = clip.sourceStart ?? 0;

    wavesurferRef.current?.load(clip.url);
    wavesurferRef.current?.once('ready', () => {
      wsReadyRef.current = true;
    });

    video.play();
  }

  // ─────────────────────────────────────────────
  // Download helper
  // ─────────────────────────────────────────────
  function triggerDownload(data, filename, mime) {
    const blob = new Blob([data.buffer], { type: mime });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  // ─────────────────────────────────────────────
  // Export MP4
  // ─────────────────────────────────────────────
  async function exportVideo() {
    if (videoClips.length === 0) {
      alert('Add at least one clip first.');
      return;
    }

    try {
      setMessage('Loading FFmpeg…');

      await load();

      const segFiles = [];

      for (let i = 0; i < videoClips.length; i++) {
        const clip = videoClips[i];

        const inName = `in${i}.mp4`;
        const segName = `seg${i}.mp4`;

        setMessage(`Encoding clip ${i + 1} of ${videoClips.length}…`);

        await ffmpeg.writeFile(inName, await fetchFile(clip.file));

        const start = clip.sourceStart ?? 0;
        const sourceEnd = clip.sourceEnd ?? clip.duration;
        const dur = sourceEnd != null ? sourceEnd - start : null;
        const { videoFilters, audioFilters } = buildFadeFilters(clip, dur);

        await ffmpeg.exec([
          '-ss', `${start}`,
          '-i', inName,
          ...(dur ? ['-t', `${dur}`] : []),
          ...(videoFilters.length ? ['-vf', videoFilters.join(',')] : []),
          ...(audioFilters.length ? ['-af', audioFilters.join(',')] : []),
          '-c:v', 'libx264',
          '-preset', 'veryfast',
          '-c:a', 'aac',
          segName,
        ]);

        segFiles.push(segName);
      }

      await ffmpeg.writeFile(
        'concat.txt',
        segFiles.map((f) => `file '${f}'`).join('\n')
      );

      setMessage('Joining clips…');

      try {
        await ffmpeg.exec([
          '-f', 'concat',
          '-safe', '0',
          '-i', 'concat.txt',
          '-c', 'copy',
          'output.mp4',
        ]);
      } catch {
        setMessage('Re-encoding for compatibility…');

        await ffmpeg.exec([
          '-f', 'concat',
          '-safe', '0',
          '-i', 'concat.txt',
          '-c:v', 'libx264',
          '-preset', 'veryfast',
          '-c:a', 'aac',
          'output.mp4',
        ]);
      }

      let outputFile = 'output.mp4';

      if (brandSettings?.logo) {
        setMessage('Applying brand kit…');
        outputFile = await applyBrandToVideo(
          ffmpeg,
          fetchFile,
          brandSettings,
          outputFile
        );
      }

      if (audioClips.length > 0) {
        setMessage('Mixing audio track…');
        outputFile = await mixAudioTrackIntoVideo(
          ffmpeg,
          fetchFile,
          outputFile,
          audioClips
        );
      }

      const data = await ffmpeg.readFile(outputFile);

      triggerDownload(data, 'edited-video.mp4', 'video/mp4');

      setMessage('✅ MP4 download started!');
    } catch (err) {
      console.error(err);
      setMessage(`❌ Export failed: ${err.message}`);
    }
  }

  // ─────────────────────────────────────────────
  // Export MP3
  // ─────────────────────────────────────────────
  async function exportAudio() {
    const exportClips =
      audioClips.length > 0 ? audioClips : videoClips;

    if (exportClips.length === 0) {
      alert('Add at least one video or audio clip first.');
      return;
    }

    try {
      setMessage('Loading FFmpeg…');

      await load();

      const segFiles = [];
      const fromAudioTrack = audioClips.length > 0;

      for (let i = 0; i < exportClips.length; i++) {
        const clip = exportClips[i];
        const inName = `in${i}`;
        const segName = `seg${i}.mp3`;

        setMessage(`Processing audio ${i + 1} of ${exportClips.length}…`);

        await ffmpeg.writeFile(inName, await fetchFile(clip.file));

        const start = clip.sourceStart ?? 0;
        const sourceEnd = clip.sourceEnd ?? clip.duration;
        const dur = sourceEnd != null ? sourceEnd - start : null;

        await ffmpeg.exec([
          '-ss', `${start}`,
          '-i', inName,
          ...(dur ? ['-t', `${dur}`] : []),
          ...(fromAudioTrack ? [] : ['-vn']),
          '-c:a', 'libmp3lame',
          segName,
        ]);

        segFiles.push(segName);
      }

      await ffmpeg.writeFile(
        'concat.txt',
        segFiles.map((f) => `file '${f}'`).join('\n')
      );

      setMessage('Merging audio…');

      await ffmpeg.exec([
        '-f', 'concat',
        '-safe', '0',
        '-i', 'concat.txt',
        '-c', 'copy',
        'output.mp3',
      ]);

      const data = await ffmpeg.readFile('output.mp3');

      triggerDownload(data, 'audio.mp3', 'audio/mp3');

      setMessage('✅ MP3 download started!');
    } catch (err) {
      console.error(err);
      setMessage(`❌ Export failed: ${err.message}`);
    }
  }

  useEffect(() => {
    registerActions({
      addVideos: () => fileInputRef.current?.click(),
      addAudio: () => audioFileInputRef.current?.click(),
      preloadFFmpeg: () =>
        load().then(() => setMessage('✅ FFmpeg ready!')),
      clearProject,
      exportVideo,
      exportAudio,
      ffmpegLoaded: loaded,
      hasClips: hasContent,
    });
  }, [
    loaded,
    hasContent,
    registerActions,
    clearProject,
    brandSettings,
  ]);

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <div className="video-editor">
      <div className="toolbar-row">
        <label className="file-label">
          📁 Add Videos
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            accept="video/*"
            multiple
            onChange={handleFiles}
          />
        </label>

        <label className="file-label secondary">
          🎵 Add Audio
          <input
            ref={audioFileInputRef}
            className="file-input"
            type="file"
            accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac"
            multiple
            onChange={handleAudioFiles}
          />
        </label>

        <button
          className="secondary"
          onClick={() =>
            load().then(() => setMessage('✅ FFmpeg ready!'))
          }
          disabled={loaded}
        >
          {loaded ? '✅ FFmpeg Ready' : '⚡ Preload FFmpeg'}
        </button>

        <button
          onClick={exportVideo}
          disabled={videoClips.length === 0}
        >
          ⬇ Export MP4
        </button>

        <button
          onClick={exportAudio}
          disabled={!hasContent}
        >
          🎵 Export MP3
        </button>
      </div>

      {progress > 0 && progress < 100 && (
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />

          <span className="progress-label">{progress}%</span>
        </div>
      )}

      <div className="editor-body">
        <div className="preview-column">
          <div style={{ position: 'relative' }}>
            <video
              ref={videoRef}
              className={`editor-preview ${
                videoClips.length > 0 && selectedClip !== null
                  ? 'playing'
                  : ''
              }`}
              controls={false}
            />

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
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                  }
                }}
                title="Stop"
              >
                ⏹
              </button>
            </div>
          </div>

          <div
            id="waveform"
            style={{
              width: '100%',
              marginTop: 12,
              borderRadius: 6,
              overflow: 'hidden',
            }}
          />

          <div className="waveform-controls">
            <button onClick={() => wavesurferRef.current?.play()}>
              ▶ Play
            </button>

            <button onClick={() => wavesurferRef.current?.pause()}>
              ⏸ Pause
            </button>

            <label>Zoom:</label>

            <input
              type="range"
              min="0"
              max="200"
              defaultValue="0"
              onChange={(e) =>
                wavesurferRef.current?.zoom(Number(e.target.value))
              }
            />
          </div>

          {hasContent && (
            <p className="hint">
              💡 Click timeline clips to preview. Audio plays in the waveform.
            </p>
          )}
        </div>

        <aside className="clips-sidebar">
          <h3>
            Video{' '}
            {videoClips.length > 0 && (
              <span className="badge">{videoClips.length}</span>
            )}
          </h3>

          {videoClips.length === 0 && (
            <p className="muted">No video clips — use Add Videos above.</p>
          )}

          {videoClips.map((clip) => (
            <div
              key={clip.id}
              className={`clip-item${
                selectedClip === clip.id ? ' selected' : ''
              }`}
            >
              <div className="clip-row">
                <div
                  className="clip-name"
                  title={clip.name}
                >
                  {clip.name}
                </div>

                <div className="clip-actions">
                  <button
                    onClick={() => previewClip(clip, clip.id, VIDEO_LAYER_ID)}
                  >
                    ▶ Preview
                  </button>

                  <button
                    className="danger"
                    onClick={() => removeClipById(VIDEO_LAYER_ID, clip.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="clip-controls">
                <div className="range-row">
                  <label>
                    In{' '}
                    <span className="time-badge">
                      {fmt(clip.sourceStart ?? 0)}
                    </span>
                  </label>

                  <input
                    type="range"
                    min="0"
                    max={clip.duration}
                    step="0.1"
                    value={clip.sourceStart ?? 0}
                    onChange={(e) =>
                      setClipRange(
                        VIDEO_LAYER_ID,
                        clip.id,
                        e.target.value,
                        clip.sourceEnd
                      )
                    }
                  />
                </div>

                <div className="range-row">
                  <label>
                    Out{' '}
                    <span className="time-badge">
                      {fmt(clip.sourceEnd ?? clip.duration)}
                    </span>
                  </label>

                  <input
                    type="range"
                    min={clip.sourceStart ?? 0}
                    max={clip.duration}
                    step="0.1"
                    value={clip.sourceEnd ?? clip.duration}
                    onChange={(e) =>
                      setClipRange(
                        VIDEO_LAYER_ID,
                        clip.id,
                        clip.sourceStart ?? 0,
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="clip-duration-info">
                  Duration:{' '}
                  {fmt(clipTrimmedDuration(clip))}
                </div>
              </div>
            </div>
          ))}

          <h3 style={{ marginTop: 20 }}>
            Audio{' '}
            {audioClips.length > 0 && (
              <span className="badge">{audioClips.length}</span>
            )}
          </h3>

          {audioClips.length === 0 && (
            <p className="muted">No audio clips — use Add Audio above.</p>
          )}

          {audioClips.map((clip) => (
            <div
              key={clip.id}
              className={`clip-item${
                selectedClip === clip.id ? ' selected' : ''
              }`}
            >
              <div className="clip-row">
                <div className="clip-name" title={clip.name}>
                  {clip.name}
                </div>
                <div className="clip-actions">
                  <button
                    onClick={() => previewClip(clip, clip.id, AUDIO_LAYER_ID)}
                  >
                    ▶ Preview
                  </button>
                  <button
                    className="danger"
                    onClick={() => removeClipById(AUDIO_LAYER_ID, clip.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="clip-controls">
                <div className="range-row">
                  <label>
                    In{' '}
                    <span className="time-badge">
                      {fmt(clip.sourceStart ?? 0)}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={clip.duration}
                    step="0.1"
                    value={clip.sourceStart ?? 0}
                    onChange={(e) =>
                      setClipRange(
                        AUDIO_LAYER_ID,
                        clip.id,
                        e.target.value,
                        clip.sourceEnd
                      )
                    }
                  />
                </div>
                <div className="range-row">
                  <label>
                    Out{' '}
                    <span className="time-badge">
                      {fmt(clip.sourceEnd ?? clip.duration)}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={clip.sourceStart ?? 0}
                    max={clip.duration}
                    step="0.1"
                    value={clip.sourceEnd ?? clip.duration}
                    onChange={(e) =>
                      setClipRange(
                        AUDIO_LAYER_ID,
                        clip.id,
                        clip.sourceStart ?? 0,
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="range-row">
                  <label>
                    Volume{' '}
                    <span className="time-badge">
                      {Math.round((clip.volume ?? 1) * 100)}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.05"
                    value={clip.volume ?? 1}
                    onChange={(e) =>
                      updateClip(AUDIO_LAYER_ID, clip.id, {
                        volume: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="clip-duration-info">
                  Timeline: {fmt(clip.timelineStart ?? 0)} • Duration:{' '}
                  {fmt(clipTrimmedDuration(clip))}
                </div>
              </div>
            </div>
          ))}

          <TransitionControls
            clips={videoClips}
            selectedClip={selectedClipIndex >= 0 ? selectedClipIndex : null}
            onFadeChange={handleFadeChange}
          />
        </aside>
      </div>

      <MultiLayerTimeline
        onSeek={handleTimelineSeek}
        onClipSelect={handleClipSelect}
        onPlayToggle={handlePlayToggle}
      />

      <div className="status-row">
        <span
          className="status-dot"
          style={{
            background: loaded ? '#22c55e' : '#f59e0b',
          }}
        />

        <strong>Status:</strong>&nbsp;{message}
      </div>

      <div className="note muted">
        <small>
          🔒 All processing happens in your browser.
          No uploads. No watermarks.
        </small>
      </div>
    </div>
  );
}
