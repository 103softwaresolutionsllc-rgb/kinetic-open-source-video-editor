// WebGL1 shaders for the grade preview pipeline (Phase 1, OpenShot-parity
// plan §3). The fragment shader is the preview twin of the FFmpeg export
// chain built by buildEffectFilters() in src/utils/videoEffects.js — same
// resolved grade, same operation order:
//
//   neon (brand glow, preview-only) → user eq → desaturate | matrix →
//   colorbalance → preset eq → vignette (in YUV, like FFmpeg)
//
// applyGradeShaderModel() in videoEffects.js is a line-for-line JS
// transliteration of this shader; scripts/verify-grade-parity.mjs compares
// both against real FFmpeg output and asserts the shared constants below
// (luma weights, sepia matrix, colorbalance trapezoids, eq pivot) stay in
// sync between the two files. Change them together.

export const VERTEX_SHADER = `
attribute vec2 aPos;
uniform vec4 uCrop;
varying vec2 vUv;

void main() {
  vUv = uCrop.xy + aPos * uCrop.zw;
  gl_Position = vec4(aPos * 2.0 - 1.0, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vUv;

uniform sampler2D uVideo;
uniform vec2 uResolution;

uniform vec3 uEqUser;
uniform vec3 uEqPreset;
uniform vec3 uBalanceS;
uniform vec3 uBalanceM;
uniform vec3 uBalanceH;
uniform mat3 uMatrix;
uniform float uUseMatrix;
uniform float uDesaturate;
uniform float uVignette;
uniform float uNeon;
uniform mat3 uNeonHue;

const vec3 LUMA = vec3(0.299, 0.587, 0.114);
const vec3 LUMA709 = vec3(0.213, 0.715, 0.072);

vec3 rgbToYuv(vec3 c) {
  float yFull = dot(c, LUMA) * 255.0;
  return vec3(
    16.0 + (219.0 / 255.0) * yFull,
    128.0 + (224.0 / 255.0) * 0.5642 * (c.b * 255.0 - yFull),
    128.0 + (224.0 / 255.0) * 0.7133 * (c.r * 255.0 - yFull)
  );
}

vec3 yuvToRgb(vec3 yuv) {
  float yFull = (yuv.x - 16.0) * 255.0 / 219.0;
  float r = yFull + (yuv.z - 128.0) * 255.0 / (224.0 * 0.7133);
  float b = yFull + (yuv.y - 128.0) * 255.0 / (224.0 * 0.5642);
  float g = (yFull - 0.299 * r - 0.114 * b) / 0.587;
  return vec3(r, g, b) / 255.0;
}

// FFmpeg eq runs on limited-range YUV planes with LUTs of the form
// out = (in - 128) * k + 127 and uint8 clamping; reproduce it exactly as
// a YUV round-trip (a neutral grade emits no eq filter, and is skipped
// here too via the identity early-out).
vec3 applyEq(vec3 c, vec3 e) {
  if (e.x == 0.0 && e.y == 1.0 && e.z == 1.0) return c;
  vec3 yuv = rgbToYuv(c);
  yuv.x = clamp((yuv.x - 128.0) * e.y + 127.0 + e.x * 255.0, 0.0, 255.0);
  yuv.y = clamp((yuv.y - 128.0) * e.z + 127.0, 0.0, 255.0);
  yuv.z = clamp((yuv.z - 128.0) * e.z + 127.0, 0.0, 255.0);
  return yuvToRgb(yuv);
}

float trapWeight(float l, vec4 t) {
  if (l >= t.w) return 0.0;
  if (l > t.z) return 0.70 * (1.0 - (l - t.z) / (t.w - t.z));
  if (l >= t.y) return 0.70;
  if (l > t.x) return 0.70 * ((l - t.x) / (t.y - t.x));
  return t.x == 0.0 ? 0.70 : 0.0;
}

// Trapezoids fitted to FFmpeg 8.1 colorbalance output; t = (riseFrom,
// riseTo, fallFrom, fallTo). Keep in sync with COLORBALANCE_TRAPEZOIDS.
vec3 balanceWeights(float l) {
  return vec3(
    trapWeight(l, vec4(0.0, 0.0, 0.10, 0.23)),
    trapWeight(l, vec4(0.104, 0.235, 0.265, 0.395)),
    trapWeight(l, vec4(0.27, 0.40, 0.79, 1.0))
  );
}

// The brand-kit neon glow, formerly the CSS filter string
// saturate(1.15) hue-rotate(285deg) brightness(1.05) contrast(1.05),
// reproduced with the CSS filter definitions so it survives WebGL.
vec3 applyNeon(vec3 c) {
  float y = dot(c, LUMA709);
  c = vec3(y) + (c - vec3(y)) * 1.15;
  c = uNeonHue * c;
  c *= 1.05;
  c = (c - 0.5) * 1.05 + 0.5;
  return c;
}

void main() {
  vec3 c = texture2D(uVideo, vUv).rgb;

  if (uNeon > 0.5) c = applyNeon(c);

  c = applyEq(c, uEqUser);

  if (uDesaturate > 0.5) {
    c = vec3(dot(c, LUMA));
  } else {
    // The export graph materializes uint8 RGB before the matrix/balance
    // filters; clamp here so out-of-gamut eq results behave identically.
    if (uUseMatrix > 0.5 || uBalanceS != vec3(0.0) || uBalanceM != vec3(0.0) || uBalanceH != vec3(0.0)) {
      c = clamp(c, 0.0, 1.0);
    }
    if (uUseMatrix > 0.5) c = uMatrix * c;
    if (uBalanceS != vec3(0.0) || uBalanceM != vec3(0.0) || uBalanceH != vec3(0.0)) {
      float lightness = (max(c.r, max(c.g, c.b)) + min(c.r, min(c.g, c.b))) * 0.5;
      vec3 w = balanceWeights(lightness);
      c += uBalanceS * w.x + uBalanceM * w.y + uBalanceH * w.z;
    }
  }

  c = applyEq(c, uEqPreset);

  if (uVignette > 0.0) {
    // FFmpeg vignette in the export graph's YUV context: the Y plane
    // scales by cos^4(radius * angle), chroma scales around 127 by the
    // same factor. Radius is normalized by the half-diagonal and measured
    // from pixel indices (gl_FragCoord is index + 0.5).
    vec2 d = (gl_FragCoord.xy - 0.5 - 0.5 * uResolution) / (0.5 * length(uResolution));
    float f = pow(cos(min(length(d) * uVignette, 1.5707963)), 4.0);
    vec3 yuv = rgbToYuv(c);
    yuv.x *= f;
    yuv.y = 127.0 + (yuv.y - 127.0) * f;
    yuv.z = 127.0 + (yuv.z - 127.0) * f;
    c = yuvToRgb(yuv);
  }

  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
}
`;
