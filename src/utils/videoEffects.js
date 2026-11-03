// ─────────────────────────────────────────────────────────────────────────────
// Unified grade-state model (Phase 1 of the OpenShot-parity plan).
//
// ONE resolved grade per clip drives BOTH render paths:
//   • WebGL preview  → buildGradeUniforms() feeds src/render/gradeShader.js
//   • FFmpeg export  → buildEffectFilters() emits the equivalent filter chain
// so the preview computes the same math the export runs, instead of
// approximating it. Before this module existed, preview used CSS filter
// strings that visibly diverged from export (e.g. Cool Tone previewed as
// `hue-rotate(15deg)` but exported as `colorbalance=bs=0.15:gs=-0.05`).
//
// getPreviewEffectFilter() below is the LEGACY CSS approximation. It survives
// ONLY as the fallback preview when WebGL is unavailable (see
// PreviewCompositor) and is known to diverge from export there — the WebGL
// path is the parity path.
//
// The shader-side math mirrors FFmpeg's filters as measured against the
// system FFmpeg (probed empirically; see scripts/verify-grade-parity.mjs):
//   • eq works on limited-range YUV planes with LUTs of the form
//     out = (in − 128) × k + 127 (yes, 127 — at "identity" settings an
//     explicit eq pass still shifts every plane by −1; a NEUTRAL grade
//     emits no eq filter at all, and the shader likewise skips it).
//     Saturation scales chroma the same way; outputs clamp to [0, 255].
//     The shader therefore runs eq as a YUV round-trip, exactly like the
//     export graph, instead of approximating it in RGB.
//   • colorbalance weights are trapezoids over HSL lightness ((max+min)/2),
//     fitted to FFmpeg 8.1 output (peak weight 0.70).
//   • vignette (in the export graph's YUV context) scales the Y plane by
//     cos⁴(radius × angle) and chroma around 127 by the same factor — NOT
//     an RGB multiply (that is why exported vignettes tint saturated
//     colors slightly; the shader reproduces the same behavior).
// Known residual deltas vs FFmpeg are listed in the parity harness header.
// ─────────────────────────────────────────────────────────────────────────────

export const EFFECT_PRESETS = [
  { id: 'none', label: 'None' },
  { id: 'grayscale', label: 'Grayscale' },
  { id: 'sepia', label: 'Sepia' },
  { id: 'vivid', label: 'Vivid' },
  { id: 'cool', label: 'Cool Tone' },
  { id: 'warm', label: 'Warm Tone' },
  { id: 'cinematic', label: 'Cinematic' },
];

export const NEUTRAL_GRADE = {
  preset: 'none',
  brightness: 0,
  contrast: 1,
  saturation: 1,
};

// Sepia as an FFmpeg colorchannelmixer matrix, row-major (rows = R, G, B out).
export const SEPIA_MATRIX = [
  0.393, 0.769, 0.189,
  0.349, 0.686, 0.168,
  0.272, 0.534, 0.131,
];

// Colorbalance weight trapezoids over lightness, fitted to FFmpeg 8.1 probes
// (value-independent: delta = value × 255 × weight(lightness) per channel).
// The GLSL in gradeShader.js duplicates these constants — the parity harness
// asserts they stay in sync.
export const COLORBALANCE_PEAK = 0.7;
export const COLORBALANCE_TRAPEZOIDS = {
  shadows: { riseFrom: 0, riseTo: 0, fallFrom: 0.1, fallTo: 0.23 },
  midtones: { riseFrom: 0.104, riseTo: 0.235, fallFrom: 0.265, fallTo: 0.395 },
  highlights: { riseFrom: 0.27, riseTo: 0.4, fallFrom: 0.79, fallTo: 1.0 },
};

