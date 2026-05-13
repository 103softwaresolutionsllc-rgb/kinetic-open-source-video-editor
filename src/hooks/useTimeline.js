import { useState, useRef, useCallback, useEffect } from 'react';

export function useTimeline({ clips = [], duration = 60, onSeek }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedClip, setSelectedClip] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef(null);
  const playheadRef = useRef(null);

  // Calculate timeline dimensions
  const pixelsPerSecond = 100 * zoom;
  const timelineWidth = duration * pixelsPerSecond;
  const playheadPosition = currentTime * pixelsPerSecond;

  // Calculate total duration from clips
  const totalDuration = clips.reduce((sum, clip) => {
    const clipDuration = (clip.end ?? clip.duration ?? 0) - (clip.start || 0);
    return sum + clipDuration;
  }, 0) || duration;

  // Handle playhead dragging
  const handlePlayheadMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newTime = Math.max(0, Math.min(totalDuration, x / pixelsPerSecond));
    
    setCurrentTime(newTime);
    if (onSeek) onSeek(newTime);
  }, [isDragging, pixelsPerSecond, totalDuration, onSeek]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle timeline scrubbing (click to seek)
  const handleTimelineClick = useCallback((e) => {
    if (e.target.closest('.timeline-playhead') || e.target.closest('.timeline-clip')) return;
    
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newTime = Math.max(0, Math.min(totalDuration, x / pixelsPerSecond));
    
    setCurrentTime(newTime);
    if (onSeek) onSeek(newTime);
  }, [pixelsPerSecond, totalDuration, onSeek]);

  // Handle clip selection
  const handleClipSelect = useCallback((clipIndex) => {
    setSelectedClip(clipIndex);
  }, []);

  // Handle clip reordering
  const handleClipReorder = useCallback((fromIndex, toIndex) => {
    // This will be implemented with drag and drop
    console.log('Reorder clip from', fromIndex, 'to', toIndex);
  }, []);

  // Update current time from external source (video playback)
  const updateTime = useCallback((time) => {
    setCurrentTime(time);
  }, []);

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    // State
    currentTime,
    selectedClip,
    zoom,
    isDragging,
    totalDuration,
    pixelsPerSecond,
    timelineWidth,
    playheadPosition,
    
    // Refs
    timelineRef,
    playheadRef,
    
    // Handlers
    handlePlayheadMouseDown,
    handleTimelineClick,
    handleClipSelect,
    handleClipReorder,
    updateTime,
    setZoom,
    
    // Computed values
    clips: clips.map((clip, index) => {
      const clipDuration = (clip.end ?? clip.duration ?? 0) - (clip.start || 0);
      const startTime = clips.slice(0, index).reduce((sum, prevClip) => {
        const prevDuration = (prevClip.end ?? prevClip.duration ?? 0) - (prevClip.start || 0);
        return sum + prevDuration;
      }, 0);
      
      return {
        ...clip,
        index,
        duration: clipDuration,
        startTime,
        endTime: startTime + clipDuration,
        width: totalDuration > 0 ? (clipDuration / totalDuration) * 100 : 0,
        left: totalDuration > 0 ? (startTime / totalDuration) * 100 : 0
      };
    })
  };
}
