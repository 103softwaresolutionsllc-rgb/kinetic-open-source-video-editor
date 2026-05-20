import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { clipTrimmedDuration, makeClipDragId } from '../utils/clipTimeline.js';

function formatTime(seconds) {
  if (seconds == null || isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${secs}`;
}

export default function TimelineClip({
  clip,
  layerId,
  totalDuration,
  isSelected,
  onSelect,
}) {
  const dragId = makeClipDragId(layerId, clip.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dragId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  const timelineStart = clip.timelineStart ?? 0;
  const trimmed = clipTrimmedDuration(clip);
  const timelineEnd = timelineStart + trimmed;

  const leftPosition = totalDuration > 0 ? (timelineStart / totalDuration) * 100 : 0;
  const clipWidth =
    totalDuration > 0 ? (trimmed / totalDuration) * 100 : 10;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`timeline-clip ${isSelected ? 'selected' : ''} ${clip.type || 'video'}`}
      style={{
        ...style,
        left: `${leftPosition}%`,
        width: `${Math.max(clipWidth, 2)}%`,
        minWidth: '40px',
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
            {formatTime(timelineStart)} – {formatTime(timelineEnd)}
          </span>
          <span className="clip-duration">{formatTime(trimmed)}</span>
        </div>
      </div>

      <div className="resize-handle left" />
      <div className="resize-handle right" />
      {isSelected && <div className="selection-indicator" />}
    </div>
  );
}
