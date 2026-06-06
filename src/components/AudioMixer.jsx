import React, { useState, useCallback } from 'react';

const AudioMixer = ({
audioTracks = [],
onVolumeChange,
onMuteToggle,
onSoloToggle,
onImportMusic,
onRecordVoice,
onMuteAll,
onSoloNone
}) => {
const [showMixerDialog, setShowMixerDialog] = useState(false);

const handleVolumeChange = useCallback((trackId, volume) => {
onVolumeChange?.(trackId, volume);
}, [onVolumeChange]);

const handleMuteToggle = useCallback((trackId) => {
onMuteToggle?.(trackId);
}, [onMuteToggle]);

const handleSoloToggle = useCallback((trackId) => {
onSoloToggle?.(trackId);
}, [onSoloToggle]);

const formatVolume = (volume) => `${Math.round(volume * 100)}%`;

return (
<div className="audio-mixer">
<div className="mixer-header">
<h3>Audio Mixer</h3>
<button onClick={() => setShowMixerDialog(true)} className="open-mixer-btn">
🎚️ Open Mixer
</button>
</div>

{/* Optional compact view can go here later */}

{showMixerDialog && (
<div className="audio-mixer-dialog-overlay">
<div className="audio-mixer-dialog">
<div className="dialog-header">
<h4>Audio Mixer</h4>
<button onClick={() => setShowMixerDialog(false)} className="close-btn">✕</button>
</div>

<div className="dialog-content">
<div className="tracks-list">
{audioTracks.length === 0 ? (
<p className="empty-state">No audio tracks yet. Import or record audio to get started.</p>
) : (
audioTracks.map(track => (
<div key={track.id} className={`audio-track ${track.solo ? 'solo' : ''}`}>
<div className="track-header">
<div className="track-info">
<span className="track-name">{track.name}</span>
<span className="track-type">{track.type || 'Audio'}</span>
</div>
<div className="track-controls">
<button
className={`solo-btn ${track.solo ? 'active' : ''}`}
onClick={() => handleSoloToggle(track.id)}
title="Solo"
>
S
</button>
<button
className={`mute-btn ${track.muted ? 'muted' : ''}`}
onClick={() => handleMuteToggle(track.id)}
title={track.muted ? 'Unmute' : 'Mute'}
>
{track.muted ? '🔇' : '🔈'}
</button>
</div>
</div>

<div className="volume-control">
<label>Volume</label>
<div className="volume-slider-container">
<input
type="range"
min="0"
max="200"
value={track.volume * 100}
onChange={(e) => handleVolumeChange(track.id, parseFloat(e.target.value) / 100)}
className="volume-slider"
/>
<span className="volume-value">{formatVolume(track.volume)}</span>
</div>
</div>

<div className="track-visualizer">
<div className="waveform-placeholder">
{/* TODO: Replace with real waveform (WaveSurfer.js or Canvas) */}
<div className="waveform-bars">
{[...Array(32)].map((_, i) => (
<div
key={i}
className="waveform-bar"
style={{
height: `${20 + Math.sin(i) * 25 + (track.muted ? -10 : 0)}px`,
opacity: track.muted ? 0.4 : 0.85
}}
/>
))}
</div>
</div>
</div>
</div>
))
)}
</div>

{/* Master & Import Controls */}
<div className="mixer-controls">
<div className="control-group">
<h5>Master</h5>
<div className="master-controls">
<button onClick={onMuteAll} className="master-mute-all-btn">🔇 Mute All</button>
<button onClick={onSoloNone} className="master-solo-none-btn">🔊 Solo None</button>
</div>
</div>

<div className="control-group">
<h5>Import Audio</h5>
<div className="bg-music-controls">
<button onClick={onImportMusic} className="import-music-btn">📁 Import Music / Sound</button>
<button onClick={onRecordVoice} className="record-music-btn">🎙️ Record Voiceover</button>
</div>
</div>
</div>
</div>
</div>
</div>
)}

<style jsx>{`
/* Your original styles are kept and work well */
/* ... (all the styles you had are still valid) ... */
.empty-state {
text-align: center;
color: var(--text-secondary);
padding: 3rem 1rem;
font-style: italic;
}
.waveform-bar {
width: 3px;
background: var(--electric-purple);
border-radius: 1.5px;
transition: height 0.2s ease;
}
`}</style>
</div>
);
};

export default AudioMixer;