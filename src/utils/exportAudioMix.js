import { clipTrimmedDuration } from './clipTimeline.js';
import { filterExportAudioClips } from './audioExportFilters.js';

/**
 * Mix audio-track clips into an exported video file.
 * Returns the output filename (may differ from videoPath).
 */
export async function mixAudioTrackIntoVideo(
  ffmpeg,
  fetchFile,
  videoPath,
  audioClips,
  layers
) {
  const activeClips = filterExportAudioClips(audioClips, layers);

  if (!activeClips.length) {
    return videoPath;
  }

  const sorted = [...activeClips].sort(
    (a, b) => (a.timelineStart ?? 0) - (b.timelineStart ?? 0)
  );

  for (let i = 0; i < sorted.length; i++) {
    const clip = sorted[i];
    const inName = `mixaud_in${i}`;
    const outName = `mixaud_seg${i}.aac`;

    await ffmpeg.writeFile(inName, await fetchFile(clip.file));

    const ss = clip.sourceStart ?? 0;
    const dur = clipTrimmedDuration(clip);

    await ffmpeg.exec([
      '-ss',
      String(ss),
      '-i',
      inName,
      '-t',
      String(dur),
      '-ar',
      '44100',
      '-ac',
      '2',
      '-c:a',
      'aac',
      outName,
    ]);
  }

  const delayFilters = sorted
    .map((clip, i) => {
      const ms = Math.round((clip.timelineStart ?? 0) * 1000);
      const vol = clip.volume ?? 1;
      return `[${i + 1}:a]adelay=${ms}|${ms},volume=${vol}[ad${i}]`;
    })
    .join(';');

  const delayedInputs = sorted.map((_, i) => `[ad${i}]`).join('');
  const audioOnlyMix = `${delayFilters};${delayedInputs}amix=inputs=${sorted.length}:duration=longest:normalize=0[outa]`;

  const inputArgs = ['-i', videoPath];
  for (let i = 0; i < sorted.length; i++) {
    inputArgs.push('-i', `mixaud_seg${i}.aac`);
  }

  const withVideoAudio = `${delayFilters};[0:a]${delayedInputs}amix=inputs=${sorted.length + 1}:duration=longest:normalize=0[outa]`;

  try {
    await ffmpeg.exec([
      ...inputArgs,
      '-filter_complex',
      withVideoAudio,
      '-map',
      '0:v:0',
      '-map',
      '[outa]',
      '-c:v',
      'copy',
      '-c:a',
      'aac',
      'final_mux.mp4',
    ]);
  } catch {
    await ffmpeg.exec([
      ...inputArgs,
      '-filter_complex',
      audioOnlyMix,
      '-map',
      '0:v:0',
      '-map',
      '[outa]',
      '-c:v',
      'copy',
      '-c:a',
      'aac',
      'final_mux.mp4',
    ]);
  }

  return 'final_mux.mp4';
}
