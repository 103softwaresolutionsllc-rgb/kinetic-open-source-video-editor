import { useRef, useCallback, useEffect } from 'react';
import {
  VIDEO_LAYER_ID,
  AUDIO_LAYER_ID,
  findClipAtOrAfterTime,
  findLayerForClip,
  getNextClipInSequence,
  getActiveAudioClipsAtTime,
} from '../utils/clipTimeline.js';
import { isClipAudible } from '../utils/layerAudio.js';

export function useSequencePlayback({
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
}) {
  const sequenceModeRef = useRef(false);
  const sequenceAudioRef = useRef(new Map());

  const stopSequenceAudio = useCallback(() => {
    sequenceAudioRef.current.forEach((el) => {
      el.pause();
    });
  }, []);

  const cleanupSequenceAudio = useCallback(() => {
    sequenceAudioRef.current.forEach((el) => {
      el.pause();
      el.src = '';
    });
    sequenceAudioRef.current.clear();
  }, []);

  const stopSequence = useCallback(() => {
    sequenceModeRef.current = false;
    setPlaying(false);
    videoRef.current?.pause();
    wavesurferRef.current?.pause();
    stopSequenceAudio();
  }, [setPlaying, videoRef, wavesurferRef, stopSequenceAudio]);

  const syncSequenceAudio = useCallback(
    (timelineTime) => {
      if (!sequenceModeRef.current) return;

      const activeIds = new Set();

      getActiveAudioClipsAtTime(audioClips, timelineTime).forEach((clip) => {
        const layer = findLayerForClip(layers, clip.id);
        if (!layer || !isClipAudible(clip, layer, layers)) return;

        activeIds.add(clip.id);
        let el = sequenceAudioRef.current.get(clip.id);

        if (!el) {
          el = new Audio(clip.url);
          sequenceAudioRef.current.set(clip.id, el);
        }

        el.volume = Math.min(2, Math.max(0, clip.volume ?? 1));
        const start = clip.timelineStart ?? 0;
        const mediaTime = (clip.sourceStart ?? 0) + (timelineTime - start);

        if (Math.abs(el.currentTime - mediaTime) > 0.25) {
          el.currentTime = mediaTime;
        }

        if (el.paused) {
          el.play().catch(() => {});
        }
      });

      sequenceAudioRef.current.forEach((el, id) => {
        if (!activeIds.has(id)) {
          el.pause();
        }
      });
    },
    [audioClips, layers]
  );

  const loadAndPlayVideo = useCallback(
    (clip, localTime, autoplay = true) => {
      const video = videoRef.current;
      if (!video) return;

      previewIsAudioRef.current = false;
      setPreviewClipId(clip.id);
      selectClip(clip.id, findLayerForClip(layers, clip.id)?.id ?? VIDEO_LAYER_ID);

      const mediaTime = (clip.sourceStart ?? 0) + localTime;

      const startPlayback = () => {
        const layer = findLayerForClip(layers, clip.id);
        video.volume =
          layer && isClipAudible(clip, layer, layers)
            ? Math.min(1, clip.volume ?? 1)
            : 0;
        video.currentTime = mediaTime;
        wsReadyRef.current = false;
        wavesurferRef.current?.load(clip.url);
        wavesurferRef.current?.once('ready', () => {
          wsReadyRef.current = true;
          wavesurferRef.current?.setTime(mediaTime);
        });
        if (autoplay) {
          video.play().catch(() => {});
        }
      };

      if (video.src !== clip.url) {
        video.src = clip.url;
        video.onloadeddata = () => {
          video.onloadeddata = null;
          startPlayback();
        };
      } else {
        startPlayback();
      }
    },
    [
      videoRef,
      wavesurferRef,
      wsReadyRef,
      previewIsAudioRef,
      setPreviewClipId,
      selectClip,
      layers,
    ]
  );

  const loadAndPlayAudio = useCallback(
    (clip, localTime, autoplay = true) => {
      previewIsAudioRef.current = true;
      setPreviewClipId(clip.id);
      selectClip(clip.id, findLayerForClip(layers, clip.id)?.id ?? AUDIO_LAYER_ID);

      const mediaTime = (clip.sourceStart ?? 0) + localTime;
      wsReadyRef.current = false;

      videoRef.current?.pause();
      wavesurferRef.current?.load(clip.url);
      wavesurferRef.current?.once('ready', () => {
        wsReadyRef.current = true;
        wavesurferRef.current?.setTime(mediaTime);
        const layer = findLayerForClip(layers, clip.id);
        const vol =
          layer && isClipAudible(clip, layer, layers)
            ? Math.min(2, Math.max(0, clip.volume ?? 1))
            : 0;
        wavesurferRef.current?.setVolume(vol);
        if (autoplay && vol > 0) {
          wavesurferRef.current?.play();
        }
      });
    },
    [
      videoRef,
      wavesurferRef,
      wsReadyRef,
      previewIsAudioRef,
      setPreviewClipId,
      selectClip,
      layers,
    ]
  );

  const advanceToNextClip = useCallback(() => {
    if (!sequenceModeRef.current) return;

    if (videoClips.length > 0 && previewClipId) {
      const isVideo = videoClips.some((c) => c.id === previewClipId);

      if (isVideo) {
        const next = getNextClipInSequence(videoClips, previewClipId);
        if (next) {
          loadAndPlayVideo(next, 0, true);
          return;
        }
      }
    }

    if (audioClips.length > 0 && previewClipId) {
      const isAudio = audioClips.some((c) => c.id === previewClipId);

      if (isAudio) {
        const next = getNextClipInSequence(audioClips, previewClipId);
        if (next) {
          loadAndPlayAudio(next, 0, true);
          return;
        }
      }
    }

    stopSequence();
  }, [
    videoClips,
    audioClips,
    previewClipId,
    loadAndPlayVideo,
    loadAndPlayAudio,
    stopSequence,
  ]);

  const startSequenceAt = useCallback(
    (time) => {
      sequenceModeRef.current = true;
      setPlaying(true);

      const videoHit = findClipAtOrAfterTime(videoClips, time);

      if (videoHit) {
        loadAndPlayVideo(videoHit.clip, videoHit.localTime, true);
        syncSequenceAudio(
          (videoHit.timelineStart ?? 0) + videoHit.localTime
        );
        return;
      }

      const audioHit = findClipAtOrAfterTime(audioClips, time);

      if (audioHit) {
        loadAndPlayAudio(audioHit.clip, audioHit.localTime, true);
        return;
      }

      stopSequence();
    },
    [
      videoClips,
      audioClips,
      setPlaying,
      loadAndPlayVideo,
      loadAndPlayAudio,
      syncSequenceAudio,
      stopSequence,
    ]
  );

  const handlePlayToggle = useCallback(
    (playing) => {
      if (!playing) {
        stopSequence();
        return;
      }

      if (videoClips.length === 0 && audioClips.length === 0) {
        return;
      }

      startSequenceAt(currentTime);
    },
    [videoClips.length, audioClips.length, currentTime, startSequenceAt, stopSequence]
  );

  const exitSequenceMode = useCallback(() => {
    sequenceModeRef.current = false;
    stopSequenceAudio();
  }, [stopSequenceAudio]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnded = () => {
      if (sequenceModeRef.current) {
        advanceToNextClip();
      }
    };

    const onTimeUpdate = () => {
      if (!sequenceModeRef.current || previewIsAudioRef.current) return;

      const clip = videoClips.find((c) => c.id === previewClipId);
      if (!clip) return;

      const timelinePos =
        (clip.timelineStart ?? 0) +
        Math.max(0, (video.currentTime || 0) - (clip.sourceStart ?? 0));

      setCurrentTime(timelinePos);
      syncSequenceAudio(timelinePos);
    };

    video.addEventListener('ended', onEnded);
    video.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [
    videoRef,
    videoClips,
    previewClipId,
    previewIsAudioRef,
    advanceToNextClip,
    setCurrentTime,
    syncSequenceAudio,
  ]);

  useEffect(() => {
    const ws = wavesurferRef.current;
    if (!ws) return;

    const onFinish = () => {
      if (sequenceModeRef.current && previewIsAudioRef.current) {
        advanceToNextClip();
      }
    };

    const onAudioTime = () => {
      if (!sequenceModeRef.current || !previewIsAudioRef.current) return;

      const clip = audioClips.find((c) => c.id === previewClipId);
      if (!clip || !wsReadyRef.current) return;

      const wsTime = ws.getCurrentTime();
      setCurrentTime(
        (clip.timelineStart ?? 0) +
          Math.max(0, wsTime - (clip.sourceStart ?? 0))
      );
    };

    ws.on('finish', onFinish);
    ws.on('timeupdate', onAudioTime);

    return () => {
      ws.un('finish', onFinish);
      ws.un('timeupdate', onAudioTime);
    };
  }, [
    wavesurferRef,
    wsReadyRef,
    audioClips,
    previewClipId,
    previewIsAudioRef,
    advanceToNextClip,
    setCurrentTime,
  ]);

  useEffect(() => () => cleanupSequenceAudio(), [cleanupSequenceAudio]);

  return {
    handlePlayToggle,
    stopSequence,
    exitSequenceMode,
    startSequenceAt,
    sequenceModeRef,
  };
}
