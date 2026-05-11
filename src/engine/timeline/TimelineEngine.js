class TimelineEngine {
  constructor() {
    this.zoomLevel = 1;
    this.pixelsPerSecond = 100;
    this.duration = 60; // Default 60 seconds
    this.currentTime = 0;
    this.tracks = [];
    this.snappingEnabled = true;
    this.snapThreshold = 10; // pixels
    this.selectedClips = new Set();
  }

  // Zoom functionality
  setZoomLevel(level) {
    this.zoomLevel = Math.max(0.1, Math.min(10, level));
    return this.zoomLevel;
  }

  getZoomLevel() {
    return this.zoomLevel;
  }

  getPixelsPerSecond() {
    return this.pixelsPerSecond * this.zoomLevel;
  }

  getTimelineWidth() {
    return this.duration * this.getPixelsPerSecond();
  }

  // Time conversion
  pixelsToTime(pixels) {
    return pixels / this.getPixelsPerSecond();
  }

  timeToPixels(time) {
    return time * this.getPixelsPerSecond();
  }

  // Timeline duration
  setDuration(seconds) {
    this.duration = seconds;
  }

  getDuration() {
    return this.duration;
  }

  // Current time management
  setCurrentTime(time) {
    this.currentTime = Math.max(0, Math.min(this.duration, time));
  }

  getCurrentTime() {
    return this.currentTime;
  }

  // Track management
  addTrack(track) {
    const newTrack = {
      id: Date.now(),
      name: `Track ${this.tracks.length + 1}`,
      clips: [],
      muted: false,
      locked: false,
      ...track
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  removeTrack(trackId) {
    this.tracks = this.tracks.filter(track => track.id !== trackId);
  }

  getTracks() {
    return this.tracks;
  }

  // Clip management
  addClip(trackId, clip) {
    const track = this.tracks.find(t => t.id === trackId);
    if (!track) return null;

    const newClip = {
      id: Date.now(),
      startTime: 0,
      duration: 10,
      name: 'New Clip',
      type: 'video',
      ...clip
    };

    track.clips.push(newClip);
    return newClip;
  }

  removeClip(trackId, clipId) {
    const track = this.tracks.find(t => t.id === trackId);
    if (!track) return;

    track.clips = track.clips.filter(clip => clip.id !== clipId);
  }

  moveClip(trackId, clipId, newStartTime) {
    const track = this.tracks.find(t => t.id === trackId);
    if (!track) return;

    const clip = track.clips.find(c => c.id === clipId);
    if (!clip) return;

    // Apply snapping
    const snappedTime = this.snappingEnabled ? 
      this.applySnapping(newStartTime, trackId, clipId) : 
      newStartTime;

    clip.startTime = Math.max(0, snappedTime);
  }

  // Snapping functionality
  applySnapping(time, trackId, clipId) {
    const snapPoints = this.getSnapPoints(trackId, clipId);
    let closestPoint = null;
    let closestDistance = this.snapThreshold;

    snapPoints.forEach(point => {
      const distance = Math.abs(time - point);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPoint = point;
      }
    });

    return closestPoint !== null ? closestPoint : time;
  }

  getSnapPoints(trackId, excludeClipId) {
    const points = [];
    
    this.tracks.forEach(track => {
      // Add track start/end points
      points.push(0);
      points.push(this.duration);

      // Add clip boundaries
      track.clips.forEach(clip => {
        if (clip.id !== excludeClipId) {
          points.push(clip.startTime);
          points.push(clip.startTime + clip.duration);
        }
      });
    });

    // Add current playhead position
    points.push(this.currentTime);

    return points;
  }

  // Clip splitting
  splitClip(trackId, clipId, splitTime) {
    const track = this.tracks.find(t => t.id === trackId);
    if (!track) return null;

    const clipIndex = track.clips.findIndex(c => c.id === clipId);
    if (clipIndex === -1) return null;

    const clip = track.clips[clipIndex];
    
    // Check if split time is within clip bounds
    if (splitTime <= clip.startTime || splitTime >= clip.startTime + clip.duration) {
      return null;
    }

    // Create two new clips
    const firstClip = {
      ...clip,
      id: Date.now(),
      duration: splitTime - clip.startTime,
      name: `${clip.name} (1)`
    };

    const secondClip = {
      ...clip,
      id: Date.now() + 1,
      startTime: splitTime,
      duration: clip.startTime + clip.duration - splitTime,
      name: `${clip.name} (2)`
    };

    // Replace original clip with two new clips
    track.clips.splice(clipIndex, 1, firstClip, secondClip);

    return [firstClip, secondClip];
  }

  // Ripple delete
  rippleDelete(trackId, clipId) {
    const track = this.tracks.find(t => t.id === trackId);
    if (!track) return;

    const clipIndex = track.clips.findIndex(c => c.id === clipId);
    if (clipIndex === -1) return;

    const clip = track.clips[clipIndex];
    const deleteTime = clip.startTime;
    const deleteDuration = clip.duration;

    // Remove the clip
    track.clips.splice(clipIndex, 1);

    // Move all subsequent clips
    track.clips.forEach(clip => {
      if (clip.startTime > deleteTime) {
        clip.startTime -= deleteDuration;
      }
    });
  }

  // Selection management
  selectClip(trackId, clipId, multiSelect = false) {
    if (!multiSelect) {
      this.selectedClips.clear();
    }
    this.selectedClips.add(`${trackId}:${clipId}`);
  }

  deselectClip(trackId, clipId) {
    this.selectedClips.delete(`${trackId}:${clipId}`);
  }

  getSelectedClips() {
    return Array.from(this.selectedClips);
  }

  clearSelection() {
    this.selectedClips.clear();
  }

  // Utility methods
  getClipAt(trackId, time) {
    const track = this.tracks.find(t => t.id === trackId);
    if (!track) return null;

    return track.clips.find(clip => 
      time >= clip.startTime && time < clip.startTime + clip.duration
    );
  }

  getVisibleClips(startTime, endTime) {
    const visibleClips = [];
    
    this.tracks.forEach((track, trackIndex) => {
      track.clips.forEach(clip => {
        if (clip.startTime < endTime && clip.startTime + clip.duration > startTime) {
          visibleClips.push({
            ...clip,
            trackId: track.id,
            trackIndex
          });
        }
      });
    });

    return visibleClips;
  }

  // Export timeline data
  exportTimeline() {
    return {
      duration: this.duration,
      tracks: this.tracks.map(track => ({
        ...track,
        clips: track.clips.map(clip => ({
          id: clip.id,
          startTime: clip.startTime,
          duration: clip.duration,
          name: clip.name,
          type: clip.type,
          src: clip.src
        }))
      }))
    };
  }

  // Import timeline data
  importTimeline(data) {
    this.duration = data.duration || 60;
    this.tracks = data.tracks || [];
  }
}

export default TimelineEngine;
