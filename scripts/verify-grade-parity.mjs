// ─────────────────────────────────────────────────────────────────────────────
// Grade parity harness (Phase 1, OpenShot-parity plan §4).
//
// Verifies that the WebGL preview math and the FFmpeg export chain are the
// same computation, three ways:
//   1. LEGACY COMPAT — for every preset with neutral sliders, the NEW export
//      filter chain must produce pixel-identical output to the v1.0.0 chain
//      (existing projects must not change appearance).
//   2. FFMPEG-MODEL — applyGradeFfmpegModel() (the JS model of FFmpeg's
//      per-filter math) vs the real system FFmpeg running the export chain.
//   3. SHADER-MODEL — applyGradeShaderModel() (line-for-line JS twin of
//      gradeShader.js) vs the same real FFmpeg output.
//
// Method: a strip of known RGB pixels is pushed through the system ffmpeg
// binary (rawvideo in/out) with the exact filter strings buildEffectFilters()
// emits, and compared channel-by-channel with the models.
//
// Measured against system FFmpeg 8.1.2. The shipped export uses the
// @ffmpeg/core 0.12.10 wasm build (older FFmpeg lineage); the filters used
// here implement the same documented math in both. Known residual deltas:
//   • FFmpeg 8.1 builds its eq LUTs in a 16-bit integer domain; the result
//     deviates from the clean float LUT form ((in−128)·k + 127 + 255·b) by
//     up to ~5 LSB per eq pass (measured: the pivot out(128) is a few LSB
//     below the float prediction, asymmetrically at negative brightness).
//     Two chained eq passes (user sliders over vivid/cinematic) compound
//     to ~10 LSB worst-case. The model deliberately uses the clean form:
//     the shipped wasm core's LUT bias could not be measured headlessly
//     (its worker requires a browser environment), and baking 8.1's
//     artifact into the shader could just as easily move the preview AWAY
//     from the real export. Thresholds below are set to this measured
//     envelope: shader/ffmpeg-model max ≤ 10 LSB, mean ≤ 4 LSB.
//   • Integer colorspace conversions inside FFmpeg cost ±1–2 LSB.
//   • colorbalance trapezoids are fitted, not exact (worst at balance
//     values near ±1; the shipped presets use ≤ 0.15, where error is ~1 LSB).
//
// Usage: node scripts/verify-grade-parity.mjs   (needs ffmpeg on PATH)
// ─────────────────────────────────────────────────────────────────────────────

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const {
  EFFECT_PRESETS,
  buildEffectFilters,
  buildGradeUniforms,
  applyGradeFfmpegModel,
  applyGradeShaderModel,
  resolveClipGrade,
} = await import(join(here, '..', 'src', 'utils', 'videoEffects.js'));

let failures = 0;
function check(label, ok, detail = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures += 1;
}

// ── ffmpeg runner ────────────────────────────────────────────────────────────

function runFfmpeg(pixels, w, h, vf) {
  const input = Buffer.from(pixels.flat());
  const args = [
    '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
    '-s', `${w}x${h}`, '-i', 'pipe:0',
  ];
  if (vf) args.push('-vf', vf);
  args.push('-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1');
  const r = spawnSync('ffmpeg', args, { input, maxBuffer: 1 << 26 });
  if (r.status !== 0) {
    throw new Error(`ffmpeg failed for vf="${vf}": ${r.stderr.toString()}`);
  }
  const out = [];
  for (let i = 0; i < r.stdout.length; i += 3) {
    out.push([r.stdout[i], r.stdout[i + 1], r.stdout[i + 2]]);
  }
  return out;
}

// ── the v1.0.0 export builder, verbatim, for legacy-compat comparison ───────

