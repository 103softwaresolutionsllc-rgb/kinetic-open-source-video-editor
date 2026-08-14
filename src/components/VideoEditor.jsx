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
  findLayerForClip,
  getOrderedVideoClips,
  getOrderedAudioClips,
  projectDuration,
  isAudioFile,
  isVideoFile,
} from '../utils/clipTimeline.js';
import {
  applyBrandToVideo,
  brandSettingsAffectExport,
  buildFadeFilters,
} from '../utils/exportBranding.js';
import { buildEffectFilters } from '../utils/videoEffects.js';
import { mixAudioTrackIntoVideo } from '../utils/exportAudioMix.js';
import {
  filterExportAudioClips,
  shouldEncodeClipAudio,
} from '../utils/audioExportFilters.js';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts.js';
import {
  buildClipPreview,
  generateWaveformPreview,
} from '../utils/clipThumbnails.js';
import { useSequencePlayback } from '../hooks/useSequencePlayback.js';
import {
  exportProjectFile,
  importProjectFile,
} from '../services/ProjectStorage.js';
import { wipeLocalEditorData } from '../services/sessionPrivacy.js';
import {
  collectMediaUrls,
  revokeAllLayerMedia,
  revokeClipMedia,
} from '../utils/mediaUrls.js';

// Integrated components
import AudioMixer from './AudioMixer.jsx';
import PreviewCompositor from './PreviewCompositor.jsx';
import CropTool from './CropTool.jsx';
import ExportPresets from './ExportPresets.jsx';
import TextOverlay from './TextOverlay.jsx';

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
  const projectFileInputRef = useRef(null);
  const wavesurferRef = useRef(null);
  const wsReadyRef = useRef(false);
  const previewIsAudioRef = useRef(false);

  const [previewClipId, setPreviewClipId] = useState(null);
  const [message, setMessage] = useState('Ready. Add a video to get started.');
  const [activeTab, setActiveTab] = useState('clips');
  const [textOverlays, setTextOverlays] = useState([]);
  const [cropClip, setCropClip] = useState(null);
  const [cropImage, setCropImage] = useState(null);
  const [exportProgressLocal, setExportProgressLocal] = useState(0);
  const [isExportingLocal, setIsExportingLocal] = useState(false);

  const { ffmpeg, fetchFile, loaded, progress, load } = useFFmpeg();
  const { registerActions, setFFmpegLoaded, brandSettings, setBrandSettings } = useEditor();
  const {
    layers,
    currentTime,
    selectedClip,
    selectedLayer,
    isPlaying,
    addClip,
    removeClip,
    updateClip,
    selectClip,
    setCurrentTime,
    setDuration,
    setPlaying,
    splitClip,
    duplicateClip,
    clearProject: clearTimeline,
    loadProject,
    duration,
  } = useTimeline();

  const videoClips = useMemo(
    () => getOrderedVideoClips(layers),
    [layers]
  );

  const audioClips = useMemo(
    () => getOrderedAudioClips(layers),
    [layers]
  );


  const selectedVideoClip = useMemo(() => {
    if (!selectedClip) return null;
    const layer = findLayerForClip(layers, selectedClip);
    if (layer?.type !== 'video') return null;
    return layer.clips.find((c) => c.id === selectedClip) ?? null;
  }, [selectedClip, layers]);

  const hasContent = videoClips.length > 0 || audioClips.length > 0;

  const updateClipById = useCallback(
    (clipId, updates) => {
      const layer = findLayerForClip(layers, clipId);
      if (!layer) return;
      updateClip(layer.id, clipId, updates);
    },
    [layers, updateClip]
  );

  const previewVideoClip = useMemo(() => {
    if (previewClipId) {
      return videoClips.find((c) => c.id === previewClipId) ?? null;
    }
    if (selectedClip && videoClips.some((c) => c.id === selectedClip)) {
      return videoClips.find((c) => c.id === selectedClip) ?? null;
    }
    return null;
  }, [previewClipId, selectedClip, videoClips]);

  const previewIsAudio = useMemo(
    () =>
      Boolean(
        previewClipId && audioClips.some((c) => c.id === previewClipId)
      ),
    [previewClipId, audioClips]
  );

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
        selectClip(clipId, layerId);
        previewClip(found.clip, clipId, layerId);
      }
    },
    [layers, selectClip]
  );

  const handleFadeChange = useCallback(
    (clipId, field, value) => {
      updateClipById(clipId, { [field]: value });
    },
    [updateClipById]
  );

  const handleEffectChange = useCallback(
    (clipId, field, value) => {
      updateClipById(clipId, { [field]: value });
    },
    [updateClipById]
  );

  const {
    handlePlayToggle,
    stopSequence,
    exitSequenceMode,
  } = useSequencePlayback({
    videoRef,
    wavesurferRef,
    wsReadyRef,
    layers,
    videoClips,
    audioClips,
    currentTime,
    previewClipId,
    setPreviewClipId,
    setCurrentTime,
    setPlaying,
    selectClip,
    previewIsAudioRef,
  });

  const backfillClipPreviews = useCallback(
    async (loadedLayers) => {
      for (const layer of loadedLayers) {
        for (const clip of layer.clips) {
          if (!clip.url) continue;

          const needsVideoThumb =
            clip.type === 'video' && !clip.thumbnail;
          const needsAudioWave =
            clip.type === 'audio' && !clip.waveform?.length;

          if (!needsVideoThumb && !needsAudioWave) continue;

          const preview = await buildClipPreview(
            clip.url,
            clip.type,
            clip.sourceStart ?? 0
          );

          const updates = {};
          if (needsVideoThumb && preview.thumbnail) {
            updates.thumbnail = preview.thumbnail;
          }
          if (needsAudioWave && preview.waveform) {
            updates.waveform = preview.waveform;
          }

          if (Object.keys(updates).length) {
            updateClip(layer.id, clip.id, updates);
          }
        }
      }
    },
    [updateClip]
  );

  const applyLoadedProject = useCallback(
    (project, statusMessage) => {
      loadProject({
        layers: project.layers,
        currentTime: 0,
        duration: Math.max(projectDuration(project.layers), 60),
      });
      setTextOverlays(project.textOverlays ?? []);
      setBrandSettings(project.brandSettings ?? null);
      setPreviewClipId(null);
      previewIsAudioRef.current = false;
      setMessage(statusMessage);

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
      wavesurferRef.current?.empty();
      wsReadyRef.current = false;

      backfillClipPreviews(project.layers);
    },
    [loadProject, setBrandSettings, backfillClipPreviews]
  );

  const saveProject = useCallback(async () => {
    try {
      await exportProjectFile({ layers, textOverlays, brandSettings });
      setMessage('💾 Project file saved to your downloads. Nothing was stored on this site.');
    } catch (err) {
      console.error(err);
      setMessage(`❌ Save failed: ${err.message}`);
    }
  }, [layers, textOverlays, brandSettings]);

  const downloadProject = saveProject;

  const handleImportProject = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const project = await importProjectFile(file);
        applyLoadedProject(project, `📂 Loaded project: ${file.name}`);
      } catch (err) {
        console.error(err);
        setMessage(`❌ Import failed: ${err.message}`);
      }

      e.target.value = '';
    },
    [applyLoadedProject]
  );

  const clearProject = useCallback(async () => {
    stopSequence();
    revokeAllLayerMedia(layers);
    clearTimeline();
    setTextOverlays([]);
    setBrandSettings(null);
    setPreviewClipId(null);
    previewIsAudioRef.current = false;
    setMessage('Session cleared. Nothing remains in this browser for the next visitor.');

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }

    wavesurferRef.current?.empty();
    wsReadyRef.current = false;

    try {
      await wipeLocalEditorData();
    } catch (err) {
      console.error(err);
    }
  }, [clearTimeline, layers, setBrandSettings, stopSequence]);

  useEffect(() => {
    const onBeforeUnload = (event) => {
      if (!hasContent && textOverlays.length === 0 && !brandSettings) return;
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [brandSettings, hasContent, textOverlays.length]);

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

  const importMediaFiles = useCallback(
    async (files, layerId, type) => {
      const isVideo = type === 'video';

      for (const f of files) {
        const url = URL.createObjectURL(f);
        const clipDuration = await probeMediaDuration(url, isVideo);
        const preview = await buildClipPreview(url, type, 0);

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
          thumbnail: preview.thumbnail,
          waveform: preview.waveform,
        });
      }
    },
    [addClip]
  );

  const handleTimelineImport = useCallback(
    async (files, layerId, layerType) => {
      const list = Array.from(files);
      const filtered = list.filter(
        layerType === 'audio' ? isAudioFile : isVideoFile
      );

      if (!filtered.length) {
        setMessage(
          layerType === 'audio'
            ? 'Drop audio files (MP3, WAV, etc.) on an audio track.'
            : 'Drop video files (MP4, WebM, etc.) on a video track.'
        );
        return;
      }

      await importMediaFiles(filtered, layerId, layerType);
      setMessage(`✅ Added ${filtered.length} ${layerType} clip(s) to timeline`);
    },
    [importMediaFiles]
  );

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

  const setClipRangeById = useCallback(
    (clipId, sourceStart, sourceEnd) => {
      updateClipById(clipId, {
        sourceStart: Number(sourceStart),
        sourceEnd: sourceEnd === null ? null : Number(sourceEnd),
      });
    },
    [updateClipById]
  );

  const handleOpenCrop = useCallback((clip) => {
    const video = videoRef.current;
    if (!video) return;

    // Capture current frame from the video
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 360;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCropImage(dataUrl);
      setCropClip(clip);
    } catch (e) {
      console.error('Failed to capture frame for crop:', e);
      alert('Failed to capture frame. Please make sure the video is loaded and playing.');
    }
  }, []);

  const handleCropComplete = useCallback((cropData) => {
    if (cropClip) {
      updateClipById(cropClip.id, { crop: cropData.croppedAreaPixels });
      setMessage(`Applied crop to "${cropClip.name}"`);
    }
    setCropClip(null);
    setCropImage(null);
  }, [cropClip, updateClipById]);

  const audioTracksForMixer = useMemo(() => {
    return [
      ...videoClips.map((c) => ({
        id: c.id,
        name: c.name,
        type: 'Video Audio',
        url: c.url,
        volume: c.volume ?? 1,
        muted: c.muted ?? false,
        solo: c.solo ?? false,
      })),
      ...audioClips.map((c) => ({
        id: c.id,
        name: c.name,
        type: 'Audio Track',
        url: c.url,
        volume: c.volume ?? 1,
        muted: c.muted ?? false,
        solo: c.solo ?? false,
      })),
    ];
  }, [videoClips, audioClips]);

  const handleVolumeChange = useCallback(
    (id, volume) => {
      updateClipById(id, { volume });
    },
    [updateClipById]
  );

  const handleMuteToggle = useCallback(
    (id) => {
      const found = findClipById(layers, id);
      if (found) {
        updateClipById(id, { muted: !found.clip.muted });
      }
    },
    [layers, updateClipById]
  );

  const handleSoloToggle = useCallback(
    (id) => {
      const found = findClipById(layers, id);
      if (found) {
        updateClipById(id, { solo: !found.clip.solo });
      }
    },
    [layers, updateClipById]
  );

  const handleMuteAll = useCallback(() => {
    layers.forEach((layer) => {
      layer.clips.forEach((clip) => {
        updateClip(layer.id, clip.id, { muted: true });
      });
    });
  }, [layers, updateClip]);

  const handleSoloNone = useCallback(() => {
    layers.forEach((layer) => {
      layer.clips.forEach((clip) => {
        updateClip(layer.id, clip.id, { solo: false });
      });
    });
  }, [layers, updateClip]);

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleRecordVoice = useCallback(() => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      setMessage('Processing voice recording…');
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          audioChunksRef.current = [];
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) audioChunksRef.current.push(e.data);
          };
          mediaRecorder.onstop = () => {
            const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const file = new File([blob], `voiceover-${Date.now()}.webm`, { type: 'audio/webm' });
            const url = URL.createObjectURL(file);
            
            const audioHelper = document.createElement('audio');
            audioHelper.src = url;
            audioHelper.onloadedmetadata = async () => {
              const clipId = crypto.randomUUID();
              const waveform = await generateWaveformPreview(url);

              addClip(AUDIO_LAYER_ID, {
                id: clipId,
                file,
                name: `Voiceover (${fmt(audioHelper.duration)})`,
                url,
                type: 'audio',
                duration: audioHelper.duration,
                sourceStart: 0,
                sourceEnd: audioHelper.duration,
                fadeIn: 0,
                fadeOut: 0,
                volume: 1,
                muted: false,
                waveform,
              });
              setMessage('🎤 Voiceover added to audio track!');
            };
            stream.getTracks().forEach(t => t.stop());
          };
          mediaRecorder.start();
          setIsRecording(true);
          setMessage('🎙️ Recording voice… click "Record Voice" again to stop.');
        })
        .catch(err => {
          console.error('Failed to start recording:', err);
          alert('Microphone access is required to record voiceovers.');
        });
    }
  }, [isRecording, addClip]);

  const handleTextAdd = useCallback((newText) => {
    setTextOverlays(prev => [...prev, newText]);
    setMessage('📝 Text overlay added!');
  }, []);

  const handleTextUpdate = useCallback((id, updates) => {
    setTextOverlays(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    setMessage('📝 Text overlay updated!');
  }, []);

  const handleTextRemove = useCallback((id) => {
    setTextOverlays(prev => prev.filter(t => t.id !== id));
    setMessage('🗑️ Text overlay removed.');
  }, []);

  const removeClipById = useCallback(
    (clipId) => {
      const found = findClipById(layers, clipId);
      if (!found) return;

      const remainingUrls = collectMediaUrls(
        layers.map((layer) => ({
          ...layer,
          clips: layer.clips.filter((clip) => clip.id !== clipId),
        }))
      );
      revokeClipMedia(found.clip, remainingUrls);

      removeClip(found.layerId, clipId);
      if (previewClipId === clipId) {
        setPreviewClipId(null);
        previewIsAudioRef.current = false;
      }
    },
    [layers, removeClip, previewClipId]
  );

  function previewClip(clip, clipId, layerId) {
    exitSequenceMode();
    setPlaying(false);

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
  // Export Video with Settings, Presets, and Overlays
  // ─────────────────────────────────────────────
  async function exportVideo(settings = {}) {
    if (videoClips.length === 0) {
      alert('Add at least one clip first.');
      return;
    }

    const {
      format = 'mp4',
      resolution = '1920x1080',
      bitrate = '5M',
      fps = 30,
      gifFps = 10,
      gifDuration = 5
    } = settings;

    setIsExportingLocal(true);
    setExportProgressLocal(0);

    try {
      setMessage('Loading FFmpeg…');
      await load();

      const segFiles = [];
      const [widthStr, heightStr] = resolution.split('x');
      const w = Number(widthStr);
      const h = Number(heightStr);

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

        // Apply Crop if configured
        if (clip.crop) {
          videoFilters.push(`crop=${Math.round(clip.crop.width)}:${Math.round(clip.crop.height)}:${Math.round(clip.crop.x)}:${Math.round(clip.crop.y)}`);
        }

        videoFilters.push(...buildEffectFilters(clip));

        // Standardize output resolution to match preset (preserve aspect with padding)
        videoFilters.push(`scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2`);
        videoFilters.push(`fps=${fps}`);

        const includeAudio = shouldEncodeClipAudio(clip, layers);
        const afChain = [...audioFilters];
        const vol = clip.volume ?? 1;
        if (includeAudio && vol !== 1) {
          afChain.push(`volume=${vol}`);
        }

        await ffmpeg.exec([
          '-ss', `${start}`,
          '-i', inName,
          ...(dur ? ['-t', `${dur}`] : []),
          ...(videoFilters.length ? ['-vf', videoFilters.join(',')] : []),
          ...(includeAudio && afChain.length ? ['-af', afChain.join(',')] : []),
          '-c:v', 'libx264',
          '-preset', 'veryfast',
          ...(includeAudio ? ['-c:a', 'aac'] : ['-an']),
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

      // ─────────────────────────────────────────────
      // Apply Text Overlays
      // ─────────────────────────────────────────────
      if (textOverlays.length > 0) {
        setMessage('Applying text overlays…');
        try {
          const fontResponse = await fetch('/fonts/Roboto-Regular.ttf');
          const fontBuffer = await fontResponse.arrayBuffer();
          await ffmpeg.writeFile('Roboto.ttf', new Uint8Array(fontBuffer));

          let filterComplex = '[0:v]';
          textOverlays.forEach((overlay) => {
            const { text, fontSize, color, position, startTime, duration } = overlay;
            const enable = `between(t,${startTime},${startTime + duration})`;
            const colorHex = color.replace('#', '0x');
            const x = `w*${position.x}/100`;
            const y = `h*${position.y}/100`;
            filterComplex += `,drawtext=text='${text.replace(/'/g, "\\'")}':fontfile=Roboto.ttf:fontsize=${fontSize}:fontcolor=${colorHex}:x=${x}:y=${y}:enable='${enable}'`;
          });

          await ffmpeg.exec([
            '-i', outputFile,
            '-filter_complex', filterComplex,
            '-c:v', 'libx264',
            '-preset', 'veryfast',
            '-c:a', 'copy',
            'output_text.mp4'
          ]);
          outputFile = 'output_text.mp4';
        } catch (fontErr) {
          console.error('Failed to apply text overlays:', fontErr);
        }
      }

      // ─────────────────────────────────────────────
      // Apply Brand Kit
      // ─────────────────────────────────────────────
      if (brandSettingsAffectExport(brandSettings)) {
        setMessage('Applying brand kit…');
        outputFile = await applyBrandToVideo(
          ffmpeg,
          fetchFile,
          brandSettings,
          outputFile
        );
      }

      // ─────────────────────────────────────────────
      // Mix Audio Track
      // ─────────────────────────────────────────────
      if (audioClips.length > 0) {
        setMessage('Mixing audio track…');
        outputFile = await mixAudioTrackIntoVideo(
          ffmpeg,
          fetchFile,
          outputFile,
          audioClips,
          layers
        );
      }

      // ─────────────────────────────────────────────
      // Convert format / resolution custom transcode
      // ─────────────────────────────────────────────
      let finalFile = outputFile;
      let mimeType = 'video/mp4';
      let extension = format;

      if (format === 'gif') {
        setMessage('Generating high-quality GIF…');
        await ffmpeg.exec([
          '-i', outputFile,
          '-t', `${gifDuration}`,
          '-vf', `fps=${gifFps},scale=${w}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
          '-loop', '0',
          'output.gif'
        ]);
        finalFile = 'output.gif';
        mimeType = 'image/gif';
      } else if (format !== 'mp4' || resolution !== '1920x1080') {
        setMessage(`Converting to ${format.toUpperCase()}…`);
        const formattedOut = `output_final.${format}`;
        const formatCodec = format === 'webm' ? ['-c:v', 'libvpx-vp9', '-c:a', 'libopus'] : ['-c:v', 'libx264', '-c:a', 'aac'];
        
        await ffmpeg.exec([
          '-i', outputFile,
          ...formatCodec,
          '-preset', 'veryfast',
          '-b:v', bitrate,
          formattedOut
        ]);
        finalFile = formattedOut;
        mimeType = format === 'webm' ? 'video/webm' : format === 'mov' ? 'video/quicktime' : 'video/mp4';
      }

      const data = await ffmpeg.readFile(finalFile);
      triggerDownload(data, `kinetic-project.${extension}`, mimeType);

      setMessage(`✅ Export completed! Download started.`);
    } catch (err) {
      console.error(err);
      setMessage(`❌ Export failed: ${err.message}`);
    } finally {
      setIsExportingLocal(false);
      setExportProgressLocal(0);
    }
  }

  // ─────────────────────────────────────────────
  // Export MP3
  // ─────────────────────────────────────────────
  async function exportAudio() {
    const sourceClips = audioClips.length > 0 ? audioClips : videoClips;

    if (sourceClips.length === 0) {
      alert('Add at least one video or audio clip first.');
      return;
    }

    const exportClips = filterExportAudioClips(sourceClips, layers);

    if (exportClips.length === 0) {
      alert('All audio tracks are muted or solo-disabled.');
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

  const actionHandlersRef = useRef({});
  actionHandlersRef.current = {
    addVideos: () => fileInputRef.current?.click(),
    addAudio: () => audioFileInputRef.current?.click(),
    preloadFFmpeg: () => load().then(() => setMessage('✅ FFmpeg ready!')),
    saveProject,
    downloadProject,
    importProject: () => projectFileInputRef.current?.click(),
    clearProject,
    exportVideo: () => exportVideo(),
    exportAudio: () => exportAudio(),
  };

  useEffect(() => {
    registerActions({
      addVideos: () => actionHandlersRef.current.addVideos(),
      addAudio: () => actionHandlersRef.current.addAudio(),
      preloadFFmpeg: () => actionHandlersRef.current.preloadFFmpeg(),
      saveProject: () => actionHandlersRef.current.saveProject(),
      downloadProject: () => actionHandlersRef.current.downloadProject(),
      importProject: () => actionHandlersRef.current.importProject(),
      clearProject: () => actionHandlersRef.current.clearProject(),
      exportVideo: () => actionHandlersRef.current.exportVideo(),
      exportAudio: () => actionHandlersRef.current.exportAudio(),
    });
  }, [registerActions]);

  const handleDeleteSelected = useCallback(() => {
    if (!selectedClip || !selectedLayer) return;
    removeClipById(selectedClip);
  }, [selectedClip, selectedLayer, removeClipById]);

  useKeyboardShortcuts(
    {
      onPlayPause: () => handlePlayToggle(!isPlaying),
      onSave: saveProject,
      onOpen: () => projectFileInputRef.current?.click(),
      onDelete: handleDeleteSelected,
      onDuplicate: () => {
        if (selectedClip && selectedLayer) {
          duplicateClip(selectedLayer, selectedClip);
        }
      },
      onSplit: () => {
        if (selectedClip && selectedLayer) {
          splitClip(selectedLayer, selectedClip, currentTime);
        }
      },
      onSeekBack: () => handleTimelineSeek(Math.max(0, currentTime - 1)),
      onSeekForward: () =>
        handleTimelineSeek(Math.min(duration, currentTime + 1)),
    },
    true
  );

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <div className="video-editor">
      <div className="hidden-file-inputs" aria-hidden="true">
        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          accept="video/*"
          multiple
          onChange={handleFiles}
        />
        <input
          ref={audioFileInputRef}
          className="file-input"
          type="file"
          accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac"
          multiple
          onChange={handleAudioFiles}
        />
        <input
          ref={projectFileInputRef}
          className="file-input"
          type="file"
          accept=".json,.kinetic.json,application/json"
          onChange={handleImportProject}
        />
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
          <PreviewCompositor
            videoRef={videoRef}
            videoClip={previewVideoClip}
            textOverlays={textOverlays}
            brandSettings={brandSettings}
            currentTime={currentTime}
            isPlaying={isPlaying && !previewIsAudio}
            isAudioPreview={previewIsAudio}
          >
            <div className="playback-controls">
              <button
                type="button"
                onClick={() => handlePlayToggle(!isPlaying)}
                title={isPlaying ? 'Pause' : 'Play sequence'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <button
                type="button"
                onClick={() => {
                  stopSequence();
                  setCurrentTime(0);
                  const first = videoClips[0] ?? audioClips[0];
                  if (first) {
                    const layer = videoClips[0] ? VIDEO_LAYER_ID : AUDIO_LAYER_ID;
                    previewClip(first, first.id, layer);
                  }
                }}
                title="Stop and rewind"
              >
                ⏹
              </button>
            </div>
          </PreviewCompositor>

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
          <div className="sidebar-tabs" style={{ display: 'flex', gap: '4px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
            <button
              className={`sidebar-tab ${activeTab === 'clips' ? 'active' : ''}`}
              onClick={() => setActiveTab('clips')}
              style={{
                flex: 1,
                background: activeTab === 'clips' ? 'rgba(191, 0, 255, 0.15)' : 'transparent',
                border: '1px solid',
                borderColor: activeTab === 'clips' ? 'var(--accent, #00FFD1)' : 'transparent',
                padding: '8px 4px',
                fontSize: '0.85rem',
                color: activeTab === 'clips' ? 'var(--accent, #00FFD1)' : 'var(--text-secondary, #94a3b8)',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.2s ease'
              }}
            >
              📁 Clips
            </button>
            <button
              className={`sidebar-tab ${activeTab === 'text' ? 'active' : ''}`}
              onClick={() => setActiveTab('text')}
              style={{
                flex: 1,
                background: activeTab === 'text' ? 'rgba(191, 0, 255, 0.15)' : 'transparent',
                border: '1px solid',
                borderColor: activeTab === 'text' ? 'var(--accent, #00FFD1)' : 'transparent',
                padding: '8px 4px',
                fontSize: '0.85rem',
                color: activeTab === 'text' ? 'var(--accent, #00FFD1)' : 'var(--text-secondary, #94a3b8)',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.2s ease'
              }}
            >
              📝 Text
            </button>
            <button
              className={`sidebar-tab ${activeTab === 'audio' ? 'active' : ''}`}
              onClick={() => setActiveTab('audio')}
              style={{
                flex: 1,
                background: activeTab === 'audio' ? 'rgba(191, 0, 255, 0.15)' : 'transparent',
                border: '1px solid',
                borderColor: activeTab === 'audio' ? 'var(--accent, #00FFD1)' : 'transparent',
                padding: '8px 4px',
                fontSize: '0.85rem',
                color: activeTab === 'audio' ? 'var(--accent, #00FFD1)' : 'var(--text-secondary, #94a3b8)',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.2s ease'
              }}
            >
              🎚️ Mixer
            </button>
            <button
              className={`sidebar-tab ${activeTab === 'export' ? 'active' : ''}`}
              onClick={() => setActiveTab('export')}
              style={{
                flex: 1,
                background: activeTab === 'export' ? 'rgba(191, 0, 255, 0.15)' : 'transparent',
                border: '1px solid',
                borderColor: activeTab === 'export' ? 'var(--accent, #00FFD1)' : 'transparent',
                padding: '8px 4px',
                fontSize: '0.85rem',
                color: activeTab === 'export' ? 'var(--accent, #00FFD1)' : 'var(--text-secondary, #94a3b8)',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.2s ease'
              }}
            >
              📤 Export
            </button>
          </div>

          <div className="sidebar-tab-content">
            {activeTab === 'clips' && (
              <>
                <h3>
                  Video{' '}
                  {videoClips.length > 0 && (
                    <span className="badge">{videoClips.length}</span>
                  )}
                </h3>

                {videoClips.length === 0 && (
                  <p className="muted">No video clips — use Add Videos above.</p>
                )}

                {videoClips.map((clip) => {
                  const layerId = findLayerForClip(layers, clip.id)?.id;
                  if (!layerId) return null;

                  return (
                  <div
                    key={clip.id}
                    className={`clip-item${
                      selectedClip === clip.id ? ' selected' : ''
                    }`}
                    onClick={() => selectClip(clip.id, layerId)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        selectClip(clip.id, layerId);
                      }
                    }}
                    role="button"
                    tabIndex={0}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            previewClip(clip, clip.id, layerId);
                          }}
                        >
                          ▶ Preview
                        </button>

                        <button
                          className="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeClipById(clip.id);
                          }}
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
                            setClipRangeById(
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
                            setClipRangeById(
                              clip.id,
                              clip.sourceStart ?? 0,
                              e.target.value
                            )
                          }
                        />
                      </div>

                      {/* Crop Trigger Button */}
                      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <button 
                          className="secondary small"
                          onClick={(e) => {
                            e.stopPropagation();
                            selectClip(clip.id, layerId);
                            handleOpenCrop(clip);
                          }}
                          style={{ flex: 1, fontSize: '0.8rem', padding: '6px 12px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-primary)' }}
                        >
                          📐 Crop Frame
                        </button>
                        {clip.crop && (
                          <span style={{ fontSize: '0.8rem', color: '#00FFD1', alignSelf: 'center', fontWeight: 'bold' }}>
                            ✓ Cropped
                          </span>
                        )}
                      </div>

                      <div className="clip-duration-info" style={{ marginTop: 8 }}>
                        Duration:{' '}
                        {fmt(clipTrimmedDuration(clip))}
                      </div>
                    </div>
                  </div>
                  );
                })}

                <h3 style={{ marginTop: 20 }}>
                  Audio{' '}
                  {audioClips.length > 0 && (
                    <span className="badge">{audioClips.length}</span>
                  )}
                </h3>

                {audioClips.length === 0 && (
                  <p className="muted">No audio clips — use Add Audio above.</p>
                )}

                {audioClips.map((clip) => {
                  const layerId = findLayerForClip(layers, clip.id)?.id;
                  if (!layerId) return null;

                  return (
                  <div
                    key={clip.id}
                    className={`clip-item${
                      selectedClip === clip.id ? ' selected' : ''
                    }`}
                    onClick={() => selectClip(clip.id, layerId)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        selectClip(clip.id, layerId);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="clip-row">
                      <div className="clip-name" title={clip.name}>
                        {clip.name}
                      </div>
                      <div className="clip-actions">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            previewClip(clip, clip.id, layerId);
                          }}
                        >
                          ▶ Preview
                        </button>
                        <button
                          className="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeClipById(clip.id);
                          }}
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
                            setClipRangeById(
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
                            setClipRangeById(
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
                            updateClipById(clip.id, {
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
                  );
                })}

                <TransitionControls
                  selectedClipId={selectedVideoClip?.id ?? null}
                  clip={selectedVideoClip}
                  onFadeChange={handleFadeChange}
                  onEffectChange={handleEffectChange}
                />
              </>
            )}

            {activeTab === 'text' && (
              <TextOverlay
                texts={textOverlays}
                onTextAdd={handleTextAdd}
                onTextUpdate={handleTextUpdate}
                onTextRemove={handleTextRemove}
                currentTime={currentTime}
              />
            )}

            {activeTab === 'audio' && (
              <AudioMixer
                audioTracks={audioTracksForMixer}
                onVolumeChange={handleVolumeChange}
                onMuteToggle={handleMuteToggle}
                onSoloToggle={handleSoloToggle}
                onImportMusic={() => audioFileInputRef.current?.click()}
                onRecordVoice={handleRecordVoice}
                onMuteAll={handleMuteAll}
                onSoloNone={handleSoloNone}
              />
            )}

            {activeTab === 'export' && (
              <ExportPresets
                onExport={exportVideo}
                ffmpegLoaded={loaded}
                exportProgress={exportProgressLocal}
                isExporting={isExportingLocal}
              />
            )}
          </div>
        </aside>
      </div>

      <MultiLayerTimeline
        onSeek={handleTimelineSeek}
        onClipSelect={handleClipSelect}
        onPlayToggle={handlePlayToggle}
        onImportFiles={handleTimelineImport}
      />

      {/* Crop Tool Overlay Modal */}
      {cropClip && cropImage && (
        <CropTool
          image={cropImage}
          onCropComplete={handleCropComplete}
          onClose={() => {
            setCropClip(null);
            setCropImage(null);
          }}
          initialAspect={16/9}
        />
      )}

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
          🔒 All processing happens in this tab. No uploads. No leftover projects.
          Closing Kinetic erases the session so nobody else can view your clips.
        </small>
      </div>
    </div>
  );
}
