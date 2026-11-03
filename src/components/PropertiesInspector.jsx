import React from 'react';
import { EFFECT_PRESETS, resolveClipGrade } from '../utils/videoEffects.js';

function fmt(seconds) {
  if (seconds == null || !Number.isFinite(seconds)) return null;
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(1).padStart(4, '0');
  return `${mins}:${secs}`;
}

function clipLength(clip) {
  if (Number.isFinite(clip?.end) && Number.isFinite(clip?.start)) {
    return clip.end - clip.start;
  }
  if (Number.isFinite(clip?.duration)) return clip.duration;
  return null;
}

/**
 * Properties inspector (R2): the selected video clip's identity and color
 * grade. Grade values are read through resolveClipGrade — the same unified
 * model the preview compositor and the exporter use — and written through
 * the editor's existing effect-change handler, so what is set here is what
 * renders in both. Fades stay in TransitionControls (bin); text overlays and
 * audio gain keep their own panels.
 */
export default function PropertiesInspector({ clip, onEffectChange }) {
  if (!clip) {
    return (
      <aside className="properties-inspector" aria-label="Properties">
        <h3>Properties</h3>
        <p className="muted">
          Select a video clip in the bin or timeline to edit its properties.
        </p>
      </aside>
    );
  }

  const grade = resolveClipGrade(clip);
  const length = fmt(clipLength(clip));

  return (
    <aside className="properties-inspector" aria-label="Properties">
      <h3>Properties</h3>
      <div className="inspector-clip-name" title={clip.name || ''}>
        🎬 {clip.name || 'Untitled clip'}
      </div>
      {length && (
        <div className="inspector-row">
          <span>Length</span>
          <span className="time-badge">{length}</span>
        </div>
      )}

      <div className="inspector-group">
        <label htmlFor="inspector-effect-preset">Effect Preset</label>
        <select
          id="inspector-effect-preset"
          value={grade.preset}
          onChange={(e) => onEffectChange(clip.id, 'effectPreset', e.target.value)}
        >
          {EFFECT_PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>

      <div className="inspector-group">
        <label>
          Brightness
          <span className="time-badge">{grade.brightness.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="-0.5"
          max="0.5"
          step="0.05"
          value={grade.brightness}
          onChange={(e) =>
            onEffectChange(clip.id, 'brightness', Number(e.target.value))
          }
        />
      </div>

      <div className="inspector-group">
        <label>
          Contrast
          <span className="time-badge">{grade.contrast.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.05"
          value={grade.contrast}
          onChange={(e) =>
            onEffectChange(clip.id, 'contrast', Number(e.target.value))
          }
        />
      </div>

      <div className="inspector-group">
        <label>
          Saturation
          <span className="time-badge">{grade.saturation.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={grade.saturation}
          onChange={(e) =>
            onEffectChange(clip.id, 'saturation', Number(e.target.value))
          }
        />
      </div>

      <div className="inspector-note">
        <small>
          Grades use the unified grade model — the preview and the export
          render exactly what is set here.
        </small>
      </div>
    </aside>
  );
}
