class EffectsEngine {
  constructor() {
    this.effects = [];
    this.activeEffects = new Map();
    this.presets = this.initializePresets();
  }

  initializePresets() {
    return {
      // Color correction presets
      'warm': {
        name: 'Warm',
        brightness: 1.1,
        contrast: 1.05,
        saturation: 1.2,
        temperature: 1.1
      },
      'cool': {
        name: 'Cool',
        brightness: 0.95,
        contrast: 1.05,
        saturation: 0.8,
        temperature: 0.9
      },
      'vintage': {
        name: 'Vintage',
        brightness: 1.1,
        contrast: 0.9,
        saturation: 0.7,
        sepia: 0.3
      },
      'dramatic': {
        name: 'Dramatic',
        brightness: 0.9,
        contrast: 1.3,
        saturation: 1.1,
        blacks: 0.1
      },

      // Transition presets
      'fade-in': {
        name: 'Fade In',
        type: 'transition',
        duration: 1.0,
        easing: 'ease-in'
      },
      'fade-out': {
        name: 'Fade Out',
        type: 'transition',
        duration: 1.0,
        easing: 'ease-out'
      },
      'dissolve': {
        name: 'Dissolve',
        type: 'transition',
        duration: 1.5,
        easing: 'ease-in-out'
      },

      // Filter presets
      'blur': {
        name: 'Blur',
        type: 'filter',
        intensity: 5
      },
      'sharpen': {
        name: 'Sharpen',
        type: 'filter',
        intensity: 0.5
      },
      'glow': {
        name: 'Glow',
        type: 'filter',
        intensity: 0.3,
        color: '#ffffff'
      }
    };
  }

  // Effect management
  addEffect(effect) {
    const effectWithId = {
      id: Date.now(),
      enabled: true,
      ...effect
    };
    this.effects.push(effectWithId);
    return effectWithId;
  }

  removeEffect(effectId) {
    this.effects = this.effects.filter(effect => effect.id !== effectId);
    this.activeEffects.delete(effectId);
  }

  getEffect(effectId) {
    return this.effects.find(effect => effect.id === effectId);
  }

  getAllEffects() {
    return [...this.effects];
  }

  // Preset management
  getPreset(presetName) {
    return this.presets[presetName];
  }

  getAllPresets() {
    return Object.keys(this.presets).map(key => ({
      key,
      ...this.presets[key]
    }));
  }

  applyPreset(presetName, clipId = null) {
    const preset = this.presets[presetName];
    if (!preset) return null;

    return this.addEffect({
      ...preset,
      preset: presetName,
      clipId,
      startTime: 0,
      endTime: 10
    });
  }

  // Color correction effects
  addColorCorrection(clipId, settings = {}) {
    const {
      brightness = 1,
      contrast = 1,
      saturation = 1,
      temperature = 1,
      tint = 0,
      blacks = 0,
      whites = 1,
      highlights = 1,
      shadows = 1
    } = settings;

    return this.addEffect({
      type: 'color-correction',
      clipId,
      settings: {
        brightness,
        contrast,
        saturation,
        temperature,
        tint,
        blacks,
        whites,
        highlights,
        shadows
      }
    });
  }

  // Transition effects
  addTransition(fromClipId, toClipId, type = 'dissolve', duration = 1.0) {
    return this.addEffect({
      type: 'transition',
      fromClipId,
      toClipId,
      transitionType: type,
      duration,
      easing: 'ease-in-out'
    });
  }

  // Filter effects
  addFilter(clipId, filterType, intensity = 1.0, options = {}) {
    return this.addEffect({
      type: 'filter',
      clipId,
      filterType,
      intensity,
      ...options
    });
  }

  // Blur effect
  addBlur(clipId, radius = 5) {
    return this.addFilter(clipId, 'blur', radius);
  }

  // Sharpen effect
  addSharpen(clipId, amount = 0.5) {
    return this.addFilter(clipId, 'sharpen', amount);
  }

  // Glow effect
  addGlow(clipId, intensity = 0.3, color = '#ffffff') {
    return this.addFilter(clipId, 'glow', intensity, { color });
  }

  // Chroma key (green screen)
  addChromaKey(clipId, color = '#00ff00', threshold = 0.4, smoothness = 0.1) {
    return this.addEffect({
      type: 'chroma-key',
      clipId,
      color,
      threshold,
      smoothness
    });
  }

  // Apply effects to canvas
  applyEffects(context, clipId, currentTime) {
    const relevantEffects = this.effects.filter(effect => 
      effect.enabled && 
      (effect.clipId === clipId || !effect.clipId) &&
      this.isEffectActive(effect, currentTime)
    );

    relevantEffects.forEach(effect => {
      this.applyEffect(context, effect, currentTime);
    });
  }

