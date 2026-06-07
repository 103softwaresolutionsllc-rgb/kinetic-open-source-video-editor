import React, { useCallback, useEffect, useState } from 'react';

export default function TimelinePlayhead({
  currentTime,
  totalDuration,
  onSeek,
  trackLeft = 40,
}) {
  const [dragging, setDragging] = useState(false);
  const playheadPosition =
    totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  const seekFromEvent = useCallback(
    (e, container) => {
      if (!container || !onSeek) return;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, e.clientX - rect.left - trackLeft);
      const usable = rect.width - trackLeft;
      const time = (x / usable) * totalDuration;
      onSeek(Math.max(0, Math.min(totalDuration, time)));
    },
    [onSeek, totalDuration, trackLeft]
  );

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(true);
      const container = e.currentTarget.closest('.timeline-content');
      seekFromEvent(e, container);
    },
    [seekFromEvent]
  );

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e) => {
      const container = document.querySelector('.multi-layer-timeline .timeline-content');
      seekFromEvent(e, container);
    };

    const onUp = () => setDragging(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [dragging, seekFromEvent]);

  return (
    <div
      className={`timeline-playhead ${dragging ? 'dragging' : ''}`}
      style={{ left: `${playheadPosition}%` }}
      onMouseDown={handleMouseDown}
      role="slider"
      aria-valuenow={currentTime}
      aria-valuemin={0}
      aria-valuemax={totalDuration}
    >
      <div className="playhead-line" />
      <div className="playhead-handle">
        <div className="playhead-glow" />
      </div>
    </div>
  );
}