// Each legacy preset expressed ONCE, in shared terms. The export builder and
// the shader-uniform builder both derive from this table.
const PRESET_LAYERS = {
  none: {},
  grayscale: { desaturate: true },
  sepia: { matrix: SEPIA_MATRIX },
  vivid: { eq: { brightness: 0, contrast: 1.1, saturation: 1.4 } },
  cool: { balance: { bs: 0.15, gs: -0.05 } },
  warm: { balance: { rs: 0.15, bs: -0.1 } },
  cinematic: {
    eq: { brightness: -0.05, contrast: 1.15, saturation: 0.9 },
    vignette: Math.PI / 5,
  },
};

const BALANCE_KEYS = ['rs', 'gs', 'bs', 'rm', 'gm', 'bm', 'rh', 'gh', 'bh'];

function finiteOr(value, fallback) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

/**
 * Resolve a clip's grade, filling defaults for anything missing so projects
 * saved by older versions (which only have the legacy flat fields) load
 * unchanged. A clip.grade object, when present (Phase 2+ writers), takes
 * precedence over the legacy flat fields; the legacy fields are the fallback.
 */
export function resolveClipGrade(clip) {
  if (!clip) return { ...NEUTRAL_GRADE };
  const stored =
    clip.grade && typeof clip.grade === 'object' ? clip.grade : null;
  return {
    preset: stored?.preset ?? clip.effectPreset ?? NEUTRAL_GRADE.preset,
    brightness: finiteOr(
      stored?.brightness ?? clip.brightness,
      NEUTRAL_GRADE.brightness
    ),
    contrast: finiteOr(
      stored?.contrast ?? clip.contrast,
      NEUTRAL_GRADE.contrast
    ),
    saturation: finiteOr(
      stored?.saturation ?? clip.saturation,
      NEUTRAL_GRADE.saturation
    ),
  };
}

/** The preset's grade layer with every field defaulted. */
export function getPresetLayer(presetId) {
  const layer = PRESET_LAYERS[presetId] ?? {};
  const balance = {};
  for (const key of BALANCE_KEYS) balance[key] = layer.balance?.[key] ?? 0;
  return {
    eq: {
      brightness: layer.eq?.brightness ?? 0,
      contrast: layer.eq?.contrast ?? 1,
      saturation: layer.eq?.saturation ?? 1,
    },
    balance,
    matrix: layer.matrix ?? null,
    desaturate: Boolean(layer.desaturate),
    vignette: layer.vignette ?? 0,
  };
}

// ── FFmpeg export builder ────────────────────────────────────────────────────

function fmtNum(n) {
  const v = Math.round(n * 10000) / 10000;
  return String(Object.is(v, -0) ? 0 : v);
}

function eqFilterString(eq) {
  const parts = [];
  if (eq.brightness !== 0) parts.push(`brightness=${fmtNum(eq.brightness)}`);
  if (eq.contrast !== 1) parts.push(`contrast=${fmtNum(eq.contrast)}`);
  if (eq.saturation !== 1) parts.push(`saturation=${fmtNum(eq.saturation)}`);
  return parts.length ? `eq=${parts.join(':')}` : null;
}

/**
 * FFmpeg filter strings for a clip's grade, in application order:
 * user eq → preset (desaturate / matrix / colorbalance / eq) → vignette.
 *
 * Behavior change vs v1.0.0, by design: the user's brightness/contrast/
 * saturation sliders now apply on top of EVERY preset. The old code silently
 * dropped them unless the preset was "none". With neutral sliders the output
 * is pixel-identical to v1.0.0 (verified by the parity harness).
 */
