import React, { useState, useRef } from 'react';

export default function BrandKit({ onBrandUpdate }) {
  const [logo, setLogo] = useState(null);
  const [brandColor, setBrandColor] = useState('#BF00FF');
  const [neonGlow, setNeonGlow] = useState(true);
  const [position, setPosition] = useState('bottom-right');
  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target.result);
        onBrandUpdate({
          logo: event.target.result,
          brandColor,
          neonGlow,
          position
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color) => {
    setBrandColor(color);
    if (logo) {
      onBrandUpdate({
        logo,
        brandColor: color,
        neonGlow,
        position
      });
    }
  };

  const handleNeonGlowToggle = () => {
    const newNeonGlow = !neonGlow;
    setNeonGlow(newNeonGlow);
    if (logo) {
      onBrandUpdate({
        logo,
        brandColor,
        neonGlow: newNeonGlow,
        position
      });
    }
  };

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
    if (logo) {
      onBrandUpdate({
        logo,
        brandColor,
        neonGlow,
        position: newPosition
      });
    }
  };

  const presetColors = [
    { name: 'Kinetic Purple', value: '#BF00FF' },
    { name: 'Electric Blue', value: '#00D4FF' },
    { name: 'Neon Green', value: '#00FF88' },
    { name: 'Cyber Red', value: '#FF006E' },
    { name: 'Solar Orange', value: '#FF6B00' },
    { name: 'Custom', value: 'custom' }
  ];

  const positions = [
    { value: 'top-left', label: '↖ Top Left' },
    { value: 'top-right', label: '↗ Top Right' },
    { value: 'bottom-left', label: '↙ Bottom Left' },
    { value: 'bottom-right', label: '↘ Bottom Right' },
    { value: 'center', label: '⊙ Center' }
  ];

  return (
    <div className="brand-kit">
      <div className="brand-kit-header">
        <h3>🎨 Brand Kit</h3>
        <p>Add your logo and brand colors to videos</p>
      </div>

      <div className="brand-kit-content">
        {/* Logo Upload */}
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
                  className="remove-logo-btn"
                  onClick={() => {
                    setLogo(null);
                    onBrandUpdate(null);
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div 
                className="upload-placeholder"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-icon">📁</div>
                <div className="upload-text">
                  Click to upload logo<br />
                  <small>PNG, JPG recommended</small>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Brand Color */}
        <div className="brand-section">
          <label className="brand-label">Brand Color</label>
          <div className="color-presets">
            {presetColors.map((preset) => (
              <button
                key={preset.value}
                className={`color-preset ${brandColor === preset.value ? 'active' : ''}`}
                style={{ 
                  backgroundColor: preset.value !== 'custom' ? preset.value : brandColor,
                  border: preset.value === 'custom' ? '2px dashed var(--border)' : 'none'
                }}
                onClick={() => {
                  if (preset.value !== 'custom') {
                    handleColorChange(preset.value);
                  }
                }}
                title={preset.name}
              >
                {preset.value === 'custom' && '+'}
              </button>
            ))}
          </div>
          {brandColor === 'custom' && (
            <input
              type="color"
              value={brandColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="custom-color-picker"
            />
          )}
        </div>

        {/* Position */}
        <div className="brand-section">
          <label className="brand-label">Position</label>
          <div className="position-grid">
            {positions.map((pos) => (
              <button
                key={pos.value}
                className={`position-btn ${position === pos.value ? 'active' : ''}`}
                onClick={() => handlePositionChange(pos.value)}
              >
                {pos.label}
              </button>
            ))}
          </div>
        </div>

        {/* Neon Glow Effect */}
        <div className="brand-section">
          <label className="brand-label">Effects</label>
          <div className="effect-controls">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={neonGlow}
                onChange={handleNeonGlowToggle}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">Kinetic Glow</span>
            </label>
            <p className="effect-description">
              Apply a subtle purple-tinted color filter matching Kinetic's aesthetic
            </p>
          </div>
        </div>

        {/* Preview */}
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
                      [position]: '20px',
                      filter: neonGlow ? `drop-shadow(0 0 10px ${brandColor})` : 'none'
                    }}
                  >
                    <img src={logo} alt="Logo preview" style={{ maxWidth: '80px', maxHeight: '40px' }} />
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
