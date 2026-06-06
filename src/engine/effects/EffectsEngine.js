class EffectsEngine {
constructor() {
this.effects = [];
this.presets = this.initializePresets();
}

initializePresets() {
return {
// Color
'warm': { name: 'Warm', brightness: 1.1, contrast: 1.05, saturation: 1.2, temperature: 1.1 },
'cool': { name: 'Cool', brightness: 0.95, contrast: 1.05, saturation: 0.8, temperature: 0.9 },
'vintage': { name: 'Vintage', brightness: 1.1, contrast: 0.9, saturation: 0.7, sepia: 0.3 },
'dramatic': { name: 'Dramatic', brightness: 0.9, contrast: 1.3, saturation: 1.1, blacks: 0.1 },

// Transitions
'fade': { name: 'Fade', type: 'transition', duration: 1.0 },
'dissolve': { name: 'Dissolve', type: 'transition', duration: 1.5 },
'wipe': { name: 'Wipe', type: 'transition', duration: 1.0 },
'slide': { name: 'Slide', type: 'transition', duration: 1.0 },

// Filters
'blur': { name: 'Blur', type: 'filter', intensity: 5 },
'sharpen': { name: 'Sharpen', type: 'filter', intensity: 0.5 },
'glow': { name: 'Glow', type: 'filter', intensity: 0.3, color: '#ffffff' }
};
}

addEffect(effect) {
const newEffect = {
id: Date.now(),
enabled: true,
startTime: 0,
endTime: 10,
...effect
};
this.effects.push(newEffect);
return newEffect;
}

removeEffect(effectId) {
this.effects = this.effects.filter(e => e.id !== effectId);
}

getAllEffects() {
return [...this.effects];
}

applyPreset(presetName, clipId = null) {
const preset = this.presets[presetName];
if (!preset) return null;
return this.addEffect({ ...preset, preset: presetName, clipId });
}

// === Core Rendering ===
applyEffects(context, clipId, currentTime) {
const activeEffects = this.effects.filter(effect =>
effect.enabled &&
(!effect.clipId || effect.clipId === clipId) &&
this.isEffectActive(effect, currentTime)
);

activeEffects.forEach(effect => {
this.applySingleEffect(context, effect, currentTime);
});
}

isEffectActive(effect, currentTime) {
if (effect.startTime == null || effect.endTime == null) return true;
return currentTime >= effect.startTime && currentTime <= effect.endTime;
}

applySingleEffect(context, effect, currentTime) {
switch (effect.type) {
case 'color-correction':
this.applyColorCorrection(context, effect.settings || effect);
break;
case 'filter':
this.applyFilter(context, effect);
break;
case 'transition':
// Transitions are usually applied at clip boundaries in the main render loop
console.warn('Transitions should be handled in the main timeline render');
break;
case 'chroma-key':
this.applyChromaKey(context, effect);
break;
default:
console.warn(`Unknown effect: ${effect.type}`);
}
}

// Color Correction (already quite good)
applyColorCorrection(context, settings) {
const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
const data = imageData.data;

for (let i = 0; i < data.length; i += 4) {
let r = data[i], g = data[i + 1], b = data[i + 2];

// Brightness
r *= settings.brightness ?? 1;
g *= settings.brightness ?? 1;
b *= settings.brightness ?? 1;

// Contrast
r = ((r / 255 - 0.5) * (settings.contrast ?? 1) + 0.5) * 255;
g = ((g / 255 - 0.5) * (settings.contrast ?? 1) + 0.5) * 255;
b = ((b / 255 - 0.5) * (settings.contrast ?? 1) + 0.5) * 255;

// Saturation
const gray = 0.299 * r + 0.587 * g + 0.114 * b;
const sat = settings.saturation ?? 1;
r = gray + sat * (r - gray);
g = gray + sat * (g - gray);
b = gray + sat * (b - gray);

// Temperature
if (settings.temperature !== undefined) {
r *= settings.temperature;
b /= settings.temperature;
}

data[i] = Math.max(0, Math.min(255, r));
data[i + 1] = Math.max(0, Math.min(255, g));
data[i + 2] = Math.max(0, Math.min(255, b));
}

context.putImageData(imageData, 0, 0);
}

applyFilter(context, effect) {
switch (effect.filterType || effect.name?.toLowerCase()) {
case 'blur':
context.filter = `blur(${effect.intensity}px)`;
break;
case 'sharpen':
// Sharpen is expensive — consider WebGL for production
console.warn('Sharpen filter is placeholder-heavy');
break;
case 'glow':
context.shadowBlur = (effect.intensity || 0.3) * 20;
context.shadowColor = effect.color || '#ffffff';
break;
}
}

applyChromaKey(context, effect) {
// Your original chroma key logic is solid
const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
const data = imageData.data;
const key = this.hexToRgb(effect.color || '#00ff00');

for (let i = 0; i < data.length; i += 4) {
const dist = Math.sqrt(
Math.pow(data[i] - key.r, 2) +
Math.pow(data[i + 1] - key.g, 2) +
Math.pow(data[i + 2] - key.b, 2)
);

if (dist < (effect.threshold || 0.4) * 255) {
data[i + 3] = 0; // transparent
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

// TODO: Replace placeholder drawClip with real video frame drawing from the timeline
drawClip(context, clip, offsetX = 0, offsetY = 0) {
// This should be replaced by the main preview renderer
context.fillStyle = 'rgba(191, 0, 255, 0.4)';
context.fillRect(offsetX, offsetY, context.canvas.width, context.canvas.height);

context.fillStyle = 'white';
context.font = 'bold 24px Arial';
context.textAlign = 'center';
context.fillText(clip?.name || 'Video Clip',
offsetX + context.canvas.width / 2,
offsetY + context.canvas.height / 2);
}

exportEffects() {
return { effects: this.effects };
}

importEffects(data) {
this.effects = data.effects || [];
}
}

export default EffectsEngine;