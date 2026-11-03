import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  getCropPreviewStyles,
  getCropUvRect,
  BRAND_PREVIEW_POSITIONS,
  scaleOverlayFontSize,
} from '../utils/previewCrop.js';
import {
  buildGradeUniforms,
  getPreviewEffectFilter,
} from '../utils/videoEffects.js';
import { createGradeRenderer } from '../render/glGradeRenderer.js';

// Preview render paths (Phase 1, OpenShot-parity plan §3):
//   • WebGL path (default): the <video> element is only the decode engine;
//     its frames are drawn through the grade shader on a <canvas>, so the
//     preview runs the same math as the FFmpeg export.
//   • CSS fallback: if WebGL is unavailable or the context is lost, the
//     video goes back to the legacy CSS-filter rendering below. That path
//     is a v1.0.0 approximation and does NOT match export exactly — the
//     fallback is deliberate and labeled, never silent.

// Internal render-resolution cap (plan §5): the grade pass stays cheap at
// 1080p even for 4K sources; export always renders at full resolution.
const MAX_RENDER_W = 1920;
const MAX_RENDER_H = 1080;

export default function PreviewCompositor({
  videoRef,
  videoClip,
  textOverlays = [],
  brandSettings = null,
  currentTime = 0,
  isPlaying = false,
  isAudioPreview = false,
  children,
}) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const [stageWidth, setStageWidth] = useState(0);
  const [videoSize, setVideoSize] = useState({ w: 0, h: 0 });
  const [glFailed, setGlFailed] = useState(false);

  const useGl = !glFailed && !isAudioPreview;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width ?? 0;
      setStageWidth(width);
    });

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const syncSize = () => {
      setVideoSize({
        w: video.videoWidth || 0,
        h: video.videoHeight || 0,
      });
    };

    syncSize();
    video.addEventListener('loadedmetadata', syncSize);
    video.addEventListener('resize', syncSize);

    return () => {
      video.removeEventListener('loadedmetadata', syncSize);
      video.removeEventListener('resize', syncSize);
    };
  }, [videoRef, videoClip?.id, videoClip?.url]);

  const crop = videoClip?.crop ?? null;
  const cropStyles = useMemo(
    () => getCropPreviewStyles(crop, videoSize.w, videoSize.h),
    [crop, videoSize.w, videoSize.h]
  );

  const uniforms = useMemo(
    () => buildGradeUniforms(videoClip, { neon: brandSettings?.neonGlow }),
    [videoClip, brandSettings?.neonGlow]
  );
  const cropUv = useMemo(
    () => getCropUvRect(crop, videoSize.w, videoSize.h),
    [crop, videoSize.w, videoSize.h]
  );

  // Latest-value refs so the draw loop never closes over stale state.
  const uniformsRef = useRef(uniforms);
  uniformsRef.current = uniforms;
  const cropUvRef = useRef(cropUv);
  cropUvRef.current = cropUv;
  const layoutRef = useRef({ videoSize, crop });
  layoutRef.current = { videoSize, crop };

  const applySize = useCallback((renderer) => {
    const { videoSize: size, crop: c } = layoutRef.current;
    if (!renderer || !size.w || !size.h) return;
    const regionW = c?.width || size.w;
    const regionH = c?.height || size.h;
    const scale = Math.min(1, MAX_RENDER_W / regionW, MAX_RENDER_H / regionH);
    renderer.setSize(
      Math.max(2, Math.round(regionW * scale)),
      Math.max(2, Math.round(regionH * scale))
    );
  }, []);

  const draw = useCallback(() => {
    const renderer = rendererRef.current;
    const video = videoRef?.current;
    if (!renderer || !video) return;
    if (video.readyState < 2 || !video.videoWidth) return;
    renderer.draw(video, uniformsRef.current, cropUvRef.current);
  }, [videoRef]);

  // Create (and dispose) the GL renderer with the canvas element.
  useEffect(() => {
    if (!useGl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = createGradeRenderer(canvas);
    if (!renderer) {
      setGlFailed(true);
      return;
    }
    rendererRef.current = renderer;
    applySize(renderer);
    draw();

    const onContextLost = (event) => {
      event.preventDefault();
      console.warn(
        '[kinetic] WebGL context lost; preview falling back to the legacy ' +
          'CSS-filter rendering, whose colors do NOT match export exactly.'
      );
      setGlFailed(true);
    };
    canvas.addEventListener('webglcontextlost', onContextLost);

    return () => {
      canvas.removeEventListener('webglcontextlost', onContextLost);
      renderer.dispose();
      if (rendererRef.current === renderer) rendererRef.current = null;
    };
  }, [useGl, applySize, draw]);

  // Grade/crop/size changes while paused must repaint the current frame.
  useEffect(() => {
    if (!useGl) return;
    applySize(rendererRef.current);
    draw();
  }, [useGl, uniforms, cropUv, videoSize, crop, applySize, draw]);

  // Continuous redraw while playing; a single repaint on pause/seek.
  useEffect(() => {
    if (!useGl || !isPlaying) return;
    let raf;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [useGl, isPlaying, draw]);

  useEffect(() => {
    if (!useGl) return;
    const video = videoRef?.current;
    if (!video) return;
    const events = ['seeked', 'loadeddata', 'canplay', 'playing', 'pause'];
    events.forEach((e) => video.addEventListener(e, draw));
    return () => events.forEach((e) => video.removeEventListener(e, draw));
  }, [useGl, videoRef, videoClip?.id, draw]);

  useEffect(() => {
    if (useGl && !isPlaying) draw();
  }, [useGl, isPlaying, currentTime, draw]);

  const hasCrop = Boolean(crop?.width && crop?.height && videoSize.w);
  const brandPos =
    BRAND_PREVIEW_POSITIONS[brandSettings?.position] ||
    BRAND_PREVIEW_POSITIONS['bottom-right'];

  const visibleTexts = textOverlays.filter(
    (t) =>
      currentTime >= t.startTime &&
      currentTime <= t.startTime + (t.duration ?? 0)
  );

  const neonFilter = brandSettings?.neonGlow
    ? 'saturate(1.15) hue-rotate(285deg) brightness(1.05) contrast(1.05)'
    : undefined;

  const effectFilter = getPreviewEffectFilter(videoClip);
  const combinedFilter = [neonFilter, effectFilter].filter(Boolean).join(' ') || undefined;

  const frameStyle = hasCrop
    ? cropStyles.frame
    : isAudioPreview
      ? { aspectRatio: '16 / 9', position: 'relative', overflow: 'hidden' }
      : undefined;

  // Legacy rendering (CSS fallback and audio preview): exactly the v1.0.0
  // styles. In the WebGL path the video is kept in the DOM as the decode
  // engine — same element, same ref, same external drivers — but invisible.
  const legacyVideoStyle = {
    ...(hasCrop ? cropStyles.video : {}),
    filter: combinedFilter,
    ...(isAudioPreview ? { display: 'none' } : {}),
  };
  const glSourceStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    maxHeight: 'none',
    opacity: 0,
    pointerEvents: 'none',
  };

  return (
    <div className="preview-stage" ref={stageRef}>
      <div
        className={`preview-crop-frame ${hasCrop ? 'has-crop' : ''} ${isAudioPreview ? 'audio-preview' : ''} ${isPlaying ? 'playing' : ''}`}
        style={frameStyle}
      >
        {isAudioPreview && <div className="preview-audio-backdrop" aria-hidden />}

        <video
          ref={videoRef}
          className={`editor-preview ${isPlaying ? 'playing' : ''}`}
          style={useGl ? glSourceStyle : legacyVideoStyle}
          controls={false}
        />

        {useGl && (
          <canvas
            ref={canvasRef}
            className="editor-preview-gl-canvas"
            style={
              hasCrop
                ? { width: '100%', height: '100%' }
                : {
                    width: '100%',
                    aspectRatio: videoSize.w
                      ? `${videoSize.w} / ${videoSize.h}`
                      : '16 / 9',
                  }
            }
          />
        )}

        {visibleTexts.map((text) => (
          <div
            key={text.id}
            className="preview-text-overlay"
            style={{
              left: `${text.position?.x ?? 50}%`,
              top: `${text.position?.y ?? 50}%`,
              color: text.color,
              fontSize: `${scaleOverlayFontSize(text.fontSize, stageWidth)}px`,
              fontFamily: text.fontFamily,
              fontWeight: text.fontFamily === 'Impact' ? 'bold' : 'normal',
            }}
          >
            {text.text}
          </div>
        ))}

        {brandSettings?.logo && (
          <img
            src={brandSettings.logo}
            alt="Brand logo"
            className="preview-brand-logo"
            style={{
              ...brandPos,
              filter: brandSettings.neonGlow
                ? `drop-shadow(0 0 10px ${brandSettings.brandColor || '#BF00FF'})`
                : 'none',
            }}
          />
        )}
      </div>

      {children}
    </div>
  );
}