  isEffectActive(effect, currentTime) {
    if (effect.startTime !== undefined && effect.endTime !== undefined) {
      return currentTime >= effect.startTime && currentTime <= effect.endTime;
    }
    return true;
  }

  applyEffect(context, effect, currentTime) {
    switch (effect.type) {
      case 'color-correction':
        this.applyColorCorrection(context, effect.settings);
        break;
      case 'filter':
        this.applyFilter(context, effect);
        break;
      case 'transition':
        this.applyTransition(context, effect, currentTime);
        break;
      case 'chroma-key':
        this.applyChromaKey(context, effect);
        break;
      default:
        console.warn(`Unknown effect type: ${effect.type}`);
    }
  }

  applyColorCorrection(context, settings) {
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // Apply brightness
      r *= settings.brightness;
      g *= settings.brightness;
      b *= settings.brightness;

      // Apply contrast
      r = ((r / 255 - 0.5) * settings.contrast + 0.5) * 255;
      g = ((g / 255 - 0.5) * settings.contrast + 0.5) * 255;
      b = ((b / 255 - 0.5) * settings.contrast + 0.5) * 255;

      // Apply saturation
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = gray + settings.saturation * (r - gray);
      g = gray + settings.saturation * (g - gray);
      b = gray + settings.saturation * (b - gray);

      // Apply temperature
      r *= settings.temperature;
      b /= settings.temperature;

      // Clamp values
      data[i] = Math.max(0, Math.min(255, r));
      data[i + 1] = Math.max(0, Math.min(255, g));
      data[i + 2] = Math.max(0, Math.min(255, b));
    }

    context.putImageData(imageData, 0, 0);
  }

  applyFilter(context, effect) {
    switch (effect.filterType) {
      case 'blur':
        this.applyBlurFilter(context, effect.intensity);
        break;
      case 'sharpen':
        this.applySharpenFilter(context, effect.intensity);
        break;
      case 'glow':
        this.applyGlowFilter(context, effect.intensity, effect.color);
        break;
    }
  }

  applyBlurFilter(context, radius) {
    context.filter = `blur(${radius}px)`;
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    context.putImageData(imageData, 0, 0);
    context.filter = 'none';
  }

  applySharpenFilter(context, amount) {
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    const kernel = [
      0, -amount, 0,
      -amount, 1 + 4 * amount, -amount,
      0, -amount, 0
    ];

    const output = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let sum = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const idx = ((y + ky) * width + (x + kx)) * 4 + c;
              sum += data[idx] * kernel[(ky + 1) * 3 + (kx + 1)];
            }
          }
          output[(y * width + x) * 4 + c] = sum;
        }
      }
    }

    for (let i = 0; i < data.length; i++) {
      data[i] = output[i];
    }

    context.putImageData(imageData, 0, 0);
  }

  applyGlowFilter(context, intensity, color) {
    context.shadowBlur = intensity * 20;
    context.shadowColor = color;
    context.globalCompositeOperation = 'screen';
    
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    context.putImageData(imageData, 0, 0);
    
    context.globalCompositeOperation = 'source-over';
    context.shadowBlur = 0;
  }

  applyChromaKey(context, effect) {
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const data = imageData.data;

    // Convert hex color to RGB
    const color = this.hexToRgb(effect.color);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Calculate distance from chroma key color
      const distance = Math.sqrt(
        Math.pow(r - color.r, 2) +
        Math.pow(g - color.g, 2) +
        Math.pow(b - color.b, 2)
      );

      // Make pixels similar to the key color transparent
      if (distance < effect.threshold * 255) {
        data[i + 3] = 0; // Set alpha to 0 (transparent)
      }
    }

    context.putImageData(imageData, 0, 0);
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 255, b: 0 };
  }

  // Export effects configuration
  exportEffects() {
    return {
      effects: this.effects.map(effect => ({
        id: effect.id,
        type: effect.type,
        enabled: effect.enabled,
        preset: effect.preset,
        clipId: effect.clipId,
        startTime: effect.startTime,
        endTime: effect.endTime,
        settings: effect.settings
      }))
    };
  }

  // Import effects configuration
  importEffects(data) {
    this.effects = data.effects || [];
  }

  // Clone effect
  cloneEffect(effectId) {
    const original = this.getEffect(effectId);
    if (!original) return null;

    return this.addEffect({
      ...original,
      id: undefined, // Will be assigned new ID
      name: `${original.name} (Copy)`
    });
  }
}

export default EffectsEngine;
