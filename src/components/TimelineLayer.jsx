import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TimelineClip from './TimelineClip.jsx';

export default function TimelineLayer({ 
  layer, 
  totalDuration, 
  selectedClip, 
  selectedLayer,
  onSelectClip 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: layer.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClipSelect = (clipId) => {
    onSelectClip(clipId, layer.id);
  };

  return (
    <div 
      className={`timeline-layer ${selectedLayer === layer.id ? 'selected' : ''} ${layer.type}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="layer-header">
        <div className="layer-info">
          <span className="layer-icon">
            {layer.type === 'video' ? '🎬' : '🎵'}
          </span>
          <span className="layer-name">{layer.name}</span>
        </div>
        <div className="layer-controls">
          <button className="layer-mute-btn" title="Mute/Unmute">
            {layer.muted ? '🔇' : '🔊'}
          </button>
          <button className="layer-solo-btn" title="Solo">
            S
          </button>
        </div>
      </div>
      
      <div className="layer-content">
        {/* Track background grid */}
        <div className="track-grid">
          {Array.from({ length: Math.ceil(totalDuration / 5) }, (_, i) => (
            <div 
              key={i} 
              className="grid-line"
              style={{ left: `${(i * 5 / totalDuration) * 100}%` }}
            />
          ))}
        </div>
        
        {/* Clips on this layer */}
        {layer.clips.map((clip) => (
          <TimelineClip
            key={clip.id}
            clip={clip}
            totalDuration={totalDuration}
            isSelected={selectedClip === clip.id}
            onSelect={() => handleClipSelect(clip.id)}
          />
        ))}
      </div>
    </div>
  );
}
