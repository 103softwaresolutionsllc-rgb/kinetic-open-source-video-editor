import React, { useState, useRef } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates,
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { useTimeline } from '../contexts/TimelineContext.jsx';
import TimelineLayer from './TimelineLayer.jsx';
import TimelinePlayhead from './TimelinePlayhead.jsx';

function formatTime(seconds) {
  if (seconds == null || isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

export default function MultiLayerTimeline() {
  const {
    layers,
    currentTime,
    duration,
    selectedClip,
    selectedLayer,
    isPlaying,
    setCurrentTime,
    selectClip,
    setPlaying
  } = useTimeline();

  const [draggedClip, setDraggedClip] = useState(null);
  const timelineRef = useRef(null);

  // Set up drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const [layerId, clipId] = active.id.split('-');
    const layer = layers.find(l => l.id === layerId);
    const clip = layer?.clips.find(c => c.id === clipId);
    
    if (clip) {
      setDraggedClip({ ...clip, layerId, clipId });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setDraggedClip(null);
      return;
    }

    const [fromLayerId, fromClipId] = active.id.split('-');
    const [toLayerId] = over.id.split('-');
    
    if (fromLayerId !== toLayerId) {
      // Calculate new position based on drop location
      const rect = over.rect;
      const timelineRect = timelineRef.current?.getBoundingClientRect();
      
      if (timelineRect) {
        const relativeX = rect.left - timelineRect.left;
        const pixelsPerSecond = timelineRect.width / duration;
        const newStartTime = relativeX / pixelsPerSecond;
        
        // Move clip between layers
        const fromLayer = layers.find(l => l.id === fromLayerId);
        const clip = fromLayer?.clips.find(c => c.id === fromClipId);
        
        if (clip) {
          // This would be handled by the context
          console.log('Moving clip:', { fromLayerId, toLayerId, clipId: fromClipId, newStartTime });
        }
      }
    }
    
    setDraggedClip(null);
  };

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pixelsPerSecond = rect.width / duration;
    const newTime = x / pixelsPerSecond;
    
    setCurrentTime(Math.max(0, Math.min(duration, newTime)));
  };

  const totalDuration = Math.max(
    ...layers.flatMap(layer => 
      layer.clips.map(clip => (clip.end || clip.duration || 0))
    ),
    60 // Minimum 60 seconds
  );

  return (
    <div className="multi-layer-timeline" ref={timelineRef}>
      <div className="timeline-header">
        <h3>Timeline</h3>
        <div className="timeline-controls">
          <button 
            className={`play-button ${isPlaying ? 'playing' : ''}`}
            onClick={() => setPlaying(!isPlaying)}
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
        <div className="timeline-content" onClick={handleTimelineClick}>
          {/* Time ruler */}
          <div className="time-ruler">
            {Array.from({ length: Math.ceil(totalDuration / 10) + 1 }, (_, i) => (
              <div 
                key={i} 
                className="time-marker"
                style={{ left: `${(i * 10 / totalDuration) * 100}%` }}
              >
                {formatTime(i * 10)}
              </div>
            ))}
          </div>

          {/* Layers */}
          <div className="layers-container">
            <SortableContext 
              items={layers.map(layer => layer.id)}
              strategy={verticalListSortingStrategy}
            >
              {layers.map((layer) => (
                <TimelineLayer
                  key={layer.id}
                  layer={layer}
                  totalDuration={totalDuration}
                  selectedClip={selectedClip}
                  selectedLayer={selectedLayer}
                  onSelectClip={selectClip}
                />
              ))}
            </SortableContext>
          </div>

          {/* Playhead */}
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
                <div className="clip-duration">{formatTime(draggedClip.duration)}</div>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <div className="timeline-footer">
        <button className="add-layer-btn" onClick={() => {/* Add layer logic */}}>
          + Add Layer
        </button>
        <div className="layer-info">
          {layers.length} layer{layers.length !== 1 ? 's' : ''} • {totalDuration}s total
        </div>
      </div>
    </div>
  );
}
