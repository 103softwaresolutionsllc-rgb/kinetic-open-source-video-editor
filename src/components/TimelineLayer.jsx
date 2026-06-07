import React from 'react';
import TimelineClip from './TimelineClip.jsx';
import { isRemovableLayer } from '../utils/clipTimeline.js';

export default function TimelineLayer({
  layer,
  totalDuration,
  selectedClip,
  selectedLayer,
  onSelectClip,
  onTrimChange,
  onLayerMute,
  onLayerSolo,
  onLayerRemove,
}) {
  const handleClipSelect = (clipId) => {
    onSelectClip(clipId, layer.id);
  };

  const canRemove = isRemovableLayer(layer);

  return (
    <div
      className={`timeline-layer ${selectedLayer === layer.id ? 'selected' : ''} ${layer.type}`}
      data-layer-id={layer.id}
      data-layer-type={layer.type}
    >
      <div className="layer-header">
        <div className="layer-info">
          <span className="layer-icon">
            {layer.type === 'video' ? '🎬' : '🎵'}
          </span>
          <span className="layer-name">{layer.name}</span>
        </div>
        <div className="layer-controls">
          <button
            type="button"
            className={`layer-mute-btn ${layer.muted ? 'active' : ''}`}
            title="Mute/Unmute track"
            onClick={() => onLayerMute?.(layer.id)}
          >
            {layer.muted ? '🔇' : '🔊'}
          </button>
          <button
            type="button"
            className={`layer-solo-btn ${layer.solo ? 'active' : ''}`}
            title="Solo track"
            onClick={() => onLayerSolo?.(layer.id)}
          >
            S
          </button>
          {canRemove && (
            <button
              type="button"
              className="layer-remove-btn"
              title="Remove empty track"
              onClick={() => onLayerRemove?.(layer.id)}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="layer-content">
        <div className="track-grid">
          {Array.from({ length: Math.ceil(totalDuration / 5) }, (_, i) => (
            <div
              key={i}
              className="grid-line"
              style={{ left: `${(i * 5 / totalDuration) * 100}%` }}
            />
          ))}
        </div>

        {layer.clips.map((clip) => (
          <TimelineClip
            key={clip.id}
            clip={clip}
            layerId={layer.id}
            totalDuration={totalDuration}
            isSelected={selectedClip === clip.id}
            onSelect={() => handleClipSelect(clip.id)}
            onTrimChange={onTrimChange}
          />
        ))}
      </div>
    </div>
  );
}
