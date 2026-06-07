const OVERLAY_POSITIONS = {
  'top-left': '10:10',
  'top-right': 'W-w-10:10',
  'bottom-left': '10:H-h-10',
  'bottom-right': 'W-w-10:H-h-10',
  center: '(W-w)/2:(H-h)/2',
};

const NEON_GLOW_FILTER = 'colorbalance=rs=0.1:gs=-0.2:bs=0.3';

export function brandSettingsAffectExport(brandSettings) {
  if (!brandSettings) return false;
  return Boolean(brandSettings.logo || brandSettings.neonGlow);
}

export async function applyBrandToVideo(
  ffmpeg,
  fetchFile,
  brandSettings,
  inputName = 'output.mp4'
) {
  if (!brandSettingsAffectExport(brandSettings)) {
    return inputName;
  }

  const hasLogo = Boolean(brandSettings.logo);
  const hasGlow = Boolean(brandSettings.neonGlow);

  if (!hasLogo && hasGlow) {
    await ffmpeg.exec([
      '-i',
      inputName,
      '-vf',
      NEON_GLOW_FILTER,
      '-c:v',
      'libx264',
      '-preset',
      'veryfast',
      '-c:a',
      'copy',
      'branded-output.mp4',
    ]);
    return 'branded-output.mp4';
  }

  const response = await fetch(brandSettings.logo);
  const logoBlob = await response.blob();
  await ffmpeg.writeFile('brand-logo.png', await fetchFile(logoBlob));

  const overlayPos =
    OVERLAY_POSITIONS[brandSettings.position] || OVERLAY_POSITIONS['bottom-right'];

  const filter = hasGlow
    ? `[0:v]${NEON_GLOW_FILTER}[base];[base][1:v]overlay=${overlayPos}`
    : `[0:v][1:v]overlay=${overlayPos}`;

  await ffmpeg.exec([
    '-i',
    inputName,
    '-i',
    'brand-logo.png',
    '-filter_complex',
    filter,
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-c:a',
    'copy',
    'branded-output.mp4',
  ]);

  return 'branded-output.mp4';
}

export function buildFadeFilters(clip, segmentDuration) {
  const fadeIn = clip.fadeIn || 0;
  const fadeOut = clip.fadeOut || 0;
  const dur = segmentDuration ?? clipTrimmedDuration(clip);

  const videoFilters = [];
  const audioFilters = [];

  if (fadeIn > 0) {
    videoFilters.push(`fade=t=in:st=0:d=${fadeIn}`);
    audioFilters.push(`afade=t=in:st=0:d=${fadeIn}`);
  }

  if (fadeOut > 0 && dur > fadeOut) {
    const fadeStart = Math.max(0, dur - fadeOut);
    videoFilters.push(`fade=t=out:st=${fadeStart}:d=${fadeOut}`);
    audioFilters.push(`afade=t=out:st=${fadeStart}:d=${fadeOut}`);
  }

  return { videoFilters, audioFilters };
}

function clipTrimmedDuration(clip) {
  const sourceEnd = clip.sourceEnd ?? clip.end ?? clip.duration ?? 0;
  const sourceStart = clip.sourceStart ?? clip.start ?? 0;
  return Math.max(0, sourceEnd - sourceStart);
}
