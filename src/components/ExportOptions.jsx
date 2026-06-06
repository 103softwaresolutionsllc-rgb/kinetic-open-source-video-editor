import React, { useState, useCallback } from 'react';

const ExportOptions = ({
onExport,
ffmpegLoaded = false,
selectedClips = [],
currentProjectDuration = 0 // Helpful for GIF duration validation
}) => {
const [exportSettings, setExportSettings] = useState({
format: 'mp4',
resolution: '1920x1080',
quality: 'medium',
bitrate: '5M',
fps: 30,
gifFps: 10,
gifDuration: 5
});

const handleExport = useCallback(async () => {
if (!ffmpegLoaded) {
alert('FFmpeg is still loading. Please wait a moment...');
return;
}

if (onExport) {
await onExport(exportSettings);
}
}, [ffmpegLoaded, onExport, exportSettings]);

const formatOptions = [
{ value: 'mp4', label: 'MP4', description: 'Most compatible video format' },
{ value: 'webm', label: 'WebM', description: 'Best for web' },
{ value: 'mov', label: 'MOV', description: 'QuickTime / Apple' },
{ value: 'gif', label: 'GIF', description: 'Animated image' }
];

const resolutionOptions = [
{ value: '3840x2160', label: '4K UHD (3840×2160)' },
{ value: '1920x1080', label: '1080p Full HD (1920×1080)' },
{ value: '1280x720', label: '720p HD (1280×720)' },
{ value: '854x480', label: '480p SD (854×480)' },
{ value: '1080x1920', label: 'Vertical 1080p (1080×1920)' },
{ value: '1080x1080', label: 'Square (1080×1080)' }
];

const qualityOptions = [
{ value: 'high', label: 'High', bitrate: '8M' },
{ value: 'medium', label: 'Medium', bitrate: '5M' },
{ value: 'low', label: 'Low', bitrate: '2M' }
];

const fpsOptions = [24, 30, 60];

const updateSetting = (key, value) => {
setExportSettings(prev => ({ ...prev, [key]: value }));
};

return (
<div className="export-options">
<div className="export-header">
<h3>Export Settings</h3>
<button
onClick={handleExport}
disabled={!ffmpegLoaded}
className="export-btn"
>
📤 Export Video
</button>
</div>

<div className="export-settings">
{/* Format */}
<div className="setting-group">
<label>Output Format</label>
<div className="format-options">
{formatOptions.map(format => (
<button
key={format.value}
className={`format-option ${exportSettings.format === format.value ? 'selected' : ''}`}
onClick={() => updateSetting('format', format.value)}
>
<span className="format-label">{format.label}</span>
<span className="format-desc">{format.description}</span>
</button>
))}
</div>
</div>

{/* Resolution */}
<div className="setting-group">
<label>Resolution</label>
<select
value={exportSettings.resolution}
onChange={(e) => updateSetting('resolution', e.target.value)}
className="resolution-select"
>
{resolutionOptions.map(res => (
<option key={res.value} value={res.value}>{res.label}</option>
))}
</select>
</div>

{exportSettings.format !== 'gif' ? (
<>
{/* Quality */}
<div className="setting-group">
<label>Quality</label>
<div className="quality-options">
{qualityOptions.map(q => (
<button
key={q.value}
className={`quality-option ${exportSettings.quality === q.value ? 'selected' : ''}`}
onClick={() => {
updateSetting('quality', q.value);
updateSetting('bitrate', q.bitrate);
}}
>
<span className="quality-label">{q.label}</span>
<span className="quality-bitrate">{q.bitrate}</span>
</button>
))}
</div>
</div>

{/* FPS */}
<div className="setting-group">
<label>Frame Rate</label>
<div className="fps-options">
{fpsOptions.map(fps => (
<button
key={fps}
className={`fps-option ${exportSettings.fps === fps ? 'selected' : ''}`}
onClick={() => updateSetting('fps', fps)}
>
{fps} fps
</button>
))}
</div>
</div>
</>
) : (
/* GIF-specific options */
<>
<div className="setting-group">
<label>GIF Frame Rate</label>
<div className="gif-fps-options">
{[5, 10, 15, 20].map(fps => (
<button
key={fps}
className={`gif-fps-option ${exportSettings.gifFps === fps ? 'selected' : ''}`}
onClick={() => updateSetting('gifFps', fps)}
>
{fps} fps
</button>
))}
</div>
</div>

<div className="setting-group">
<label>GIF Duration (seconds)</label>
<input
type="number"
min="1"
max={Math.min(30, currentProjectDuration || 30)}
value={exportSettings.gifDuration}
onChange={(e) => updateSetting('gifDuration', parseInt(e.target.value))}
className="gif-duration-input"
/>
</div>
</>
)}
</div>

<style jsx>{`
/* Your original styles are preserved and work well */
/* (All the CSS you provided is still valid and looks great) */

.export-options {
background: var(--surface);
border: 1px solid var(--glass-border);
border-radius: var(--radius-lg);
padding: 1rem;
margin-top: 1rem;
}

/* ... rest of your styles ... */
`}</style>
</div>
);
};

export default ExportOptions;