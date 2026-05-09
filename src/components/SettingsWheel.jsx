import React, { useState, useRef, useEffect } from 'react';

export default function SettingsWheel({ 
  currentTheme, 
  onThemeChange, 
  onFFmpegReload,
  onBrandKitOpen,
  ffmpegLoaded 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wheelRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions = [
    { value: 'dark', label: '🌙 Dark Mode', description: 'Cyber Midnight theme' },
    { value: 'light', label: '☀️ Light Mode', description: 'Frosted Silver theme' },
    { value: 'system', label: '🖥️ System', description: 'Follow system preference' }
  ];

  const handleThemeChange = (theme) => {
    onThemeChange(theme);
    setIsOpen(false);
  };

  const handleFFmpegReload = () => {
    onFFmpegReload();
    setIsOpen(false);
  };

  return (
    <div className="settings-wheel" ref={wheelRef}>
      <button 
        className="settings-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Settings"
      >
        ⚙️
        <div className="settings-indicator">
          {ffmpegLoaded && <div className="status-dot active" />}
        </div>
      </button>

      {isOpen && (
        <div className="settings-dropdown" ref={dropdownRef}>
          <div className="settings-section">
            <h4>🌓 Appearance</h4>
            <div className="theme-options">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  className={`theme-option ${currentTheme === option.value ? 'active' : ''}`}
                  onClick={() => handleThemeChange(option.value)}
                >
                  <span className="theme-label">{option.label}</span>
                  <span className="theme-description">{option.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h4>⚡ Engine Config</h4>
            <button 
              className="engine-option"
              onClick={handleFFmpegReload}
            >
              <span className="engine-icon">🔄</span>
              <div className="engine-info">
                <div className="engine-title">Reinitialize FFmpeg</div>
                <div className="engine-status">
                  Status: {ffmpegLoaded ? '✅ Loaded' : '⏳ Loading'}
                </div>
              </div>
            </button>
          </div>

          <div className="settings-section">
            <h4>🎨 Brand Kit</h4>
            <button 
              className="brand-option"
              onClick={() => {
                onBrandKitOpen();
                setIsOpen(false);
              }}
            >
              <span className="brand-icon">🎨</span>
              <div className="brand-info">
                <div className="brand-title">Open Brand Kit</div>
                <div className="brand-description">Add logos and custom colors</div>
              </div>
            </button>
          </div>

          <div className="settings-footer">
            <div className="app-info">
              <strong>Kinetic v1.0.0</strong>
              <div className="app-status">High-Performance Video Editor</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
