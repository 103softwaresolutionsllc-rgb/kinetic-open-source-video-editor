import React, { useRef, useState, useEffect, useCallback } from 'react';
import TimelineEngine from '../engine/timeline/TimelineEngine.js';

const InteractiveTimeline = ({ 
  timelineEngine, 
  onTimeChange, 
  onClipSelect,
  currentTime = 0,
  duration = 60 
}) => {
  const timelineRef = useRef(null);
  const playheadRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [hoveredTime, setHoveredTime] = useState(null);
  const [selectedClips, setSelectedClips] = useState(new Set());

  // Calculate timeline dimensions
  const pixelsPerSecond = 100 * zoom;
  const timelineWidth = duration * pixelsPerSecond;
  const playheadPosition = currentTime * pixelsPerSecond;

  // Handle playhead dragging
  const handlePlayheadMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newTime = Math.max(0, Math.min(duration, x / pixelsPerSecond));
    
    onTimeChange(newTime);
  }, [isDragging, pixelsPerSecond, duration, onTimeChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle timeline scrubbing
  const handleTimelineClick = useCallback((e) => {
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newTime = Math.max(0, Math.min(duration, x / pixelsPerSecond));
    
    onTimeChange(newTime);
  }, [pixelsPerSecond, duration, onTimeChange]);

  // Handle clip selection
  const handleClipClick = useCallback((clip, e) => {
    e.stopPropagation();
    const clipId = `${clip.trackId}:${clip.id}`;
    
    const newSelection = new Set(selectedClips);
    if (newSelection.has(clipId)) {
      newSelection.delete(clipId);
    } else {
      newSelection.add(clipId);
    }
    
    setSelectedClips(newSelection);
    onClipSelect(clip);
  }, [selectedClips, onClipSelect]);

  // Handle clip split at playhead
  const handleSplitClip = useCallback((clip, trackId) => {
    if (!timelineEngine || !currentTime) return;
    
    const splitResult = timelineEngine.current.splitClip(trackId, clip.id, currentTime);
    
    if (splitResult) {
      // Trigger re-render by updating parent
      onClipSelect(splitResult[0]); // Select first split clip
      setMessage(`Split "${clip.name}" at ${formatTime(currentTime)}`);
    }
  }, [timelineEngine, currentTime, onClipSelect]);

  // Handle clip trim
  const handleTrimClip = useCallback((clip, trackId) => {
    if (!timelineEngine) return;
    
    // For now, create a simple trim dialog
    const newStart = prompt('Enter new start time (seconds):', clip.startTime.toString());
    const newEnd = prompt('Enter new end time (seconds):', (clip.startTime + clip.duration).toString());
    
    if (newStart !== null && newEnd !== null) {
      const startTime = Math.max(0, parseFloat(newStart));
      const endTime = Math.min(duration, parseFloat(newEnd));
      const newDuration = endTime - startTime;
      
      if (newDuration > 0) {
        // Update clip in timeline engine
        timelineEngine.current.moveClip(trackId, clip.id, startTime);
        clip.startTime = startTime;
        clip.duration = newDuration;
        
        setMessage(`Trimmed "${clip.name}" to ${formatTime(newDuration)}`);
      }
    }
  }, [timelineEngine, duration]);

  // Handle clip duplicate
  const handleDuplicateClip = useCallback((clip, trackId) => {
    if (!timelineEngine) return;
    
    const newClip = {
      ...clip,
      id: Date.now(),
      name: `${clip.name} (Copy)`,
      startTime: clip.startTime + clip.duration + 1 // Add 1 second gap
    };
    
    timelineEngine.current.addClip(trackId, newClip);
    setMessage(`Duplicated "${clip.name}"`);
  }, [timelineEngine]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.2, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
  }, []);

  // Mouse move for hover time display
  const handleTimelineMouseMove = useCallback((e) => {
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = Math.max(0, Math.min(duration, x / pixelsPerSecond));
    
    setHoveredTime(time);
  }, [pixelsPerSecond, duration]);

  // Global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Format time for display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const frames = Math.floor((time % 1) * 30);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  };

  // Generate time markers
  const generateTimeMarkers = () => {
    const markers = [];
    const interval = zoom > 2 ? 5 : zoom > 1 ? 10 : 30;
    
    for (let time = 0; time <= duration; time += interval) {
      markers.push({
        time,
        position: time * pixelsPerSecond,
        label: formatTime(time)
      });
    }
    
    return markers;
  };

  const timeMarkers = generateTimeMarkers();
  const tracks = timelineEngine?.getTracks() || [];

  return (
    <div className="interactive-timeline">
      {/* Timeline Controls */}
      <div className="timeline-controls">
        <div className="zoom-controls">
          <button onClick={handleZoomOut} disabled={zoom <= 0.5}>
            <span>−</span> Zoom Out
          </button>
          <span className="zoom-level">{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} disabled={zoom >= 5}>
            Zoom In <span>+</span>
          </button>
          <button onClick={handleZoomReset}>
            Reset
          </button>
        </div>
        
        {hoveredTime !== null && (
          <div className="hover-time">
            {formatTime(hoveredTime)}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div 
        ref={timelineRef}
        className="timeline-container"
        style={{ width: `${timelineWidth}px` }}
        onClick={handleTimelineClick}
        onMouseMove={handleTimelineMouseMove}
        onMouseLeave={() => setHoveredTime(null)}
      >
        {/* Time Ruler */}
        <div className="time-ruler">
          {timeMarkers.map(marker => (
            <div
              key={marker.time}
              className="time-marker"
              style={{ left: `${marker.position}px` }}
            >
              <div className="marker-tick" />
              <div className="marker-label">{marker.label}</div>
            </div>
          ))}
        </div>

        {/* Tracks */}
        <div className="tracks-container">
          {tracks.map((track, trackIndex) => (
            <div key={track.id} className="track">
              <div className="track-header">
                <span className="track-name">{track.name}</span>
                <div className="track-controls">
                  <button 
                    className={`track-mute ${track.muted ? 'muted' : ''}`}
                    onClick={() => track.muted = !track.muted}
                  >
                    M
                  </button>
                  <button 
                    className={`track-lock ${track.locked ? 'locked' : ''}`}
                    onClick={() => track.locked = !track.locked}
                  >
                    L
                  </button>
                  {track.clips.length > 0 && (
                    <>
                      <button 
                        className="track-split"
                        onClick={() => handleSplitClip(track.clips[0], track.id)}
                        title="Split clip at playhead"
                      >
                        ⚡
                      </button>
                      <button 
                        className="track-trim"
                        onClick={() => handleTrimClip(track.clips[0], track.id)}
                        title="Trim clip"
                      >
                        ✂️
                      </button>
                      <button 
                        className="track-duplicate"
                        onClick={() => handleDuplicateClip(track.clips[0], track.id)}
                        title="Duplicate clip"
                      >
                        📋
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="track-content">
                {track.clips.map(clip => {
                  const clipId = `${track.id}:${clip.id}`;
                  const isSelected = selectedClips.has(clipId);
                  const clipPosition = clip.startTime * pixelsPerSecond;
                  const clipWidth = clip.duration * pixelsPerSecond;
                  
                  return (
                    <div
                      key={clip.id}
                      className={`timeline-clip ${isSelected ? 'selected' : ''}`}
                      style={{
                        left: `${clipPosition}px`,
                        width: `${clipWidth}px`
                      }}
                      onClick={(e) => handleClipClick(clip, e)}
                    >
                      <div className="clip-content">
                        <span className="clip-name">{clip.name}</span>
                        <span className="clip-duration">
                          {formatTime(clip.duration)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Playhead */}
        <div
          ref={playheadRef}
          className="playhead"
          style={{ left: `${playheadPosition}px` }}
          onMouseDown={handlePlayheadMouseDown}
        >
          <div className="playhead-line" />
          <div className="playhead-handle">
            <div className="playhead-time">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .interactive-timeline {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1rem;
          overflow-x: auto;
        }

        .timeline-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: var(--surface-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
        }

        .zoom-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .zoom-controls button {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.5rem 0.75rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .zoom-controls button:hover:not(:disabled) {
          background: var(--electric-purple-alpha);
          border-color: var(--electric-purple);
          color: var(--text-primary);
        }

        .zoom-controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .zoom-level {
          background: var(--electric-purple);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          min-width: 50px;
          text-align: center;
        }

        .hover-time {
          background: var(--electric-purple);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .timeline-container {
          position: relative;
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          min-height: 200px;
          cursor: crosshair;
        }

        .time-ruler {
          position: relative;
          height: 30px;
          background: var(--surface);
          border-bottom: 1px solid var(--glass-border);
        }

        .time-marker {
          position: absolute;
          top: 0;
          transform: translateX(-50%);
        }

        .marker-tick {
          width: 1px;
          height: 10px;
          background: var(--text-tertiary);
          margin: 0 auto;
        }

        .marker-label {
          font-size: 0.7rem;
          color: var(--text-secondary);
          text-align: center;
          margin-top: 2px;
          font-family: var(--font-mono);
        }

        .tracks-container {
          position: relative;
        }

        .track {
          border-bottom: 1px solid var(--glass-border);
          min-height: 60px;
        }

        .track-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem;
          background: var(--surface);
          border-right: 1px solid var(--glass-border);
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 150px;
          z-index: 10;
        }

        .track-name {
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .track-controls {
          display: flex;
          gap: 0.25rem;
        }

        .track-mute, .track-lock, .track-split, .track-trim, .track-duplicate {
          width: 24px;
          height: 24px;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 0.7rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .track-split:hover, .track-trim:hover, .track-duplicate:hover {
          background: var(--electric-purple-alpha);
          border-color: var(--electric-purple);
          color: var(--electric-purple);
        }

        .track-mute.muted, .track-lock.locked {
          background: var(--electric-purple);
          color: white;
          border-color: var(--electric-purple);
        }

        .track-content {
          margin-left: 150px;
          padding: 0.5rem;
          position: relative;
          height: 59px;
        }

        .timeline-clip {
          position: absolute;
          top: 8px;
          height: 40px;
          background: var(--electric-purple-alpha);
          border: 1px solid var(--electric-purple);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
        }

        .timeline-clip:hover {
          background: var(--electric-purple);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .timeline-clip.selected {
          background: var(--electric-purple);
          border-color: var(--electric-purple-hover);
          box-shadow: 0 0 0 2px var(--electric-purple-hover);
        }

        .clip-content {
          padding: 0.25rem 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .clip-name {
          font-size: 0.75rem;
          color: var(--text-primary);
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .clip-duration {
          font-size: 0.65rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }

        .playhead {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--electric-purple);
          z-index: 20;
          cursor: ew-resize;
          transform: translateX(-50%);
        }

        .playhead-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: var(--electric-purple);
        }

        .playhead-handle {
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: var(--electric-purple);
          border-radius: 50%;
          border: 2px solid white;
          cursor: grab;
        }

        .playhead-handle:active {
          cursor: grabbing;
        }

        .playhead-time {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--electric-purple);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default InteractiveTimeline;
