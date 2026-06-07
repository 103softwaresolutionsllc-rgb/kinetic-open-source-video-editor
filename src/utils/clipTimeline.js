export const VIDEO_LAYER_ID = 'video-layer-1';
export const AUDIO_LAYER_ID = 'audio-layer-1';

/** Duration of the visible portion on the timeline / in export */
export function clipTrimmedDuration(clip) {
  const sourceEnd = clip.sourceEnd ?? clip.end ?? clip.duration ?? 0;
  const sourceStart = clip.sourceStart ?? clip.start ?? 0;
  return Math.max(0, sourceEnd - sourceStart);
}

export function clipTimelineEnd(clip) {
  return (clip.timelineStart ?? 0) + clipTrimmedDuration(clip);
}

export function sequenceDuration(clips) {
  if (!clips.length) return 0;
  return Math.max(...clips.map(clipTimelineEnd));
}

export function getLayerClips(layers, layerId) {
  return layers.find((l) => l.id === layerId)?.clips ?? [];
}

export function getClipsForLayerType(layers, type) {
  return layers
    .filter((layer) => layer.type === type)
    .flatMap((layer) => layer.clips)
    .slice()
    .sort((a, b) => (a.timelineStart ?? 0) - (b.timelineStart ?? 0));
}

export function getOrderedVideoClips(layers) {
  return getClipsForLayerType(layers, 'video');
}

export function getOrderedAudioClips(layers) {
  return getClipsForLayerType(layers, 'audio');
}

export function findLayerForClip(layers, clipId) {
  if (!clipId) return null;
  return layers.find((layer) => layer.clips.some((clip) => clip.id === clipId)) ?? null;
}

export function isRemovableLayer(layer) {
  return (
    layer.id !== VIDEO_LAYER_ID &&
    layer.id !== AUDIO_LAYER_ID &&
    layer.clips.length === 0
  );
}

export function projectDuration(layers) {
  const allClips = layers.flatMap((layer) => layer.clips);
  return Math.max(sequenceDuration(allClips), 1);
}

export function recalcSequentialTimelineStarts(clips) {
  let offset = 0;
  return clips.map((clip) => {
    const next = { ...clip, timelineStart: offset };
    offset += clipTrimmedDuration(clip);
    return next;
  });
}

export function findClipAtTime(clips, time) {
  const sorted = [...clips].sort(
    (a, b) => (a.timelineStart ?? 0) - (b.timelineStart ?? 0)
  );

  for (let i = 0; i < sorted.length; i++) {
    const clip = sorted[i];
    const start = clip.timelineStart ?? 0;
    const dur = clipTrimmedDuration(clip);

    if (time >= start && time < start + dur) {
      return {
        index: clips.findIndex((c) => c.id === clip.id),
        sortedIndex: i,
        clip,
        localTime: time - start,
        timelineStart: start,
      };
    }
  }

  if (sorted.length === 0) return null;

  const last = sorted[sorted.length - 1];
  const lastStart = last.timelineStart ?? 0;
  const lastDur = clipTrimmedDuration(last);

  return {
    index: clips.findIndex((c) => c.id === last.id),
    sortedIndex: sorted.length - 1,
    clip: last,
    localTime: lastDur,
    timelineStart: lastStart,
  };
}

function findClipHitOnLayers(layers, type, time) {
  for (const layer of layers.filter((l) => l.type === type)) {
    const hit = findClipAtTime(layer.clips, time);
    if (hit && hit.localTime < clipTrimmedDuration(hit.clip) - 0.02) {
      return { ...hit, layerId: layer.id };
    }
  }
  return null;
}

/** Prefer video at playhead, then audio */
export function findClipAtTimeOnProject(layers, time) {
  return (
    findClipHitOnLayers(layers, 'video', time) ||
    findClipHitOnLayers(layers, 'audio', time)
  );
}

export function makeClipDragId(layerId, clipId) {
  return `clip:${layerId}:${clipId}`;
}

export function parseClipDragId(id) {
  const parts = String(id).split(':');
  if (parts[0] !== 'clip' || parts.length < 3) return null;
  return { layerId: parts[1], clipId: parts.slice(2).join(':') };
}

export function isAudioFile(file) {
  if (file.type.startsWith('audio/')) return true;
  return /\.(mp3|wav|ogg|m4a|aac|flac|webm)$/i.test(file.name);
}

export function isVideoFile(file) {
  if (file.type.startsWith('video/')) return true;
  return /\.(mp4|webm|mov|mkv|avi|m4v)$/i.test(file.name);
}

export function getNextClipInSequence(clips, clipId) {
  const sorted = [...clips].sort(
    (a, b) => (a.timelineStart ?? 0) - (b.timelineStart ?? 0)
  );
  const idx = sorted.findIndex((c) => c.id === clipId);
  if (idx < 0 || idx >= sorted.length - 1) return null;
  return sorted[idx + 1];
}

/** Clip at playhead, or the next clip if playhead is in a gap or past clip end */
export function findClipAtOrAfterTime(clips, time) {
  const sorted = [...clips].sort(
    (a, b) => (a.timelineStart ?? 0) - (b.timelineStart ?? 0)
  );

  if (!sorted.length) return null;

  const hit = findClipAtTime(clips, time);
  if (hit && hit.localTime < clipTrimmedDuration(hit.clip) - 0.02) {
    return hit;
  }

  for (let i = 0; i < sorted.length; i++) {
    const clip = sorted[i];
    const start = clip.timelineStart ?? 0;
    if (start >= time - 0.02) {
      return {
        index: clips.findIndex((c) => c.id === clip.id),
        sortedIndex: i,
        clip,
        localTime: 0,
        timelineStart: start,
      };
    }
  }

  return null;
}

export function getActiveAudioClipsAtTime(audioClips, time) {
  return audioClips.filter((clip) => {
    const start = clip.timelineStart ?? 0;
    const end = start + clipTrimmedDuration(clip);
    return time >= start && time < end;
  });
}

export function findClipById(layers, clipId) {
  if (!clipId) return null;

  for (const layer of layers) {
    const clip = layer.clips.find((c) => c.id === clipId);
    if (clip) {
      return { clip, layerId: layer.id };
    }
  }

  return null;
}
