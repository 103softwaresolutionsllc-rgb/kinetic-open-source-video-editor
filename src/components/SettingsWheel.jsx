import React, { useState, useRef, useEffect } from 'react';
import { USER_GUIDE_STEPS } from '../content/userGuide.js';

function GuideTip({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <li>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </li>
  );
}

export default function SettingsWheel({
  currentTheme,
  onThemeChange,
  onFFmpegReload,
  onBrandKitOpen,
  onPrivacyOpen,
  ffmpegLoaded,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [expandedStep, setExpandedStep] = useState('start');
  const wheelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleClickOutside(event) {
      if (wheelRef.current && !wheelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const themeOptions = [
    { value: 'dark', label: '🌙 Dark Mode', description: 'Cyber Midnight theme' },
    { value: 'light', label: '☀️ Light Mode', description: 'Frosted Silver theme' },
    { value: 'system', label: '🖥️ System', description: 'Follow system preference' },
  ];

  const handleThemeChange = (theme) => {
    onThemeChange(theme);
    setIsOpen(false);
  };

  const handleFFmpegReload = () => {
    onFFmpegReload();
    setIsOpen(false);
  };

  const toggleGuide = () => {
    setGuideOpen((open) => {
      if (!open) setExpandedStep('start');
      return !open;
    });
  };

  return (
    <div className="settings-wheel" ref={wheelRef}>
      <button
        className="settings-button"
        onClick={() => setIsOpen((open) => !open)}
        title="Settings"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        ⚙️
        <div className="settings-indicator">
          {ffmpegLoaded && <div className="status-dot active" />}
        </div>
      </button>

      {isOpen && (
        <div
          className={`settings-dropdown ${guideOpen ? 'has-guide' : ''}`}
        >
          <div className="settings-section guide-section">
            <button
              type="button"
              className="guide-toggle"
              onClick={toggleGuide}
              aria-expanded={guideOpen}
            >
              <span className="guide-toggle-label">
                <span className="guide-toggle-icon">📖</span>
                <span>
                  <span className="guide-toggle-title">User&apos;s Guide</span>
                  <span className="guide-toggle-subtitle">
                    Quick start for new editors
                  </span>
                </span>
              </span>
              <span className="guide-toggle-chevron" aria-hidden>
                {guideOpen ? '▲' : '▼'}
              </span>
            </button>

            {guideOpen && (
              <div className="user-guide">
                <p className="guide-intro">
                  New to Kinetic? Follow these steps to go from import to export.
                </p>
                <div className="guide-steps">
                  {USER_GUIDE_STEPS.map((step) => {
                    const isExpanded = expandedStep === step.id;
                    return (
                      <div
                        key={step.id}
                        className={`guide-step ${isExpanded ? 'expanded' : ''}`}
                      >
                        <button
                          type="button"
                          className="guide-step-header"
                          onClick={() =>
                            setExpandedStep(isExpanded ? null : step.id)
                          }
                          aria-expanded={isExpanded}
                        >
                          <span className="guide-step-title">
                            {step.icon} {step.title}
                          </span>
                          <span className="guide-step-summary">{step.summary}</span>
                        </button>
                        {isExpanded && (
                          <ul className="guide-step-tips">
                            {step.tips.map((tip, index) => (
                              <GuideTip key={index} text={tip} />
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="settings-section">
            <h4>🌓 Appearance</h4>
            <div className="theme-options">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
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
            <button type="button" className="engine-option" onClick={handleFFmpegReload}>
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
            <h4>🔒 Privacy</h4>
            <button
              type="button"
              className="brand-option"
              onClick={() => {
                onPrivacyOpen?.();
                setIsOpen(false);
              }}
            >
              <span className="brand-icon">🛡️</span>
              <div className="brand-info">
                <div className="brand-title">Session-only editing</div>
                <div className="brand-description">
                  Videos stay in this tab and are wiped when you leave
                </div>
              </div>
            </button>
          </div>

          <div className="settings-section">
            <h4>🎨 Brand Kit</h4>
            <button
              type="button"
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
