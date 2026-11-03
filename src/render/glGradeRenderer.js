// Minimal hand-rolled WebGL1 renderer for the grade preview pipeline.
// No framework: one fullscreen quad, one video texture, one shader pass
// (see gradeShader.js). The <video> element remains the decode engine —
// each draw uploads its current frame as a texture and runs the grade.
//
// createGradeRenderer() returns null when WebGL is unavailable so the
// caller can fall back to the legacy CSS-filter preview (a labeled,
// visibly different code path in PreviewCompositor — not a silent swap).

import { VERTEX_SHADER, FRAGMENT_SHADER } from './gradeShader.js';
import { hueRotate709 } from '../utils/videoEffects.js';

const UNIFORMS = [
  'uVideo',
  'uResolution',
  'uCrop',
  'uEqUser',
  'uEqPreset',
  'uBalanceS',
  'uBalanceM',
  'uBalanceH',
  'uMatrix',
  'uUseMatrix',
  'uDesaturate',
  'uVignette',
  'uNeon',
  'uNeonHue',
];

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Grade shader failed to compile: ${log}`);
  }
  return shader;
}

// hueRotate709 is linear, so its matrix columns are the images of the
// basis vectors. Returned in GLSL's column-major uniform order.
function hueRotateMatrixColumnMajor(degrees) {
  const cols = [
    hueRotate709([1, 0, 0], degrees),
    hueRotate709([0, 1, 0], degrees),
    hueRotate709([0, 0, 1], degrees),
  ];
  return new Float32Array(cols.flat());
}

// Grade matrices are stored row-major (rows = output channels); GLSL
// wants column-major.
function rowMajorToColumnMajor(m) {
  return new Float32Array([
    m[0], m[3], m[6],
    m[1], m[4], m[7],
    m[2], m[5], m[8],
  ]);
}

const IDENTITY_MAT3 = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);

class GlGradeRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    const attrs = {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    };
    const gl =
      canvas.getContext('webgl', attrs) ||
      canvas.getContext('experimental-webgl', attrs);
    if (!gl) throw new Error('WebGL context creation failed');
    this.gl = gl;

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Grade program failed to link: ${gl.getProgramInfoLog(program)}`);
    }
    this.program = program;
    gl.useProgram(program);

    this.uniforms = {};
    for (const name of UNIFORMS) {
      this.uniforms[name] = gl.getUniformLocation(program, name);
    }
    this.aPos = gl.getAttribLocation(program, 'aPos');

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    this.buffer = buffer;

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    this.texture = texture;

    gl.uniform1i(this.uniforms.uVideo, 0);
    gl.uniformMatrix3fv(
      this.uniforms.uNeonHue,
      false,
      hueRotateMatrixColumnMajor(285)
    );
  }

  setSize(width, height) {
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    this.gl.viewport(0, 0, width, height);
  }

  /**
   * Upload the video's current frame and draw it through the grade shader.
   * `uniforms` comes from buildGradeUniforms(); `crop` is a normalized UV
   * rect (origin bottom-left) from getCropUvRect().
   */
  draw(video, uniforms, crop) {
    const gl = this.gl;
    gl.useProgram(this.program);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

    gl.uniform2f(this.uniforms.uResolution, this.canvas.width, this.canvas.height);
    gl.uniform4f(this.uniforms.uCrop, crop.x, crop.y, crop.w, crop.h);
    gl.uniform3fv(this.uniforms.uEqUser, uniforms.eqUser);
    gl.uniform3fv(this.uniforms.uEqPreset, uniforms.eqPreset);
    const bal = uniforms.balance;
    gl.uniform3f(this.uniforms.uBalanceS, bal[0], bal[1], bal[2]);
    gl.uniform3f(this.uniforms.uBalanceM, bal[3], bal[4], bal[5]);
    gl.uniform3f(this.uniforms.uBalanceH, bal[6], bal[7], bal[8]);
    gl.uniformMatrix3fv(
      this.uniforms.uMatrix,
      false,
      uniforms.matrix ? rowMajorToColumnMajor(uniforms.matrix) : IDENTITY_MAT3
    );
    gl.uniform1f(this.uniforms.uUseMatrix, uniforms.matrix ? 1 : 0);
    gl.uniform1f(this.uniforms.uDesaturate, uniforms.desaturate ? 1 : 0);
    gl.uniform1f(this.uniforms.uVignette, uniforms.vignette || 0);
    gl.uniform1f(this.uniforms.uNeon, uniforms.neon ? 1 : 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.enableVertexAttribArray(this.aPos);
    gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  dispose() {
    const gl = this.gl;
    gl.deleteTexture(this.texture);
    gl.deleteBuffer(this.buffer);
    gl.deleteProgram(this.program);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}

export function createGradeRenderer(canvas) {
  try {
    return new GlGradeRenderer(canvas);
  } catch (err) {
    console.warn(
      '[kinetic] WebGL grade preview unavailable; falling back to the ' +
        'legacy CSS-filter preview, whose colors are approximate and do ' +
        'NOT match export exactly.',
      err
    );
    return null;
  }
}
