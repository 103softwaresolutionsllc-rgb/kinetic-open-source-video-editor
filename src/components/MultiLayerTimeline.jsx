import React, { useState, useRef, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useTimeline } from '../contexts/TimelineContext.jsx';
import TimelineLayer from './TimelineLayer.jsx';
import TimelinePlayhead from './TimelinePlayhead.jsx';
import {
  clipTrimmedDuration,
  projectDuration,
  parseClipDragId,
  VIDEO_LAYER_ID,
} from '../utils/clipTimeline.js';

function formatTime(seconds) {
  if (seconds == null || isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${secs}`;
}

export default function MultiLayerTimeline({ onSeek, onClipSelect, onPlayToggle }) {
  const {
    layers,
    currentTime,
    selectedClip,
    selectedLayer,
    isPlaying,
    setCurrentTime,
    selectClip,
    setPlaying,
    moveClip,
    reorderClips,
    repositionClip,
    addLayer,
  } = useTimeline();

  const [draggedClip, setDraggedClip] = useState(null);
  const timelineRef = useRef(null);
  const trackRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const totalDuration = useMemo(
    () => Math.max(projectDuration(layers), 60),
    [layers]
  );

  const trackWidth = trackRef.current?.clientWidth ?? 800;
  const pixelsPerSecond = trackWidth / totalDuration;

  const handleDragStart = (event) => {
    const parsed = parseClipDragId(event.active.id);
    if (!parsed) return;

    const layer = layers.find((l) => l.id === parsed.layerId);
    const clip = layer?.clips.find((c) => c.id === parsed.clipId);

    if (clip) {
      setDraggedClip({ ...clip, layerId: parsed.layerId });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over, delta } = event;
    const activeParsed = parseClipDragId(active.id);

    if (!activeParsed) {
      setDraggedClip(null);
      return;
    }

    const { layerId: fromLayerId, clipId } = activeParsed;
    const fromLayer = layers.find((l) => l.id === fromLayerId);
    const clip = fromLayer?.clips.find((c) => c.id === clipId);

    if (
      clip &&
      fromLayerId !== VIDEO_LAYER_ID &&
      Math.abs(delta.x) > 4 &&
      pixelsPerSecond > 0
    ) {
      const newStart = Math.max(
        0,
        (clip.timelineStart ?? 0) + delta.x / pixelsPerSecond
      );
      repositionClip(fromLayerId, clipId, newStart);
    }

    if (over && active.id !== over.id) {
      const overParsed = parseClipDragId(over.id);

      if (overParsed && clip) {
        const { layerId: toLayerId, clipId: overClipId } = overParsed;

        if (fromLayerId === toLayerId && fromLayerId === VIDEO_LAYER_ID) {
          const sorted = [...fromLayer.clips].sort(
            (a, b) => (a.timelineStart ?? 0) - (b.timelineStart ?? 0)
          );
          const fromIndex = sorted.findIndex((c) => c.id === clipId);
          const toIndex = sorted.findIndex((c) => c.id === overClipId);

          if (fromIndex >= 0 && toIndex >= 0 && fromIndex !== toIndex) {
            reorderClips(fromLayerId, fromIndex, toIndex);
          }
        } else if (fromLayerId !== toLayerId) {
          const rect = timelineRef.current?.getBoundingClientRect();
          if (rect) {
            const newStartTime = Math.max(
              0,
              (clip.timelineStart ?? 0) + delta.x / pixelsPerSecond
            );
            moveClip(fromLayerId, toLayerId, clipId, newStartTime);
          }
        }
      }
    }

    setDraggedClip(null);
  };

  const handleTimelineClick = (e) => {
    if (e.target.closest('.timeline-clip')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const trackLeft = 40;
    const x = Math.max(0, e.clientX - rect.left - trackLeft);
    const usableWidth = rect.width - trackLeft;
    const newTime = (x / usableWidth) * totalDuration;

    const clamped = Math.max(0, Math.min(totalDuration, newTime));
    setCurrentTime(clamped);
    onSeek?.(clamped);
  };

  const handleClipSelect = (clipId, layerId) => {
    selectClip(clipId, layerId);
    onClipSelect?.(clipId, layerId);
  };

  const handlePlayClick = () => {
    if (onPlayToggle) {
      onPlayToggle(!isPlaying);
    } else {
      setPlaying(!isPlaying);
    }
  };

  const clipCount = layers.reduce((n, layer) => n + layer.clips.length, 0);

  return (
    <div className="multi-layer-timeline" ref={timelineRef}>
      <div className="timeline-header">
        <h3>Timeline</h3>
        <div className="timeline-controls">
          <button
            type="button"
            className={`play-button ${isPlaying ? 'playing' : ''}`}
            onClick={handlePlayClick}
            disabled={clipCount === 0}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <span className="time-display">
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </span>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          className="timeline-content"
          ref={trackRef}
          onClick={handleTimelineClick}
          role="presentation"
        >
          <div className="time-ruler">
            {Array.from(
              { length: Math.ceil(totalDuration / 10) + 1 },
              (_, i) => (
                <div
                  key={i}
                  className="time-marker"
                  style={{ left: `${(i * 10 / totalDuration) * 100}%` }}
                >
                  {formatTime(i * 10)}
                </div>
              )
            )}
          </div>

          <div className="layers-container">
            {layers.map((layer) => (
              <TimelineLayer
                key={layer.id}
                layer={layer}
                totalDuration={totalDuration}
                selectedClip={selectedClip}
                selectedLayer={selectedLayer}
                onSelectClip={handleClipSelect}
              />
            ))}
          </div>

          <TimelinePlayhead
            currentTime={currentTime}
            totalDuration={totalDuration}
          />
        </div>

        <DragOverlay>
          {draggedClip && (
            <div className="dragging-clip">
              <div className="clip-preview">
                <div className="clip-name">{draggedClip.name}</div>
                <div className="clip-duration">
                  {formatTime(clipTrimmedDuration(draggedClip))}
                </div>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <div className="timeline-footer">
        <button
          type="button"
          className="add-layer-btn"
          onClick={() => addLayer('New Track', 'video')}
        >
          + Add Layer
        </button>
        <div className="layer-info">
          {layers.length} layer{layers.length !== 1 ? 's' : ''} •{' '}
          {Math.round(totalDuration)}s total
        </div>
      </div>
    </div>
  );
}
