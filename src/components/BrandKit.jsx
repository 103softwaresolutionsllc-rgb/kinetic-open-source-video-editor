import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BRAND_PREVIEW_POSITIONS } from '../utils/previewCrop.js';

function settingsPayload(logo, brandColor, neonGlow, position) {
  return {
    logo: logo || null,
    brandColor,
    neonGlow,
    position,
  };
}

export default function BrandKit({ initialSettings = null, onBrandUpdate }) {
  const [logo, setLogo] = useState(initialSettings?.logo ?? null);
  const [brandColor, setBrandColor] = useState(
    initialSettings?.brandColor ?? '#BF00FF'
  );
  const [neonGlow, setNeonGlow] = useState(initialSettings?.neonGlow ?? true);
  const [position, setPosition] = useState(
    initialSettings?.position ?? 'bottom-right'
  );
  const [showCustomColor, setShowCustomColor] = useState(false);
  const fileInputRef = useRef(null);

  const pushUpdate = useCallback(
    (next) => {
      onBrandUpdate?.(
        settingsPayload(next.logo, next.brandColor, next.neonGlow, next.position)
      );
    },
    [onBrandUpdate]
  );

  useEffect(() => {
    if (!initialSettings) return;
    setLogo(initialSettings.logo ?? null);
    setBrandColor(initialSettings.brandColor ?? '#BF00FF');
    setNeonGlow(initialSettings.neonGlow ?? true);
    setPosition(initialSettings.position ?? 'bottom-right');
  }, [initialSettings]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const nextLogo = event.target.result;
        setLogo(nextLogo);
        pushUpdate({ logo: nextLogo, brandColor, neonGlow, position });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color) => {
    setBrandColor(color);
    pushUpdate({ logo, brandColor: color, neonGlow, position });
  };

  const handleNeonGlowToggle = () => {
    const nextNeonGlow = !neonGlow;
    setNeonGlow(nextNeonGlow);
    pushUpdate({ logo, brandColor, neonGlow: nextNeonGlow, position });
  };

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
    pushUpdate({ logo, brandColor, neonGlow, position: newPosition });
  };

  const presetColors = [
    { name: 'Kinetic Purple', value: '#BF00FF' },
    { name: 'Electric Blue', value: '#00D4FF' },
    { name: 'Neon Green', value: '#00FF88' },
    { name: 'Cyber Red', value: '#FF006E' },
    { name: 'Solar Orange', value: '#FF6B00' },
    { name: 'Custom', value: 'custom' },
  ];

  const positions = [
    { value: 'top-left', label: '↖ Top Left' },
    { value: 'top-right', label: '↗ Top Right' },
    { value: 'bottom-left', label: '↙ Bottom Left' },
    { value: 'bottom-right', label: '↘ Bottom Right' },
    { value: 'center', label: '⊙ Center' },
  ];

  const isPresetActive = (presetValue) => {
    if (presetValue === 'custom') return showCustomColor;
    return !showCustomColor && brandColor === presetValue;
  };

  return (
    <div className="brand-kit">
      <div className="brand-kit-header">
        <h3>🎨 Brand Kit</h3>
        <p>Add your logo and brand colors to videos</p>
      </div>

      <div className="brand-kit-content">
        <div className="brand-section">
          <label className="brand-label">Logo</label>
          <div className="logo-upload-area">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{ display: 'none' }}
            />

            {logo ? (
              <div className="logo-preview">
                <img src={logo} alt="Brand logo" />
                <button
                  type="button"
                  className="remove-logo-btn"
                  onClick={() => {
                    setLogo(null);
                    pushUpdate({ logo: null, brandColor, neonGlow, position });
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                className="upload-placeholder"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    fileInputRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="upload-icon">📁</div>
                <div className="upload-text">
                  Click to upload logo
                  <br />
                  <small>PNG, JPG recommended</small>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="brand-section">
          <label className="brand-label">Brand Color</label>
          <div className="color-presets">
            {presetColors.map((preset) => (
              <button
                key={preset.value}
                type="button"
                className={`color-preset ${isPresetActive(preset.value) ? 'active' : ''}`}
                style={{
                  backgroundColor:
                    preset.value !== 'custom' ? preset.value : brandColor,
                  border:
                    preset.value === 'custom'
                      ? '2px dashed var(--border)'
                      : 'none',
                }}
                onClick={() => {
                  if (preset.value === 'custom') {
                    setShowCustomColor(true);
                  } else {
                    setShowCustomColor(false);
                    handleColorChange(preset.value);
                  }
                }}
                title={preset.name}
              >
                {preset.value === 'custom' && '+'}
              </button>
            ))}
          </div>
          {showCustomColor && (
            <input
              type="color"
              value={brandColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="custom-color-picker"
            />
          )}
        </div>

        <div className="brand-section">
          <label className="brand-label">Position</label>
          <div className="position-grid">
            {positions.map((pos) => (
              <button
                key={pos.value}
                type="button"
                className={`position-btn ${position === pos.value ? 'active' : ''}`}
                onClick={() => handlePositionChange(pos.value)}
              >
                {pos.label}
              </button>
            ))}
          </div>
        </div>

        <div className="brand-section">
          <label className="brand-label">Effects</label>
          <div className="effect-controls">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={neonGlow}
                onChange={handleNeonGlowToggle}
              />
              <span className="toggle-slider" />
              <span className="toggle-label">Kinetic Glow</span>
            </label>
            <p className="effect-description">
              Apply a subtle purple-tinted color filter matching Kinetic&apos;s
              aesthetic (works in preview even without a logo)
            </p>
          </div>
        </div>

        {logo && (
          <div className="brand-section">
            <label className="brand-label">Preview</label>
            <div className="brand-preview">
              <div className="preview-video">
                <div className="preview-content">
                  <span className="preview-text">Your video preview</span>
                  <div
                    className="preview-logo"
                    style={{
                      ...(BRAND_PREVIEW_POSITIONS[position] ||
                        BRAND_PREVIEW_POSITIONS['bottom-right']),
                      filter: neonGlow
                        ? `drop-shadow(0 0 10px ${brandColor})`
                        : 'none',
                    }}
                  >
                    <img
                      src={logo}
                      alt="Logo preview"
                      style={{ maxWidth: '80px', maxHeight: '40px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
