import React, { useState, useCallback } from 'react';
import MixerWaveform from './MixerWaveform.jsx';

export default function AudioMixer({
  audioTracks = [],
  onVolumeChange,
  onMuteToggle,
  onSoloToggle,
  onImportMusic,
  onRecordVoice,
  onMuteAll,
  onSoloNone,
}) {
  const [showMixerDialog, setShowMixerDialog] = useState(false);

  const handleVolumeChange = useCallback(
    (trackId, volume) => {
      onVolumeChange?.(trackId, volume);
    },
    [onVolumeChange]
  );

  const handleMuteToggle = useCallback(
    (trackId) => {
      onMuteToggle?.(trackId);
    },
    [onMuteToggle]
  );

  const handleSoloToggle = useCallback(
    (trackId) => {
      onSoloToggle?.(trackId);
    },
    [onSoloToggle]
  );

  const formatVolume = (volume) => `${Math.round(volume * 100)}%`;

  const trackList = (
    <div className="tracks-list">
      {audioTracks.length === 0 ? (
        <p className="empty-state">
          No audio tracks yet. Import or record audio to get started.
        </p>
      ) : (
        audioTracks.map((track) => (
          <div
            key={track.id}
            className={`audio-track ${track.solo ? 'solo' : ''} ${track.muted ? 'muted' : ''}`}
          >
            <div className="track-header">
              <div className="track-info">
                <span className="track-name">{track.name}</span>
                <span className="track-type">{track.type || 'Audio'}</span>
              </div>
              <div className="track-controls">
                <button
                  type="button"
                  className={`solo-btn ${track.solo ? 'active' : ''}`}
                  onClick={() => handleSoloToggle(track.id)}
                  title="Solo"
                >
                  S
                </button>
                <button
                  type="button"
                  className={`mute-btn ${track.muted ? 'muted' : ''}`}
                  onClick={() => handleMuteToggle(track.id)}
                  title={track.muted ? 'Unmute' : 'Mute'}
                >
                  {track.muted ? '🔇' : '🔈'}
                </button>
              </div>
            </div>

            <MixerWaveform url={track.url} muted={track.muted} />

            <div className="volume-control">
              <label>Volume</label>
              <div className="volume-slider-container">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={track.volume * 100}
                  onChange={(e) =>
                    handleVolumeChange(
                      track.id,
                      parseFloat(e.target.value) / 100
                    )
                  }
                  className="volume-slider"
                />
                <span className="volume-value">
                  {formatVolume(track.volume)}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="audio-mixer">
      <div className="mixer-header">
        <h3>Audio Mixer</h3>
        <button
          type="button"
          onClick={() => setShowMixerDialog(true)}
          className="open-mixer-btn"
        >
          🎚️ Open Mixer
        </button>
      </div>

      {audioTracks.length > 0 && (
        <div className="mixer-compact-preview">
          {audioTracks.slice(0, 3).map((track) => (
            <div key={track.id} className="compact-track">
              <span className="compact-track-name" title={track.name}>
                {track.name}
              </span>
              <MixerWaveform url={track.url} muted={track.muted} />
            </div>
          ))}
          {audioTracks.length > 3 && (
            <p className="muted compact-more">
              +{audioTracks.length - 3} more in full mixer
            </p>
          )}
        </div>
      )}

      {showMixerDialog && (
        <div className="audio-mixer-dialog-overlay">
          <div className="audio-mixer-dialog">
            <div className="dialog-header">
              <h4>Audio Mixer</h4>
              <button
                type="button"
                onClick={() => setShowMixerDialog(false)}
                className="close-btn"
              >
                ✕
              </button>
            </div>

            <div className="dialog-content">
              {trackList}

              <div className="mixer-controls">
                <div className="control-group">
                  <h5>Master</h5>
                  <div className="master-controls">
                    <button
                      type="button"
                      onClick={onMuteAll}
                      className="master-mute-all-btn"
                    >
                      🔇 Mute All
                    </button>
                    <button
                      type="button"
                      onClick={onSoloNone}
                      className="master-solo-none-btn"
                    >
                      🔊 Solo None
                    </button>
                  </div>
                </div>

                <div className="control-group">
                  <h5>Import Audio</h5>
                  <div className="bg-music-controls">
                    <button
                      type="button"
                      onClick={onImportMusic}
                      className="import-music-btn"
                    >
                      📁 Import Music / Sound
                    </button>
                    <button
                      type="button"
                      onClick={onRecordVoice}
                      className="record-music-btn"
                    >
                      🎙️ Record Voiceover
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
