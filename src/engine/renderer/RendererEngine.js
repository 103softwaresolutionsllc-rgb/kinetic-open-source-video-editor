class RendererEngine {
  constructor() {
    this.canvas = null;
    this.context = null;
    this.video = null;
    this.scale = 1;
    this.position = { x: 0, y: 0 };
    this.rotation = 0;
    this.opacity = 1;
    this.cropArea = { x: 0, y: 0, width: 1, height: 1 };
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.fps = 30;
    this.frameCallback = null;
  }

  initialize(canvas, video) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.video = video;
    
    // Set up video event listeners
    this.video.addEventListener('loadedmetadata', () => {
      this.duration = this.video.duration;
      this.resizeCanvas();
    });

    this.video.addEventListener('timeupdate', () => {
      this.currentTime = this.video.currentTime;
    });

    this.resizeCanvas();
  }

  resizeCanvas() {
    if (!this.canvas || !this.video) return;

    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    
    this.render();
  }

  // Transform controls
  setScale(scale) {
    this.scale = Math.max(0.1, Math.min(10, scale));
    this.render();
  }

  getScale() {
    return this.scale;
  }

  setPosition(x, y) {
    this.position = { x, y };
    this.render();
  }

  getPosition() {
    return { ...this.position };
  }

  setRotation(degrees) {
    this.rotation = degrees * Math.PI / 180;
    this.render();
  }

  getRotation() {
    return this.rotation * 180 / Math.PI;
  }

  setOpacity(opacity) {
    this.opacity = Math.max(0, Math.min(1, opacity));
    this.render();
  }

  getOpacity() {
    return this.opacity;
  }

  // Cropping functionality
  setCropArea(x, y, width, height) {
    this.cropArea = {
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y)),
      width: Math.max(0.01, Math.min(1 - x, width)),
      height: Math.max(0.01, Math.min(1 - y, height))
    };
    this.render();
  }

  getCropArea() {
    return { ...this.cropArea };
  }

  // Rendering
  render() {
    if (!this.context || !this.video) return;

    // Clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Save context state
    this.context.save();

    // Apply transformations
    this.applyTransformations();

    // Draw video with crop
    this.drawVideo();

    // Restore context state
    this.context.restore();
  }

  applyTransformations() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    // Move to center
    this.context.translate(centerX + this.position.x, centerY + this.position.y);
    
    // Apply rotation
    this.context.rotate(this.rotation);
    
    // Apply scale
    this.context.scale(this.scale, this.scale);
    
    // Apply opacity
    this.context.globalAlpha = this.opacity;
  }

  drawVideo() {
    if (!this.video.videoWidth || !this.video.videoHeight) return;

    // Calculate crop dimensions
    const videoWidth = this.video.videoWidth;
    const videoHeight = this.video.videoHeight;
    
    const cropX = videoWidth * this.cropArea.x;
    const cropY = videoHeight * this.cropArea.y;
    const cropWidth = videoWidth * this.cropArea.width;
    const cropHeight = videoHeight * this.cropArea.height;

    // Calculate display dimensions to fit canvas
    const canvasAspect = this.canvas.width / this.canvas.height;
    const cropAspect = cropWidth / cropHeight;

    let drawWidth, drawHeight;
    
    if (cropAspect > canvasAspect) {
      drawWidth = this.canvas.width;
      drawHeight = this.canvas.width / cropAspect;
    } else {
      drawHeight = this.canvas.height;
      drawWidth = this.canvas.height * cropAspect;
    }

    // Center the video
    const drawX = -drawWidth / 2;
    const drawY = -drawHeight / 2;

    // Draw the video with crop
    this.context.drawImage(
      this.video,
      cropX, cropY, cropWidth, cropHeight,  // Source rectangle (cropped)
      drawX, drawY, drawWidth, drawHeight   // Destination rectangle
    );
  }

  // Playback controls
  play() {
    if (this.video && !this.isPlaying) {
      this.video.play();
      this.isPlaying = true;
      this.startRenderLoop();
    }
  }

  pause() {
    if (this.video && this.isPlaying) {
      this.video.pause();
      this.isPlaying = false;
      this.stopRenderLoop();
    }
  }

  seek(time) {
    if (this.video) {
      this.video.currentTime = Math.max(0, Math.min(this.duration, time));
      this.render();
    }
  }

  getCurrentTime() {
    return this.currentTime;
  }

  getDuration() {
    return this.duration;
  }

  // Render loop for smooth playback
  startRenderLoop() {
    const renderFrame = () => {
      if (this.isPlaying) {
        this.render();
        this.frameCallback = requestAnimationFrame(renderFrame);
      }
    };
    renderFrame();
  }

  stopRenderLoop() {
    if (this.frameCallback) {
      cancelAnimationFrame(this.frameCallback);
      this.frameCallback = null;
    }
  }

  // Frame export functionality
  exportFrame(time = null) {
    const exportTime = time !== null ? time : this.currentTime;
    
    // Create a temporary canvas for frame export
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');
    
    // Set canvas size to video dimensions
    tempCanvas.width = this.video.videoWidth;
    tempCanvas.height = this.video.videoHeight;

    // Save current video time
    const originalTime = this.video.currentTime;
    
    // Seek to desired frame
    return new Promise((resolve) => {
      this.video.addEventListener('seeked', () => {
        // Draw frame to temporary canvas
        tempContext.drawImage(this.video, 0, 0);
        
        // Convert to blob
        tempCanvas.toBlob((blob) => {
          // Restore original time
          this.video.currentTime = originalTime;
          resolve(blob);
        }, 'image/png');
      }, { once: true });

      this.video.currentTime = exportTime;
    });
  }

  // Utility methods
  reset() {
    this.scale = 1;
    this.position = { x: 0, y: 0 };
    this.rotation = 0;
    this.opacity = 1;
    this.cropArea = { x: 0, y: 0, width: 1, height: 1 };
    this.render();
  }

  fitToCanvas() {
    if (!this.video || !this.video.videoWidth) return;

    const videoAspect = this.video.videoWidth / this.video.videoHeight;
    const canvasAspect = this.canvas.width / this.canvas.height;

    if (videoAspect > canvasAspect) {
      this.scale = this.canvas.width / this.video.videoWidth;
    } else {
      this.scale = this.canvas.height / this.video.videoHeight;
    }

    this.position = { x: 0, y: 0 };
    this.render();
  }

  // Zoom to specific area
  zoomToArea(x, y, width, height) {
    if (!this.canvas) return;

    const canvasAspect = this.canvas.width / this.canvas.height;
    const areaAspect = width / height;

    let newScale;
    
    if (areaAspect > canvasAspect) {
      newScale = this.canvas.width / width;
    } else {
      newScale = this.canvas.height / height;
    }

    this.scale = newScale;
    
    // Center on the area
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    
    this.position = {
      x: this.canvas.width / 2 - centerX * newScale,
      y: this.canvas.height / 2 - centerY * newScale
    };

    this.render();
  }

  // Get visible area in video coordinates
  getVisibleArea() {
    if (!this.video || !this.video.videoWidth) return null;

    const videoWidth = this.video.videoWidth;
    const videoHeight = this.video.videoHeight;

    // Calculate visible rectangle in video coordinates
    const visibleWidth = this.canvas.width / this.scale;
    const visibleHeight = this.canvas.height / this.scale;

    const x = -this.position.x / this.scale;
    const y = -this.position.y / this.scale;

    return {
      x: Math.max(0, x),
      y: Math.max(0, y),
      width: Math.min(videoWidth, visibleWidth),
      height: Math.min(videoHeight, visibleHeight)
    };
  }
}

export default RendererEngine;