export function buildEffectFilters(clip) {
  const grade = resolveClipGrade(clip);
  const layer = getPresetLayer(grade.preset);
  const filters = [];

  const userEq = eqFilterString(grade);
  if (userEq) filters.push(userEq);

  if (layer.desaturate) {
    filters.push('hue=s=0');
  }
  if (layer.matrix) {
    // colorchannelmixer takes FOUR values per row (r, g, b, constant);
    // the grade matrix is 3×3, so each row gains a 0 constant term.
    const m = layer.matrix;
    const expanded = [
      m[0], m[1], m[2], 0,
      m[3], m[4], m[5], 0,
      m[6], m[7], m[8], 0,
    ];
    filters.push(`colorchannelmixer=${expanded.map(fmtNum).join(':')}`);
  }
  const balanceParts = BALANCE_KEYS.filter(
    (key) => layer.balance[key] !== 0
  ).map((key) => `${key}=${fmtNum(layer.balance[key])}`);
  if (balanceParts.length) {
    filters.push(`colorbalance=${balanceParts.join(':')}`);
  }
  const presetEq = eqFilterString(layer.eq);
  if (presetEq) filters.push(presetEq);
  if (layer.vignette) {
    filters.push(`vignette=${fmtNum(layer.vignette)}`);
  }

  return filters;
}

// ── WebGL preview builder ────────────────────────────────────────────────────

/**
 * Shader inputs for a clip's grade — the same resolved grade and preset
 * layer buildEffectFilters() consumes, flattened for glGradeRenderer.
 * `neon` is the brand-kit neon glow (a preview-only CSS effect in v1.0.0,
 * reproduced in the shader so it survives the WebGL path).
 */
export function buildGradeUniforms(clip, { neon = false } = {}) {
  const grade = resolveClipGrade(clip);
  const layer = getPresetLayer(grade.preset);
  return {
    eqUser: [grade.brightness, grade.contrast, grade.saturation],
    eqPreset: [layer.eq.brightness, layer.eq.contrast, layer.eq.saturation],
    balance: BALANCE_KEYS.map((key) => layer.balance[key]),
    matrix: layer.matrix,
    desaturate: layer.desaturate,
    vignette: layer.vignette,
    neon: Boolean(neon),
  };
}

// ── JS mirrors of the two render paths (verification + Phase 2 scopes) ──────

const KR = 0.299;
const KG = 0.587;
const KB = 0.114;
const U_SCALE = 0.5 / (1 - KB); // 0.5642
const V_SCALE = 0.5 / (1 - KR); // 0.7133

export function rgbToYuv601Limited([r, g, b]) {
  const yFull = KR * r + KG * g + KB * b;
  return [
    16 + (219 / 255) * yFull,
    128 + (224 / 255) * U_SCALE * (b - yFull),
    128 + (224 / 255) * V_SCALE * (r - yFull),
  ];
}

export function yuv601LimitedToRgb([y, u, v]) {
  const yFull = ((y - 16) * 255) / 219;
  const r = yFull + ((v - 128) * 255) / (224 * V_SCALE);
  const b = yFull + ((u - 128) * 255) / (224 * U_SCALE);
  const g = (yFull - KR * r - KB * b) / KG;
  return [r, g, b];
}

const clamp255 = (v) => Math.min(255, Math.max(0, v));

/**
 * Reference model of FFmpeg's per-filter math, run in the color space each
 * filter natively uses (eq/hue/vignette in YUV planes, colorbalance and
 * colorchannelmixer in RGB). Input/output are [r,g,b] in 0..255.
 * `vignetteR` is the pixel's normalized radial distance (0 center, 1 corner).
 */
