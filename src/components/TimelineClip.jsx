import React, { useCallback, useEffect, useState } from 'react';
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
  onTrimChange,
}) {
  const dragId = makeClipDragId(layerId, clip.id);
  const [resizing, setResizing] = useState(null);

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

  const handleResizeStart = useCallback(
    (e, edge) => {
      e.stopPropagation();
      e.preventDefault();
      setResizing({ edge, startX: e.clientX, initial: { ...clip } });
    },
    [clip]
  );

  useEffect(() => {
    if (!resizing || !onTrimChange) return;

    const onMove = (e) => {
      const layerContent = document.querySelector(
        `.timeline-layer.${clip.type || 'video'} .layer-content`
      );
      const width = layerContent?.clientWidth ?? 800;
      const pxPerSec = width / totalDuration;
      const deltaSec = (e.clientX - resizing.startX) / pxPerSec;

      const sourceStart = resizing.initial.sourceStart ?? 0;
      const sourceEnd =
        resizing.initial.sourceEnd ?? resizing.initial.duration ?? 0;
      const minLen = 0.1;

      if (resizing.edge === 'left') {
        const nextStart = Math.max(
          0,
          Math.min(sourceEnd - minLen, sourceStart + deltaSec)
        );
        onTrimChange(layerId, clip.id, { sourceStart: nextStart });
      } else {
        const maxEnd = resizing.initial.duration ?? sourceEnd;
        const nextEnd = Math.max(
          sourceStart + minLen,
          Math.min(maxEnd, sourceEnd + deltaSec)
        );
        onTrimChange(layerId, clip.id, { sourceEnd: nextEnd });
      }
    };

    const onUp = () => setResizing(null);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [resizing, onTrimChange, layerId, clip.id, clip.type, totalDuration]);

  const hasThumbnail = clip.type === 'video' && Boolean(clip.thumbnail);
  const hasWaveform = clip.type === 'audio' && Boolean(clip.waveform?.length);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`timeline-clip ${isSelected ? 'selected' : ''} ${clip.type || 'video'} ${resizing ? 'resizing' : ''} ${hasThumbnail ? 'has-thumbnail' : ''} ${hasWaveform ? 'has-waveform' : ''}`}
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
      {hasThumbnail && (
        <div className="video-thumbnail" aria-hidden="true">
          <img src={clip.thumbnail} alt="" draggable={false} />
        </div>
      )}

      {hasWaveform && (
        <div className="audio-waveform" aria-hidden="true">
          {clip.waveform.map((height, index) => (
            <div
              key={index}
              className="waveform-bar"
              style={{ height: `${Math.max(12, height * 100)}%` }}
            />
          ))}
        </div>
      )}

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

      <div
        className="resize-handle left"
        onMouseDown={(e) => handleResizeStart(e, 'left')}
      />
      <div
        className="resize-handle right"
        onMouseDown={(e) => handleResizeStart(e, 'right')}
      />
      {isSelected && <div className="selection-indicator" />}
    </div>
  );
}
