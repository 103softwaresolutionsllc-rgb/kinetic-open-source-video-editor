import { isClipAudibleInProject } from './layerAudio.js';

/** Determine which clips contribute audio during export (respects layer + clip mute/solo). */
export function filterExportAudioClips(clips, layers) {
  if (!clips?.length || !layers) return [];
  return clips.filter((clip) => isClipAudibleInProject(clip, layers));
}

export function clipAudioVolumeArgs(clip) {
  const vol = clip.volume ?? 1;
  if (vol === 1) return [];
  return ['-af', `volume=${vol}`];
}

export function shouldEncodeClipAudio(clip, layers) {
  return isClipAudibleInProject(clip, layers);
}
