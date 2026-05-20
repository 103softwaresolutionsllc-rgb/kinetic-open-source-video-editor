import React from 'react';

function fmt(seconds) {
  if (seconds == null || Number.isNaN(seconds)) {
    return '0:00.0';
  }

  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(1).padStart(4, '0');

  return `${mins}:${secs}`;
}

export default function TransitionControls({
  clips,
  selectedClip,
  onFadeChange,
}) {
  if (selectedClip == null || !clips[selectedClip]) {
    return (
      <div className="transition-controls empty">
        <p className="muted">
          Select a clip to edit transitions.
        </p>
      </div>
    );
  }

  const clip = clips[selectedClip];

  return (
    <div className="transition-controls">
      <div className="panel-header">
        <h3>Transitions</h3>
      </div>

      <div className="transition-group">
        <label>
          Fade In
          <span className="time-badge">
            {fmt(clip.fadeIn || 0)}
          </span>
        </label>

        <div className="transition-row">
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={clip.fadeIn || 0}
            onChange={(e) =>
              onFadeChange(
                selectedClip,
                'fadeIn',
                Number(e.target.value)
              )
            }
          />

          <input
            type="number"
            min="0"
            max="2"
            step="0.1"
            value={clip.fadeIn || 0}
            onChange={(e) =>
              onFadeChange(
                selectedClip,
                'fadeIn',
                Number(e.target.value)
              )
            }
          />
        </div>
      </div>

      <div className="transition-group">
        <label>
          Fade Out
          <span className="time-badge">
            {fmt(clip.fadeOut || 0)}
          </span>
        </label>

        <div className="transition-row">
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={clip.fadeOut || 0}
            onChange={(e) =>
              onFadeChange(
                selectedClip,
                'fadeOut',
                Number(e.target.value)
              )
            }
          />

          <input
            type="number"
            min="0"
            max="2"
            step="0.1"
            value={clip.fadeOut || 0}
            onChange={(e) =>
              onFadeChange(
                selectedClip,
                'fadeOut',
                Number(e.target.value)
              )
            }
          />
        </div>
      </div>

      <div className="transition-note">
        <small>
          Fade transitions are applied during export
          using FFmpeg fade and afade filters.
        </small>
      </div>
    </div>
  );
}