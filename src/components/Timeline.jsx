import React from 'react';
import { useTimeline } from '../hooks/useTimeline.js';

function fmt(s) {
  if (s == null || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

export default function Timeline({ clips, onSeek, onClipSelect, onClipReorder, currentTime, duration }) {
  const {
    timelineRef,
    playheadRef,
    handlePlayheadMouseDown,
    handleTimelineClick,
    handleClipSelect: internalClipSelect,
    updateTime,
    zoom,
    setZoom,
    isDragging,
    totalDuration,
    pixelsPerSecond,
    timelineWidth,
    playheadPosition,
    selectedClip,
    clips: processedClips
  } = useTimeline({ clips, duration, onSeek });

  // Update timeline when external currentTime changes
  React.useEffect(() => {
    updateTime(currentTime);
  }, [currentTime, updateTime]);

  // Handle clip selection
  const handleClipClick = (index) => {
    internalClipSelect(index);
    if (onClipSelect) onClipSelect(index);
  };

  return (
    <div className="timeline-wrapper">
      <div className="timeline-label">
        <span>Timeline</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--accent-2)', fontWeight: '400' }}>
          {clips.length > 0 && `${clips.length} clip${clips.length !== 1 ? 's' : ''} • ${fmt(totalDuration)}`}
        </span>
        <div className="timeline-zoom-controls">
          <button 
            className="zoom-btn"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
            disabled={zoom <= 0.5}
          >
            −
          </button>
          <span className="zoom-label">{Math.round(zoom * 100)}%</span>
          <button 
            className="zoom-btn"
            onClick={() => setZoom(Math.min(3, zoom + 0.25))}
            disabled={zoom >= 3}
          >
            +
          </button>
        </div>
      </div>
      
      <div className="timeline-container">
        <div 
          ref={timelineRef}
          className={`timeline ${clips.length === 0 ? 'timeline-empty' : ''} ${isDragging ? 'dragging' : ''}`}
          onClick={handleTimelineClick}
          style={{ width: `${Math.max(timelineWidth, 800)}px` }}
        >
          {clips.length === 0 ? (
            <div className="timeline-empty-message">
              📹 Add videos to start editing
            </div>
          ) : (
            <>
              {/* Playhead */}
              <div
                ref={playheadRef}
                className="timeline-playhead"
                style={{ left: `${playheadPosition}px` }}
                onMouseDown={handlePlayheadMouseDown}
              >
                <div className="playhead-line"></div>
                <div className="playhead-handle"></div>
              </div>
              
              {/* Time ruler */}
              <div className="timeline-ruler">
                {Array.from({ length: Math.ceil(totalDuration / 5) + 1 }, (_, i) => {
                  const time = i * 5;
                  const position = time * pixelsPerSecond;
                  return (
                    <div
                      key={i}
                      className="ruler-mark"
                      style={{ left: `${position}px` }}
                    >
                      <div className="ruler-tick"></div>
                      <div className="ruler-label">{fmt(time)}</div>
                    </div>
                  );
                })}
              </div>
              
              {/* Clips */}
              {processedClips.map((clip) => (
                <div
                  key={clip.index}
                  className={`timeline-clip ${selectedClip === clip.index ? 'selected' : ''}`}
                  style={{
                    left: `${clip.startTime * pixelsPerSecond}px`,
                    width: `${clip.duration * pixelsPerSecond}px`
                  }}
                  onClick={() => handleClipClick(clip.index)}
                  draggable
                >
                  <div className="clip-content">
                    <div className="clip-name">{clip.name}</div>
                    <div className="clip-duration">{fmt(clip.duration)}</div>
                  </div>
                  <div className="clip-border"></div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}