import { findLayerForClip } from './clipTimeline.js';

/** Layer + clip mute/solo for playback and export */
export function projectHasSolo(layers) {
  if (layers.some((l) => l.solo)) return true;
  return layers.some((l) => l.clips.some((c) => c.solo));
}

export function isClipAudible(clip, layer, layers) {
  if (clip.muted || layer?.muted) return false;

  if (!projectHasSolo(layers)) return true;

  return Boolean(layer?.solo || clip.solo);
}

export function filterAudibleClips(clips, layer, layers) {
  return clips.filter((clip) => isClipAudible(clip, layer, layers));
}

export function isClipAudibleInProject(clip, layers) {
  const layer = findLayerForClip(layers, clip.id);
  if (!layer) return false;
  return isClipAudible(clip, layer, layers);
}