function legacyBuildEffectFilters(clip) {
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

// ── fixtures ─────────────────────────────────────────────────────────────────

const COLORS = [
  [0, 0, 0], [32, 32, 32], [96, 96, 96], [128, 128, 128], [160, 160, 160],
  [224, 224, 224], [255, 255, 255], [255, 0, 0], [0, 255, 0], [0, 0, 255],
  [255, 255, 0], [0, 255, 255], [255, 0, 255], [232, 184, 148],
  [160, 110, 80], [200, 100, 50], [30, 180, 90], [120, 120, 200],
  [12, 24, 36], [250, 240, 230], [90, 60, 140], [255, 128, 0],
  [0, 128, 255], [180, 30, 120],
];

function maxMeanErr(actual, expected) {
  let max = 0;
  let sum = 0;
  let n = 0;
  for (let i = 0; i < expected.length; i++) {
    for (let ch = 0; ch < 3; ch++) {
      const e = Math.abs(actual[i][ch] - expected[i][ch]);
      max = Math.max(max, e);
      sum += e;
      n += 1;
    }
  }
  return { max, mean: sum / n };
}

// Radial distance exactly as FFmpeg and the shader compute it: from pixel
// indices (no +0.5), normalized by the half-diagonal.
function radialAt(x, y, w, h) {
  const dx = (x - w / 2) / (0.5 * Math.hypot(w, h));
  const dy = (y - h / 2) / (0.5 * Math.hypot(w, h));
  return Math.hypot(dx, dy);
}

// ── 0. shader-source constant sync ───────────────────────────────────────────

{
  const shader = readFileSync(join(here, '..', 'src', 'render', 'gradeShader.js'), 'utf8');
  const required = [
    '0.299', '0.587', '0.114', // luma
    '0.393', '0.769', '0.189', '0.349', '0.686', '0.168', '0.272', '0.534', '0.131', // sepia (via uniforms — checked below too)
    '128.0', '219.0', // eq pivot / range
    '0.104', '0.235', '0.265', '0.395', '0.27', '0.79', '0.10', '0.23', '0.70', // colorbalance trapezoids
  ];
  // Sepia lives in videoEffects (passed as a uniform), not in the shader;
  // assert it in the shader only if present there, always assert the rest.
  const missing = required.filter(
    (s) => !shader.includes(s) && !['0.393', '0.769', '0.189', '0.349', '0.686', '0.168', '0.272', '0.534', '0.131'].includes(s)
  );
  check('shader source carries the shared constants', missing.length === 0,
    missing.length ? `missing: ${missing.join(', ')}` : '');

  const braces = (shader.match(/\{/g) || []).length - (shader.match(/\}/g) || []).length;
  const parens = (shader.match(/\(/g) || []).length - (shader.match(/\)/g) || []).length;
  check('shader source braces/parens balanced', braces === 0 && parens === 0);
}

// ── 1. grade resolution / backward compatibility ────────────────────────────

{
  const neutral = resolveClipGrade({});
  check('empty clip resolves to neutral grade',
    neutral.preset === 'none' && neutral.brightness === 0 &&
    neutral.contrast === 1 && neutral.saturation === 1);

  const legacyOnly = resolveClipGrade({ effectPreset: 'cool', brightness: 0.2 });
  check('legacy fields resolve (old projects)',
    legacyOnly.preset === 'cool' && legacyOnly.brightness === 0.2 &&
    legacyOnly.contrast === 1 && legacyOnly.saturation === 1);

  const withGrade = resolveClipGrade({
    effectPreset: 'cool', brightness: 0.2,
    grade: { preset: 'warm', brightness: -0.1, contrast: 1.2, saturation: 0.8 },
  });
  check('stored grade object takes precedence over legacy fields',
    withGrade.preset === 'warm' && withGrade.brightness === -0.1 &&
    withGrade.contrast === 1.2 && withGrade.saturation === 0.8);

  const junk = resolveClipGrade({ brightness: NaN, contrast: 'high' });
  check('non-finite values fall back to defaults',
    junk.brightness === 0 && junk.contrast === 1);
}

// ── 2. legacy compat: new export chain == v1.0.0 export, neutral sliders ────

for (const preset of EFFECT_PRESETS) {
  const clip = { effectPreset: preset.id };
  const legacyVf = legacyBuildEffectFilters(clip).join(',');
  const newVf = buildEffectFilters(clip).join(',');
  const legacyOut = legacyVf ? runFfmpeg(COLORS, COLORS.length, 1, legacyVf) : COLORS;
  const newOut = newVf ? runFfmpeg(COLORS, COLORS.length, 1, newVf) : COLORS;
  const { max } = maxMeanErr(newOut, legacyOut);
  check(`legacy compat: ${preset.id}`, max <= 1, `max channel diff ${max} LSB`);
}

// ── 3. pixel parity: models vs real FFmpeg, all presets × slider sets ───────

const SLIDER_SETS = [
  { name: 'neutral', values: {} },
  { name: 'b+0.12 c1.25 s0.7', values: { brightness: 0.12, contrast: 1.25, saturation: 0.7 } },
  { name: 'b-0.15 c0.8 s1.6', values: { brightness: -0.15, contrast: 0.8, saturation: 1.6 } },
];

for (const preset of EFFECT_PRESETS) {
  for (const set of SLIDER_SETS) {
    const clip = { effectPreset: preset.id, ...set.values };
    const vf = buildEffectFilters(clip).join(',');
    const uniforms = buildGradeUniforms(clip);
    const ffmpegOut = vf ? runFfmpeg(COLORS, COLORS.length, 1, vf) : COLORS;

    const shaderOut = COLORS.map((px, i) =>
      applyGradeShaderModel(px, uniforms, radialAt(i, 0, COLORS.length, 1)));
    const ffmpegModelOut = COLORS.map((px, i) =>
      applyGradeFfmpegModel(px, uniforms, radialAt(i, 0, COLORS.length, 1)));

    const s = maxMeanErr(shaderOut, ffmpegOut);
    const f = maxMeanErr(ffmpegModelOut, ffmpegOut);
    check(
      `parity ${preset.id} / ${set.name}`,
      s.max <= 10 && s.mean <= 4 && f.max <= 10 && f.mean <= 4,
      `shader max ${s.max.toFixed(1)} mean ${s.mean.toFixed(2)} | ffmpeg-model max ${f.max.toFixed(1)} mean ${f.mean.toFixed(2)} LSB`
    );
  }
}

// ── 4. vignette geometry on a real frame (cinematic) ────────────────────────

{
  const W = 128;
  const H = 128;
  const field = Array.from({ length: W * H }, () => [200, 60, 120]);
  const clip = { effectPreset: 'cinematic' };
  const vf = buildEffectFilters(clip).join(',');
  const uniforms = buildGradeUniforms(clip);
  const out = runFfmpeg(field, W, H, vf);

  let max = 0;
  let worst = '';
  for (let y = 0; y < H; y += 8) {
    for (let x = 0; x < W; x += 8) {
      const expected = applyGradeShaderModel(
        [200, 60, 120], uniforms, radialAt(x, y, W, H));
      const actual = out[y * W + x];
      for (let ch = 0; ch < 3; ch++) {
        const e = Math.abs(actual[ch] - expected[ch]);
        if (e > max) { max = e; worst = `at (${x},${y}) ch${ch}: ffmpeg ${actual[ch]} vs shader ${expected[ch].toFixed(1)}`; }
      }
    }
  }
  check('vignette geometry (cinematic, 128×128 saturated field)', max <= 8,
    `max diff ${max.toFixed(1)} LSB ${worst}`);
}

// ── 5. eq direction sanity (shader model) ────────────────────────────────────

{
  const up = applyGradeShaderModel([100, 120, 140],
    buildGradeUniforms({ brightness: 0.2 }));
  check('eq direction: brightness + raises all channels',
    up[0] > 100 && up[1] > 120 && up[2] > 140, `→ ${up.map(v => v.toFixed(0)).join(',')}`);

  const gray = applyGradeShaderModel([200, 100, 50],
    buildGradeUniforms({ saturation: 0 }));
  // FFmpeg's own saturation-0 output is not a perfect gray either — its
  // chroma LUT centers on 127, leaving a ±3 LSB tint (verified against the
  // real binary). The model must land within that same envelope.
  check('eq direction: saturation 0 yields a gray (±4 LSB, FFmpeg 127-center quirk)',
    Math.abs(gray[0] - gray[1]) <= 4 && Math.abs(gray[1] - gray[2]) <= 4,
    `→ ${gray.map(v => v.toFixed(1)).join(',')}`);
}

console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
