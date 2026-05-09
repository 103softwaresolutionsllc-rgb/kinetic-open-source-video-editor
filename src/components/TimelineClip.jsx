import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function formatTime(seconds) {
  if (seconds == null || isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

export default function TimelineClip({ 
  clip, 
  totalDuration, 
  isSelected, 
  onSelect 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: `${clip.layerId || 'layer'}-${clip.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  // Calculate clip width and position
  const clipStart = clip.start || 0;
  const clipDuration = clip.duration || 10;
  const clipEnd = clip.end || clipStart + clipDuration;
  
  const leftPosition = (clipStart / totalDuration) * 100;
  const clipWidth = ((clipEnd - clipStart) / totalDuration) * 100;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`timeline-clip ${isSelected ? 'selected' : ''} ${clip.type || 'video'}`}
      style={{
        ...style,
        left: `${leftPosition}%`,
        width: `${clipWidth}%`,
        minWidth: '40px' // Minimum width for visibility
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <div className="clip-content">
        <div className="clip-header">
          <span className="clip-type-icon">
            {clip.type === 'audio' ? '🎵' : '🎬'}
          </span>
          <span className="clip-name" title={clip.name}>
            {clip.name || 'Untitled Clip'}
          </span>
        </div>
        
        <div className="clip-info">
          <span className="clip-timing">
            {formatTime(clipStart)} - {formatTime(clipEnd)}
          </span>
          <span className="clip-duration">
            {formatTime(clipDuration)}
          </span>
        </div>
        
        {/* Visual waveform for audio clips */}
        {clip.type === 'audio' && clip.waveform && (
          <div className="audio-waveform">
            {clip.waveform.map((peak, index) => (
              <div
                key={index}
                className="waveform-bar"
                style={{ height: `${peak * 100}%` }}
              />
            ))}
          </div>
        )}
        
        {/* Thumbnail for video clips */}
        {clip.type === 'video' && clip.thumbnail && (
          <div className="video-thumbnail">
            <img src={clip.thumbnail} alt={clip.name} />
          </div>
        )}
      </div>
      
      {/* Resize handles */}
      <div className="resize-handle left" />
      <div className="resize-handle right" />
      
      {/* Selection indicator */}
      {isSelected && <div className="selection-indicator" />}
    </div>
  );
}
