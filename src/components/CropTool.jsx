import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

const CropTool = ({
image, // Thumbnail or first frame of the video
onCropComplete,
initialAspect = 16/9,
onClose,
initialCrop = { x: 0, y: 0 },
initialZoom = 1
}) => {
const [crop, setCrop] = useState(initialCrop);
const [zoom, setZoom] = useState(initialZoom);
const [aspect, setAspect] = useState(initialAspect);
const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

const onCropChange = useCallback((newCrop) => setCrop(newCrop), []);
const onZoomChange = useCallback((newZoom) => setZoom(newZoom), []);

const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
setCroppedAreaPixels(croppedAreaPixels);
}, []);

const handleApplyCrop = useCallback(() => {
if (croppedAreaPixels && onCropComplete) {
onCropComplete({
crop,
zoom,
croppedAreaPixels,
aspect
});
}
onClose();
}, [crop, zoom, croppedAreaPixels, aspect, onCropComplete, onClose]);

const handleReset = useCallback(() => {
setCrop({ x: 0, y: 0 });
setZoom(1);
setAspect(initialAspect);
setCroppedAreaPixels(null);
}, [initialAspect]);

const handleAspectChange = (e) => {
const value = e.target.value;
setAspect(value === 'null' ? null : Number(value));
};

return (
<div className="crop-tool-overlay">
<div className="crop-tool-modal">
<div className="crop-tool-header">
<h3>Crop Video Frame</h3>
<div className="crop-tool-controls">
<button onClick={handleReset} className="secondary">Reset</button>
<button onClick={onClose} className="secondary">Cancel</button>
<button onClick={handleApplyCrop} className="primary">Apply Crop</button>
</div>
</div>

<div className="crop-tool-content">
<div className="crop-container">
<Cropper
image={image}
crop={crop}
zoom={zoom}
aspect={aspect}
onCropChange={onCropChange}
onCropComplete={onCropCompleteCallback}
onZoomChange={onZoomChange}
objectFit="contain"
style={{
containerStyle: { width: '100%', height: '400px', position: 'relative', backgroundColor: '#0B0E14' },
cropAreaStyle: { border: '2px solid #BF00FF', boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)' }
}}
/>
</div>

<div className="crop-controls-panel">
<div className="control-group">
<label>Zoom: {Math.round(zoom * 100)}%</label>
<input
type="range"
min={0.5}
max={3}
step={0.01}
value={zoom}
onChange={(e) => setZoom(Number(e.target.value))}
className="zoom-slider"
/>
</div>

<div className="control-group">
<label>Aspect Ratio</label>
<select
value={aspect || 'null'}
onChange={handleAspectChange}
className="aspect-select"
>
<option value={16/9}>16:9 (Widescreen)</option>
<option value={4/3}>4:3 (Standard)</option>
<option value={1}>1:1 (Square)</option>
<option value={9/16}>9:16 (Vertical)</option>
<option value="null">Free</option>
</select>
</div>

{croppedAreaPixels && (
<div className="crop-info">
<h4>Crop Dimensions</h4>
<div className="crop-dimensions">
<span>Width: {Math.round(croppedAreaPixels.width)}px</span>
<span>Height: {Math.round(croppedAreaPixels.height)}px</span>
<span>X: {Math.round(croppedAreaPixels.x)}px</span>
<span>Y: {Math.round(croppedAreaPixels.y)}px</span>
</div>
</div>
)}
</div>
</div>
</div>

</div>
);
};

export default CropTool;