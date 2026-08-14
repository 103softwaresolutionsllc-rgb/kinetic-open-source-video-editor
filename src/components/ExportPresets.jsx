import React, { useState, useCallback } from 'react';

const ExportPresets = ({
onExport,
ffmpegLoaded = false,
exportProgress = 0, // Real progress from useFFmpeg hook
isExporting = false, // Real exporting state
onExportStart // Optional callback when export begins
}) => {
const [selectedPreset, setSelectedPreset] = useState('youtube');
const [customSettings, setCustomSettings] = useState({
resolution: '1920x1080',
bitrate: '5M',
fps: 30,
format: 'mp4'
});

const presets = {
youtube: {
name: 'YouTube',
description: 'Optimized for YouTube uploads',
resolution: '1920x1080',
bitrate: '8M',
fps: 30,
format: 'mp4'
},
instagram: {
name: 'Instagram',
description: 'Square format for Instagram posts',
resolution: '1080x1080',
bitrate: '5M',
fps: 30,
format: 'mp4'
},
tiktok: {
name: 'TikTok',
description: 'Vertical format for TikTok',
resolution: '1080x1920',
bitrate: '4M',
fps: 30,
format: 'mp4'
},
web: {
name: 'Web',
description: 'Optimized for web streaming',
resolution: '1280x720',
bitrate: '2M',
fps: 30,
format: 'mp4'
},
cinema: {
name: 'Cinema',
description: 'High quality for cinematic projects',
resolution: '3840x2160',
bitrate: '20M',
fps: 24,
format: 'mp4'
},
custom: {
name: 'Custom',
description: 'Configure your own settings',
resolution: '1920x1080',
bitrate: '5M',
fps: 30,
format: 'mp4'
}
};

const handlePresetChange = useCallback((presetName) => {
setSelectedPreset(presetName);
if (presetName !== 'custom') {
setCustomSettings({ ...presets[presetName] });
}
}, [presets]);

const handleExport = useCallback(async () => {
if (!ffmpegLoaded) {
alert('FFmpeg is still loading. Please wait...');
return;
}

const settings = selectedPreset === 'custom'
? customSettings
: presets[selectedPreset];

if (onExportStart) onExportStart();

try {
await onExport(settings);
} catch (error) {
console.error('Export failed:', error);
alert('Export failed: ' + error.message);
}
}, [selectedPreset, customSettings, presets, ffmpegLoaded, onExport, onExportStart]);

const handleCustomSettingChange = (key, value) => {
setCustomSettings(prev => ({ ...prev, [key]: value }));
};

const currentSettings = selectedPreset === 'custom'
? customSettings
: presets[selectedPreset];

return (
<div className="export-presets">
<h3>Export Presets</h3>

<div className="preset-grid">
{Object.entries(presets).map(([key, preset]) => (
<div
key={key}
className={`preset-card ${selectedPreset === key ? 'selected' : ''}`}
onClick={() => handlePresetChange(key)}
>
<h4>{preset.name}</h4>
<p>{preset.description}</p>
<div className="preset-specs">
<span>{preset.resolution}</span>
<span>{preset.bitrate}</span>
<span>{preset.fps}fps</span>
</div>
</div>
))}
</div>

{selectedPreset === 'custom' && (
<div className="custom-settings">
<h4>Custom Settings</h4>
<div className="settings-grid">
<div className="setting-group">
<label>Resolution</label>
<select
value={customSettings.resolution}
onChange={(e) => handleCustomSettingChange('resolution', e.target.value)}
>
<option value="3840x2160">4K (3840×2160)</option>
<option value="1920x1080">1080p (1920×1080)</option>
<option value="1280x720">720p (1280×720)</option>
<option value="854x480">480p (854×480)</option>
<option value="1080x1920">Vertical 1080p</option>
<option value="1080x1080">Square 1080p</option>
</select>
</div>

<div className="setting-group">
<label>Bitrate</label>
<select
value={customSettings.bitrate}
onChange={(e) => handleCustomSettingChange('bitrate', e.target.value)}
>
<option value="2M">2 Mbps</option>
<option value="5M">5 Mbps</option>
<option value="8M">8 Mbps</option>
<option value="10M">10 Mbps</option>
<option value="20M">20 Mbps</option>
</select>
</div>

<div className="setting-group">
<label>Frame Rate</label>
<select
value={customSettings.fps}
onChange={(e) => handleCustomSettingChange('fps', Number(e.target.value))}
>
<option value={24}>24 fps</option>
<option value={30}>30 fps</option>
<option value={60}>60 fps</option>
</select>
</div>

<div className="setting-group">
<label>Format</label>
<select
value={customSettings.format}
onChange={(e) => handleCustomSettingChange('format', e.target.value)}
>
<option value="mp4">MP4</option>
<option value="webm">WebM</option>
<option value="mov">MOV</option>
<option value="gif">GIF</option>
</select>
</div>
</div>
</div>
)}

<div className="export-actions">
<button
onClick={handleExport}
disabled={isExporting || !ffmpegLoaded}
className={`export-button ${isExporting ? 'exporting' : ''}`}
>
{isExporting
? `Exporting... ${Math.round(exportProgress)}%`
: `Export as ${currentSettings.format.toUpperCase()}`
}
</button>

{isExporting && (
<div className="export-progress">
<div
className="progress-bar"
style={{ width: `${exportProgress}%` }}
/>
</div>
)}
</div>
</div>
);
};

export default ExportPresets;
