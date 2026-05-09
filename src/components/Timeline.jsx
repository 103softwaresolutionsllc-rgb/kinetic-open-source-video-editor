import React, { useState } from 'react';

function fmt(s) {
  if (s == null || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

export default function Timeline({ clips, onRemove, onSelect, selectedIndex }) {
  const totalDur = clips.reduce((sum, c) => sum + ((c.end ?? c.duration ?? 0) - (c.start || 0)), 0);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('video/'));
    if (files.length > 0) {
      // Trigger file handling
      const event = { target: { files } };
      // Pass to parent component
    }
  };

  return (
    <div className="timeline-wrapper">
      <div className="timeline-label">
        <span>Timeline</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--accent-2)', fontWeight: '400' }}>
          {clips.length > 0 && `${clips.length} clip${clips.length !== 1 ? 's' : ''} • ${fmt(totalDur)}`}
        </span>
      </div>
      <div 
        className={`timeline ${clips.length === 0 ? 'drop-zone' : ''} ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {clips.length === 0 ? (
          <div className="timeline-empty">
            📹 Drag videos here or use "Add Videos" from the Project menu
          </div>
        ) : (
          <>
            {/* Interactive playhead */}
            {selectedIndex !== null && (
              <div 
                className="timeline-playhead"
                style={{ 
                  left: `${clips.slice(0, selectedIndex).reduce((sum, c) => {
                    return sum + ((c.end ?? c.duration ?? 0) - (c.start || 0));
                  }, 0) / totalDur * 100}%` 
                }}
              />
            )}
            
            {clips.map((clip, index) => {
              const clipDur = (clip.end ?? clip.duration ?? 0) - (clip.start || 0);
              const widthPct = totalDur > 0 ? (clipDur / totalDur) * 100 : 100 / clips.length;

              return (
                <div
                  key={index}
                  className={`timeline-item${selectedIndex === index ? ' active' : ''}`}
                  style={{ width: `max(80px, ${widthPct}%)` }}
                  onClick={() => onSelect(index)}
                  title={`${clip.name} — ${fmt(clip.start)} → ${fmt(clip.end ?? clip.duration)}`}
                >
                  <div className="timeline-item-name">{clip.name}</div>
                  <div className="timeline-item-time">{fmt(clip.start)} – {fmt(clip.end ?? clip.duration)}</div>
                  <div className="timeline-item-dur">{fmt(clipDur)}</div>
                  <button
                    className="timeline-remove"
                    onClick={e => { e.stopPropagation(); onRemove(index); }}
                    title="Remove clip"
                  >✕</button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}