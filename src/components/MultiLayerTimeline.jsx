import React, { useState, useRef, useMemo, useCallback } from 'react';
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

export default function MultiLayerTimeline({
  onSeek,
  onClipSelect,
  onPlayToggle,
  onImportFiles,
}) {
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
    updateClip,
    updateLayer,
    splitClip,
    duplicateClip,
    addLayer,
    removeLayer,
  } = useTimeline();

  const [draggedClip, setDraggedClip] = useState(null);
  const [fileDragOver, setFileDragOver] = useState(false);
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

  const handleTrimChange = useCallback(
    (layerId, clipId, updates) => {
      updateClip(layerId, clipId, updates);
    },
    [updateClip]
  );

  const handleLayerMute = useCallback(
    (layerId) => {
      const layer = layers.find((l) => l.id === layerId);
      if (!layer) return;
      updateLayer(layerId, { muted: !layer.muted });
    },
    [layers, updateLayer]
  );

  const handleLayerSolo = useCallback(
    (layerId) => {
      const layer = layers.find((l) => l.id === layerId);
      if (!layer) return;
      updateLayer(layerId, { solo: !layer.solo });
    },
    [layers, updateLayer]
  );

  const handleLayerRemove = useCallback(
    (layerId) => {
      removeLayer(layerId);
    },
    [removeLayer]
  );

  const resolveDropTarget = useCallback(
    (target) => {
      const layerEl = target?.closest?.('.timeline-layer');
      if (layerEl) {
        const layerId = layerEl.dataset.layerId;
        const layerType = layerEl.dataset.layerType;
        const layer = layers.find((l) => l.id === layerId);
        if (layer) {
          return { layerId: layer.id, layerType: layer.type };
        }
        if (layerId && layerType) {
          return { layerId, layerType };
        }
      }

      return {
        layerId: VIDEO_LAYER_ID,
        layerType: 'video',
      };
    },
    [layers]
  );

  const handleFileDragEnter = useCallback((e) => {
    if (!e.dataTransfer?.types?.includes('Files')) return;
    e.preventDefault();
    setFileDragOver(true);
  }, []);

  const handleFileDragOver = useCallback((e) => {
    if (!e.dataTransfer?.types?.includes('Files')) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setFileDragOver(true);
  }, []);

  const handleFileDragLeave = useCallback((e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setFileDragOver(false);
  }, []);

  const handleFileDrop = useCallback(
    (e) => {
      if (!e.dataTransfer?.files?.length) return;
      e.preventDefault();
      setFileDragOver(false);

      const { layerId, layerType } = resolveDropTarget(e.target);
      onImportFiles?.(e.dataTransfer.files, layerId, layerType);
    },
    [onImportFiles, resolveDropTarget]
  );

  const handleAddVideoLayer = useCallback(() => {
    const count = layers.filter((l) => l.type === 'video').length;
    addLayer(`Video Track ${count + 1}`, 'video');
  }, [layers, addLayer]);

  const handleAddAudioLayer = useCallback(() => {
    const count = layers.filter((l) => l.type === 'audio').length;
    addLayer(`Audio Track ${count + 1}`, 'audio');
  }, [layers, addLayer]);

  const handleSplit = useCallback(() => {
    if (!selectedClip || !selectedLayer) return;
    splitClip(selectedLayer, selectedClip, currentTime);
  }, [selectedClip, selectedLayer, currentTime, splitClip]);

  const handleDuplicate = useCallback(() => {
    if (!selectedClip || !selectedLayer) return;
    duplicateClip(selectedLayer, selectedClip);
  }, [selectedClip, selectedLayer, duplicateClip]);

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

  const handlePlayheadSeek = useCallback(
    (time) => {
      setCurrentTime(time);
      onSeek?.(time);
    },
    [setCurrentTime, onSeek]
  );

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
          <button
            type="button"
            className="secondary"
            onClick={handleSplit}
            disabled={!selectedClip}
            title="Split at playhead (S)"
          >
            ✂️ Split
          </button>
          <button
            type="button"
            className="secondary"
            onClick={handleDuplicate}
            disabled={!selectedClip}
            title="Duplicate clip (Ctrl+D)"
          >
            ⧉ Duplicate
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
          className={`timeline-content ${fileDragOver ? 'file-drag-over' : ''}`}
          ref={trackRef}
          onClick={handleTimelineClick}
          onDragEnter={handleFileDragEnter}
          onDragOver={handleFileDragOver}
          onDragLeave={handleFileDragLeave}
          onDrop={handleFileDrop}
          role="presentation"
        >
          {fileDragOver && (
            <div className="timeline-drop-overlay" aria-hidden="true">
              <span>Drop files on a track to import</span>
            </div>
          )}
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
                onTrimChange={handleTrimChange}
                onLayerMute={handleLayerMute}
                onLayerSolo={handleLayerSolo}
                onLayerRemove={handleLayerRemove}
              />
            ))}
          </div>

          <TimelinePlayhead
            currentTime={currentTime}
            totalDuration={totalDuration}
            onSeek={handlePlayheadSeek}
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
          onClick={handleAddVideoLayer}
        >
          + Video Track
        </button>
        <button
          type="button"
          className="add-layer-btn secondary"
          onClick={handleAddAudioLayer}
        >
          + Audio Track
        </button>
        <div className="layer-info">
          {layers.length} layer{layers.length !== 1 ? 's' : ''} •{' '}
          {Math.round(totalDuration)}s total
        </div>
      </div>
    </div>
  );
}