export function applyGradeFfmpegModel(rgb, uniforms, vignetteR = 0) {
  let [y, u, v] = rgbToYuv601Limited(rgb);

  const isIdentityEq = ([b, c, s]) => b === 0 && c === 1 && s === 1;
  const applyEqYuv = ([brightness, contrast, saturation]) => {
    // FFmpeg eq LUTs, probed: out = (in − 128) × k + 127, clamped.
    // Identity settings emit no filter in the export graph, so skip.
    if (isIdentityEq([brightness, contrast, saturation])) return;
    u = clamp255((u - 128) * saturation + 127);
    v = clamp255((v - 128) * saturation + 127);
    y = clamp255((y - 128) * contrast + 127 + brightness * 255);
  };

  applyEqYuv(uniforms.eqUser);

  if (uniforms.desaturate) {
    u = 128;
    v = 128;
  }

  const needsRgb = uniforms.matrix || uniforms.balance.some((x) => x !== 0);
  if (needsRgb) {
    // The export graph materializes uint8 RGB before these filters, so
    // out-of-gamut values clamp HERE, before the matrix/balance math.
    let [r, g, b] = yuv601LimitedToRgb([y, u, v]).map(clamp255);
    if (uniforms.matrix) {
      const m = uniforms.matrix;
      [r, g, b] = [
        m[0] * r + m[1] * g + m[2] * b,
        m[3] * r + m[4] * g + m[5] * b,
        m[6] * r + m[7] * g + m[8] * b,
      ];
    }
    if (uniforms.balance.some((x) => x !== 0)) {
      const lightness =
        (Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255;
      const [ws, wm, wh] = colorBalanceWeights(lightness);
      const bal = uniforms.balance;
      r += 255 * (bal[0] * ws + bal[3] * wm + bal[6] * wh);
      g += 255 * (bal[1] * ws + bal[4] * wm + bal[7] * wh);
      b += 255 * (bal[2] * ws + bal[5] * wm + bal[8] * wh);
    }
    [y, u, v] = rgbToYuv601Limited([
      clamp255(r),
      clamp255(g),
      clamp255(b),
    ]);
  }

  applyEqYuv(uniforms.eqPreset);

  if (uniforms.vignette) {
    const f = Math.pow(
      Math.cos(Math.min(vignetteR * uniforms.vignette, Math.PI / 2)),
      4
    );
    y *= f;
    u = 127 + (u - 127) * f;
    v = 127 + (v - 127) * f;
  }

  return yuv601LimitedToRgb([y, u, v]).map(clamp255);
}

/** Trapezoid weight for one colorbalance range at the given lightness. */
function trapezoidWeight(l, { riseFrom, riseTo, fallFrom, fallTo }) {
  if (l >= fallTo) return 0;
  if (l > fallFrom) return COLORBALANCE_PEAK * (1 - (l - fallFrom) / (fallTo - fallFrom));
  if (l >= riseTo) return COLORBALANCE_PEAK;
  if (l > riseFrom) return COLORBALANCE_PEAK * ((l - riseFrom) / (riseTo - riseFrom));
  return riseFrom === 0 ? COLORBALANCE_PEAK : 0;
}

/** [shadows, midtones, highlights] weights for a lightness in 0..1. */
export function colorBalanceWeights(lightness) {
  return [
    trapezoidWeight(lightness, COLORBALANCE_TRAPEZOIDS.shadows),
    trapezoidWeight(lightness, COLORBALANCE_TRAPEZOIDS.midtones),
    trapezoidWeight(lightness, COLORBALANCE_TRAPEZOIDS.highlights),
  ];
}

/**
 * Line-for-line JS transliteration of the fragment shader in
 * src/render/gradeShader.js. Input/output are [r,g,b] in 0..255;
 * `vignetteR` is the normalized radial distance as computed in the shader.
 * If you change the shader, change this too — the parity harness compares
 * the two against real FFmpeg output and asserts shared constants.
 */
export function applyGradeShaderModel(rgb, uniforms, vignetteR = 0) {
  let [r, g, b] = rgb.map((x) => x / 255);

  // The shader runs eq as a YUV round-trip with FFmpeg's LUT shapes and
  // plane clamping — see gradeShader.js (applyEq there is this function).
  const applyEq = ([brightness, contrast, saturation]) => {
    if (brightness === 0 && contrast === 1 && saturation === 1) return;
    let [y, u, v] = rgbToYuv601Limited([r * 255, g * 255, b * 255]);
    u = clamp255((u - 128) * saturation + 127);
    v = clamp255((v - 128) * saturation + 127);
    y = clamp255((y - 128) * contrast + 127 + brightness * 255);
    [r, g, b] = yuv601LimitedToRgb([y, u, v]).map((x) => x / 255);
  };

  if (uniforms.neon) {
    // CSS: saturate(1.15) hue-rotate(285deg) brightness(1.05) contrast(1.05)
    const y709 = 0.213 * r + 0.715 * g + 0.072 * b;
    r = y709 + (r - y709) * 1.15;
    g = y709 + (g - y709) * 1.15;
    b = y709 + (b - y709) * 1.15;
    [r, g, b] = hueRotate709([r, g, b], 285);
    r *= 1.05;
    g *= 1.05;
    b *= 1.05;
    r = (r - 0.5) * 1.05 + 0.5;
    g = (g - 0.5) * 1.05 + 0.5;
    b = (b - 0.5) * 1.05 + 0.5;
  }

  applyEq(uniforms.eqUser);

  if (uniforms.desaturate) {
    const y = KR * r + KG * g + KB * b;
    r = y;
    g = y;
    b = y;
  } else {
    // Match the export graph's uint8 RGB materialization before the
    // matrix/balance filters (see applyGradeFfmpegModel).
    if (uniforms.matrix || uniforms.balance.some((x) => x !== 0)) {
      r = Math.min(1, Math.max(0, r));
      g = Math.min(1, Math.max(0, g));
      b = Math.min(1, Math.max(0, b));
    }
    if (uniforms.matrix) {
      const m = uniforms.matrix;
      [r, g, b] = [
        m[0] * r + m[1] * g + m[2] * b,
        m[3] * r + m[4] * g + m[5] * b,
        m[6] * r + m[7] * g + m[8] * b,
      ];
    }
    if (uniforms.balance.some((x) => x !== 0)) {
      const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
      const [ws, wm, wh] = colorBalanceWeights(lightness);
      const bal = uniforms.balance;
      r += bal[0] * ws + bal[3] * wm + bal[6] * wh;
      g += bal[1] * ws + bal[4] * wm + bal[7] * wh;
      b += bal[2] * ws + bal[5] * wm + bal[8] * wh;
    }
  }
  applyEq(uniforms.eqPreset);

  if (uniforms.vignette) {
    // FFmpeg vignette in YUV: Y scales by f, chroma scales around 127.
    const f = Math.pow(
      Math.cos(Math.min(vignetteR * uniforms.vignette, Math.PI / 2)),
      4
    );
    let [y, u, v] = rgbToYuv601Limited([r * 255, g * 255, b * 255]);
    y *= f;
    u = 127 + (u - 127) * f;
    v = 127 + (v - 127) * f;
    [r, g, b] = yuv601LimitedToRgb([y, u, v]).map((x) => x / 255);
  }

  return [r, g, b].map((x) => clamp255(x * 255));
}

/** CSS/SVG hue-rotate matrix (feColorMatrix) applied to [r,g,b] in 0..1. */
export function hueRotate709([r, g, b], degrees) {
  const a = (degrees * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return [
    (0.213 + 0.787 * cos - 0.213 * sin) * r +
      (0.715 - 0.715 * cos - 0.715 * sin) * g +
      (0.072 - 0.072 * cos + 0.928 * sin) * b,
    (0.213 - 0.213 * cos + 0.143 * sin) * r +
      (0.715 + 0.285 * cos + 0.140 * sin) * g +
      (0.072 - 0.072 * cos - 0.283 * sin) * b,
    (0.213 - 0.213 * cos - 0.787 * sin) * r +
      (0.715 - 0.715 * cos + 0.715 * sin) * g +
      (0.072 + 0.928 * cos + 0.072 * sin) * b,
  ];
}

// ── Legacy CSS fallback (no-WebGL preview only — known to diverge) ──────────

/**
 * LEGACY v1.0.0 preview approximation. Used only when WebGL is unavailable;
 * these CSS strings do NOT match the export math (Cool Tone is the known
 * example). Kept byte-for-byte so the fallback path behaves exactly as
 * v1.0.0 did.
 */
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
