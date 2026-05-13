import React, { useState, useCallback } from 'react';

const AudioMixer = ({ 
  audioTracks = [], 
  onVolumeChange, 
  onMuteToggle, 
  onSoloToggle,
  selectedTracks = new Set()
}) => {
  const [showMixerDialog, setShowMixerDialog] = useState(false);

  const handleVolumeChange = useCallback((trackId, volume) => {
    if (onVolumeChange) {
      onVolumeChange(trackId, volume);
    }
  }, [onVolumeChange]);

  const handleMuteToggle = useCallback((trackId) => {
    if (onMuteToggle) {
      onMuteToggle(trackId);
    }
  }, [onMuteToggle]);

  const handleSoloToggle = useCallback((trackId) => {
    if (onSoloToggle) {
      onSoloToggle(trackId);
    }
  }, [onSoloToggle]);

  const formatVolume = (volume) => {
    return `${Math.round(volume * 100)}%`;
  };

  const openMixerDialog = useCallback(() => {
    setShowMixerDialog(true);
  }, []);

  const closeMixerDialog = useCallback(() => {
    setShowMixerDialog(false);
  }, []);

  return (
    <div className="audio-mixer">
      <div className="mixer-header">
        <h3>Audio Mixer</h3>
        <button 
          onClick={openMixerDialog}
          className="open-mixer-btn"
        >
          <span>🎚️</span> Audio Mixer
        </button>
      </div>

      {showMixerDialog && (
        <div className="audio-mixer-dialog-overlay">
          <div className="audio-mixer-dialog">
            <div className="dialog-header">
              <h4>Audio Mixer</h4>
              <button onClick={closeMixerDialog} className="close-btn">
                ✕
              </button>
            </div>

            <div className="dialog-content">
              <div className="tracks-list">
                {audioTracks.map((track, index) => (
                  <div key={track.id} className={`audio-track ${track.solo ? 'solo' : ''}`}>
                    <div className="track-header">
                      <div className="track-info">
                        <span className="track-name">{track.name}</span>
                        <span className="track-type">{track.type}</span>
                      </div>
                      <div className="track-controls">
                        <button
                          className={`solo-btn ${track.solo ? 'active' : ''}`}
                          onClick={() => handleSoloToggle(track.id)}
                          title="Solo track"
                        >
                          🔊
                        </button>
                        <button
                          className={`mute-btn ${track.muted ? 'muted' : ''}`}
                          onClick={() => handleMuteToggle(track.id)}
                          title={track.muted ? 'Unmute track' : 'Mute track'}
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
                          value={track.volume}
                          onChange={(e) => handleVolumeChange(track.id, parseFloat(e.target.value) / 100)}
                          className="volume-slider"
                        />
                        <span className="volume-value">
                          {formatVolume(track.volume)}
                        </span>
                      </div>
                    </div>

                    <div className="track-visualizer">
                      <div className="waveform-placeholder">
                        <div className="waveform-bars">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className="waveform-bar"
                              style={{
                                height: `${Math.random() * 40 + 10}px`,
                                opacity: track.muted ? 0.3 : 0.8
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mixer-controls">
                <div className="control-group">
                  <h5>Master Controls</h5>
                  <div className="master-controls">
                    <button className="master-mute-all-btn">
                      🔇 Mute All
                    </button>
                    <button className="master-solo-none-btn">
                      🔊 Solo None
                    </button>
                  </div>
                </div>

                <div className="control-group">
                  <h5>Background Music</h5>
                  <div className="bg-music-controls">
                    <button className="import-music-btn">
                      📁 Import Music
                    </button>
                    <button className="record-music-btn">
                      🎙️ Record Voice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .audio-mixer {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1rem;
          margin-top: 1rem;
        }

        .mixer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .mixer-header h3 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .open-mixer-btn {
          background: var(--electric-purple);
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .open-mixer-btn:hover {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }

        .audio-mixer-dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .audio-mixer-dialog {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          width: 90%;
          max-width: 700px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .dialog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          background: var(--surface-secondary);
        }

        .dialog-header h4 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          color: var(--text-primary);
          background: var(--surface-hover);
        }

        .dialog-content {
          padding: 1.5rem;
          flex: 1;
          overflow-y: auto;
        }

        .tracks-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .audio-track {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          gap: 1rem;
          transition: all 0.2s ease;
        }

        .audio-track.solo {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
        }

        .track-header {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-width: 0;
        }

        .track-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .track-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .track-type {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .track-controls {
          display: flex;
          gap: 0.5rem;
        }

        .solo-btn, .mute-btn {
          width: 32px;
          height: 32px;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          background: var(--surface);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .solo-btn.active, .mute-btn.muted {
          background: var(--electric-purple);
          color: white;
          border-color: var(--electric-purple);
        }

        .solo-btn:hover, .mute-btn:hover {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
        }

        .volume-control {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 150px;
        }

        .volume-control label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .volume-slider-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .volume-slider {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: var(--glass-border);
          outline: none;
          -webkit-appearance: none;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
        }

        .volume-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
          border: none;
        }

        .volume-value {
          font-family: var(--font-mono);
          color: var(--text-primary);
          font-weight: 500;
          min-width: 45px;
          text-align: center;
        }

        .track-visualizer {
          flex: 1;
          align-items: center;
          justify-content: center;
        }

        .waveform-placeholder {
          width: 100%;
          height: 60px;
          background: var(--surface);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .waveform-bars {
          display: flex;
          align-items: end;
          gap: 2px;
          height: 100%;
        }

        .waveform-bar {
          width: 3px;
          background: var(--electric-purple);
          border-radius: 1.5px;
          transition: height 0.3s ease;
        }

        .mixer-controls {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
        }

        .control-group {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 1rem;
        }

        .control-group h5 {
          margin: 0 0 0.75rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        .master-controls {
          display: flex;
          gap: 0.5rem;
        }

        .master-mute-all-btn, .master-solo-none-btn {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .master-mute-all-btn:hover, .master-solo-none-btn:hover {
          background: var(--electric-purple-alpha);
          border-color: var(--electric-purple);
          color: var(--electric-purple);
        }

        .bg-music-controls {
          display: flex;
          gap: 0.5rem;
        }

        .import-music-btn, .record-music-btn {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .import-music-btn:hover, .record-music-btn:hover {
          background: var(--electric-purple-alpha);
          border-color: var(--electric-purple);
          color: var(--electric-purple);
        }
      `}</style>
    </div>
  );
};

export default AudioMixer;
