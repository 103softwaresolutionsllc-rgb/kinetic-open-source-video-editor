import React from 'react';

export default function TimelinePlayhead({ currentTime, totalDuration }) {
  const playheadPosition = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div 
      className="timeline-playhead"
      style={{ left: `${playheadPosition}%` }}
    >
      <div className="playhead-line" />
      <div className="playhead-handle">
        <div className="playhead-glow" />
      </div>
    </div>
  );
}
