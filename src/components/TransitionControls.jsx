import React from 'react';
import { EFFECT_PRESETS } from '../utils/videoEffects.js';

function fmt(seconds) {
  if (seconds == null || Number.isNaN(seconds)) {
    return '0:00.0';
  }

  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(1).padStart(4, '0');

  return `${mins}:${secs}`;
}

export default function TransitionControls({
  selectedClipId,
  clip,
  onFadeChange,
  onEffectChange,
}) {
  if (!selectedClipId || !clip) {
    return (
      <div className="transition-controls empty">
        <p className="muted">Select a video clip to edit transitions and effects.</p>
      </div>
    );
  }

  return (
    <div className="transition-controls">
      <div className="panel-header">
        <h3>Transitions &amp; Effects</h3>
      </div>

      <div className="transition-group">
        <label>
          Fade In
          <span className="time-badge">{fmt(clip.fadeIn || 0)}</span>
        </label>

        <div className="transition-row">
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={clip.fadeIn || 0}
            onChange={(e) =>
              onFadeChange(selectedClipId, 'fadeIn', Number(e.target.value))
            }
          />

          <input
            type="number"
            min="0"
            max="2"
            step="0.1"
            value={clip.fadeIn || 0}
            onChange={(e) =>
              onFadeChange(selectedClipId, 'fadeIn', Number(e.target.value))
            }
          />
        </div>
      </div>

      <div className="transition-group">
        <label>
          Fade Out
          <span className="time-badge">{fmt(clip.fadeOut || 0)}</span>
        </label>

        <div className="transition-row">
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={clip.fadeOut || 0}
            onChange={(e) =>
              onFadeChange(selectedClipId, 'fadeOut', Number(e.target.value))
            }
          />

          <input
            type="number"
            min="0"
            max="2"
            step="0.1"
            value={clip.fadeOut || 0}
            onChange={(e) =>
              onFadeChange(selectedClipId, 'fadeOut', Number(e.target.value))
            }
          />
        </div>
      </div>

      <div className="transition-group">
        <label htmlFor="effect-preset">Effect Preset</label>
        <select
          id="effect-preset"
          value={clip.effectPreset || 'none'}
          onChange={(e) =>
            onEffectChange(selectedClipId, 'effectPreset', e.target.value)
          }
        >
          {EFFECT_PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>

      <div className="transition-group">
        <label>
          Brightness
          <span className="time-badge">
            {(clip.brightness ?? 0).toFixed(2)}
          </span>
        </label>
        <input
          type="range"
          min="-0.5"
          max="0.5"
          step="0.05"
          value={clip.brightness ?? 0}
          onChange={(e) =>
            onEffectChange(selectedClipId, 'brightness', Number(e.target.value))
          }
        />
      </div>

      <div className="transition-group">
        <label>
          Contrast
          <span className="time-badge">{(clip.contrast ?? 1).toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.05"
          value={clip.contrast ?? 1}
          onChange={(e) =>
            onEffectChange(selectedClipId, 'contrast', Number(e.target.value))
          }
        />
      </div>

      <div className="transition-group">
        <label>
          Saturation
          <span className="time-badge">
            {(clip.saturation ?? 1).toFixed(2)}
          </span>
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={clip.saturation ?? 1}
          onChange={(e) =>
            onEffectChange(selectedClipId, 'saturation', Number(e.target.value))
          }
        />
      </div>

      <div className="transition-note">
        <small>
          Fades and effects are applied during export via FFmpeg filters. Preset
          effects show in the live preview.
        </small>
      </div>
    </div>
  );
}
