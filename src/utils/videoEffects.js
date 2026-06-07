export const EFFECT_PRESETS = [
  { id: 'none', label: 'None' },
  { id: 'grayscale', label: 'Grayscale' },
  { id: 'sepia', label: 'Sepia' },
  { id: 'vivid', label: 'Vivid' },
  { id: 'cool', label: 'Cool Tone' },
  { id: 'warm', label: 'Warm Tone' },
  { id: 'cinematic', label: 'Cinematic' },
];

export function buildEffectFilters(clip) {
  const filters = [];
  const preset = clip.effectPreset || 'none';
  const brightness = clip.brightness ?? 0;
  const contrast = clip.contrast ?? 1;
  const saturation = clip.saturation ?? 1;

  const eqParts = [];
  if (brightness !== 0) eqParts.push(`brightness=${brightness}`);
  if (contrast !== 1) eqParts.push(`contrast=${contrast}`);
  if (saturation !== 1) eqParts.push(`saturation=${saturation}`);

  switch (preset) {
    case 'grayscale':
      filters.push('hue=s=0');
      break;
    case 'sepia':
      filters.push(
        'colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131'
      );
      break;
    case 'vivid':
      filters.push('eq=saturation=1.4:contrast=1.1');
      break;
    case 'cool':
      filters.push('colorbalance=bs=0.15:gs=-0.05');
      break;
    case 'warm':
      filters.push('colorbalance=rs=0.15:bs=-0.1');
      break;
    case 'cinematic':
      filters.push('eq=contrast=1.15:brightness=-0.05:saturation=0.9');
      filters.push('vignette=PI/5');
      break;
    default:
      break;
  }

  if (eqParts.length && preset === 'none') {
    filters.push(`eq=${eqParts.join(':')}`);
  }

  return filters;
}

export function getPreviewEffectFilter(clip) {
  if (!clip) return undefined;

  const parts = [];
  const preset = clip.effectPreset || 'none';
  const brightness = clip.brightness ?? 0;
  const contrast = clip.contrast ?? 1;
  const saturation = clip.saturation ?? 1;

  if (brightness !== 0) {
    parts.push(`brightness(${1 + brightness})`);
  }
  if (contrast !== 1) {
    parts.push(`contrast(${contrast})`);
  }
  if (saturation !== 1) {
    parts.push(`saturate(${saturation})`);
  }

  switch (preset) {
    case 'grayscale':
      parts.push('grayscale(1)');
      break;
    case 'sepia':
      parts.push('sepia(0.85)');
      break;
    case 'vivid':
      parts.push('saturate(1.4) contrast(1.1)');
      break;
    case 'cool':
      parts.push('hue-rotate(15deg) saturate(1.1)');
      break;
    case 'warm':
      parts.push('sepia(0.25) saturate(1.2)');
      break;
    case 'cinematic':
      parts.push('contrast(1.15) brightness(0.95) saturate(0.9)');
      break;
    default:
      break;
  }

  return parts.length ? parts.join(' ') : undefined;
}
