import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  getCropPreviewStyles,
  BRAND_PREVIEW_POSITIONS,
  scaleOverlayFontSize,
} from '../utils/previewCrop.js';
import { getPreviewEffectFilter } from '../utils/videoEffects.js';

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
  const [stageWidth, setStageWidth] = useState(0);
  const [videoSize, setVideoSize] = useState({ w: 0, h: 0 });

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
          style={{
            ...(hasCrop ? cropStyles.video : {}),
            filter: combinedFilter,
            ...(isAudioPreview ? { display: 'none' } : {}),
          }}
          controls={false}
        />

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
