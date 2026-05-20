import React from 'react';
import TimelineClip from './TimelineClip.jsx';

export default function TimelineLayer({
  layer,
  totalDuration,
  selectedClip,
  selectedLayer,
  onSelectClip,
}) {
  const handleClipSelect = (clipId) => {
    onSelectClip(clipId, layer.id);
  };

  return (
    <div
      className={`timeline-layer ${selectedLayer === layer.id ? 'selected' : ''} ${layer.type}`}
    >
      <div className="layer-header">
        <div className="layer-info">
          <span className="layer-icon">
            {layer.type === 'video' ? '🎬' : '🎵'}
          </span>
          <span className="layer-name">{layer.name}</span>
        </div>
        <div className="layer-controls">
          <button type="button" className="layer-mute-btn" title="Mute/Unmute">
            {layer.muted ? '🔇' : '🔊'}
          </button>
          <button type="button" className="layer-solo-btn" title="Solo">
            S
          </button>
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
          />
        ))}
      </div>
    </div>
  );
}
