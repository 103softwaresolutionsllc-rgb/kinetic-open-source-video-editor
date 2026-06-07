/** CSS styles to preview a pixel-based crop region on a video element */
export function getCropPreviewStyles(crop, videoWidth, videoHeight) {
  if (!crop?.width || !crop?.height || !videoWidth || !videoHeight) {
    return { frame: {}, video: {} };
  }

  const { x = 0, y = 0, width, height } = crop;

  return {
    frame: {
      aspectRatio: `${width} / ${height}`,
      overflow: 'hidden',
      width: '100%',
      position: 'relative',
      background: '#000',
      borderRadius: 'inherit',
    },
    video: {
      position: 'absolute',
      width: `${(videoWidth / width) * 100}%`,
      height: `${(videoHeight / height) * 100}%`,
      left: `${-(x / width) * 100}%`,
      top: `${-(y / height) * 100}%`,
      maxWidth: 'none',
      objectFit: 'fill',
    },
  };
}

export const BRAND_PREVIEW_POSITIONS = {
  'top-left': { top: 12, left: 12, right: 'auto', bottom: 'auto' },
  'top-right': { top: 12, right: 12, left: 'auto', bottom: 'auto' },
  'bottom-left': { bottom: 12, left: 12, right: 'auto', top: 'auto' },
  'bottom-right': { bottom: 12, right: 12, left: 'auto', top: 'auto' },
  center: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

export const EXPORT_REF_WIDTH = 1920;

export function scaleOverlayFontSize(fontSize, previewWidth) {
  if (!previewWidth) return fontSize * 0.35;
  return fontSize * (previewWidth / EXPORT_REF_WIDTH);
}
