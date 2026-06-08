import React, { useState, useEffect } from 'react';
import { TimelineProvider } from './contexts/TimelineContext.jsx';
import { EditorProvider, useEditor } from './contexts/EditorContext.jsx';
import VideoEditor from './components/VideoEditor.jsx';
import SettingsWheel from './components/SettingsWheel.jsx';
import BrandKit from './components/BrandKit.jsx';

function AppShell() {
  const [theme, setTheme] = useState('dark');
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showBrandKit, setShowBrandKit] = useState(false);
  const { actions, ffmpegLoaded, brandSettings, setBrandSettings } = useEditor();

  useEffect(() => {
    const savedTheme = localStorage.getItem('kinetic-theme') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  function resolveTheme(theme) {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return theme;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', resolveTheme(theme));
  }

  useEffect(() => {
    if (theme !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('system');

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('kinetic-theme', newTheme);
  };

  const closeMenus = () => {
    setShowProjectMenu(false);
    setShowExportMenu(false);
  };

  const handleFFmpegReload = () => {
    actions?.preloadFFmpeg?.();
  };

  const handleBrandKitOpen = () => {
    setShowBrandKit(true);
  };

  const handleBrandKitClose = () => {
    setShowBrandKit(false);
  };

  function startEditing() {
    setShowWelcome(false);
  }

  if (showWelcome) {
    return (
      <TimelineProvider>
        <div className="landing-page">
          <header className="header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img 
                src="/assets/kinetic-logo.png" 
                alt="Kinetic Video Editor" 
                style={{ height: '48px', width: '48px', objectFit: 'contain' }}
              />
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Kinetic</span>
                <div style={{ fontSize: '0.9rem', color: 'var(--muted)', marginTop: '-2px' }}>
                  Professional Video Editor
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                className="primary"
                onClick={startEditing}
                style={{ fontSize: '1.1rem', padding: '12px 24px' }}
              >
                ⚡ Start Editing
              </button>
              
              <button
                className="secondary"
                onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
                title="Toggle theme"
                style={{ fontSize: '1.1rem', padding: '8px 12px' }}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </header>

          <div className="landing-content">
            <div className="hero-section">
              <div className="hero-content">
                <div className="hero-text">
                  <h1 className="hero-title">Your Video. Your Browser. Your Privacy.</h1>
                  <p className="hero-subtitle">
                    Experience <strong>Kinetic</strong>—the browser-based video editor that doesn't compromise on power. 
                    Real-time processing, hardened privacy, and pro-grade simplicity in a stunning Electric Purple interface.
                  </p>
                </div>
                <div className="hero-poster">
                  <img 
                    src="/assets/kinetic-poster-landing-page-copy (2).png" 
                    alt="Kinetic Video Editor - Professional Browser-Based Video Editing"
                    className="hero-image"
                  />
                </div>
              </div>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Real-Time Velocity</h3>
                <p>Don't wait for cloud renders. Kinetic uses your local hardware to process video in real-time.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Hardened Privacy</h3>
                <p>Your footage never leaves your machine. 100% offline-capable once loaded.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Pro-Grade Simplicity</h3>
                <p>No cluttered menus. Just a sharp Electric Purple interface designed for focus and flow.</p>
              </div>
            </div>

            <div className="cta-section">
              <button 
                className="primary cta-button"
                onClick={startEditing}
                style={{ fontSize: '1.2rem', padding: '16px 32px' }}
              >
                🎬 Start Creating Now
              </button>
              <p style={{ marginTop: '16px', color: 'var(--muted)' }}>
                <strong>Zero Footprint:</strong> No uploads • No watermarks • Open source
              </p>
            </div>
          </div>

          <footer style={{ 
            textAlign: 'center', 
            padding: '20px', 
            borderTop: '1px solid var(--border)',
            marginTop: '60px',
            color: 'var(--muted)',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              🔒 <span>Privacy-First Editing</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Kinetic Video Editor</strong> — Open Source • No Watermarks • No Uploads Required
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              Build for content creators by 103 Software Solutions LLC
            </div>
          </footer>
        </div>
      </TimelineProvider>
    );
  }

  return (
    <TimelineProvider>
      <>
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img 
              src="/assets/kinetic-logo.png" 
              alt="Kinetic Video Editor" 
              style={{ height: '36px', width: '36px', objectFit: 'contain' }}
            />
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Kinetic</span>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '-2px' }}>
                Professional Video Editor
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Project Dropdown */}
            <div className="dropdown">
              <button 
                className="secondary"
                onMouseEnter={() => setShowProjectMenu(true)}
                onMouseLeave={() => setShowProjectMenu(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                📁 Project
                <span style={{ fontSize: '0.7rem' }}>▼</span>
              </button>
              {showProjectMenu && (
                <div 
                  className="dropdown-content"
                  onMouseEnter={() => setShowProjectMenu(true)}
                  onMouseLeave={() => setShowProjectMenu(false)}
                >
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); actions?.addVideos?.(); closeMenus(); }}>
                    📹 Add Videos
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); actions?.addAudio?.(); closeMenus(); }}>
                    🎵 Add Audio
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); actions?.saveProject?.(); closeMenus(); }}>
                    💾 Save Project
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); actions?.downloadProject?.(); closeMenus(); }}>
                    📥 Export Project File
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); actions?.importProject?.(); closeMenus(); }}>
                    📂 Import Project File
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); actions?.preloadFFmpeg?.(); closeMenus(); }}>
                    ⚡ Preload FFmpeg
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); if (window.confirm('Clear all clips, text, and brand settings?')) { actions?.clearProject?.(); } closeMenus(); }}>
                    🗑️ Clear Project
                  </a>
                </div>
              )}
            </div>

            {/* Export Dropdown */}
            <div className="dropdown">
              <button 
                className="primary"
                onMouseEnter={() => setShowExportMenu(true)}
                onMouseLeave={() => setShowExportMenu(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                📤 Export
                <span style={{ fontSize: '0.7rem' }}>▼</span>
              </button>
              {showExportMenu && (
                <div 
                  className="dropdown-content"
                  onMouseEnter={() => setShowExportMenu(true)}
                  onMouseLeave={() => setShowExportMenu(false)}
                >
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); actions?.exportVideo?.(); closeMenus(); }}>
                    🎬 Export as MP4
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); actions?.exportAudio?.(); closeMenus(); }}>
                    🎵 Export as MP3
                  </a>
                </div>
              )}
            </div>

            <SettingsWheel
                currentTheme={theme}
                onThemeChange={handleThemeChange}
                onFFmpegReload={handleFFmpegReload}
                onBrandKitOpen={handleBrandKitOpen}
                ffmpegLoaded={ffmpegLoaded}
              />
          </div>
        </header>

        <div className="app-container">
          <div className="content">
            <VideoEditor />
            {showBrandKit && (
              <div className="brand-kit-modal">
                <div className="brand-kit-overlay" onClick={handleBrandKitClose} />
                <div className="brand-kit-content">
                  <button className="close-button" onClick={handleBrandKitClose}>✕</button>
                  <BrandKit
                    initialSettings={brandSettings}
                    onBrandUpdate={setBrandSettings}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer style={{ 
          textAlign: 'center', 
          padding: '20px', 
          borderTop: '1px solid var(--border)',
          marginTop: '40px',
          color: 'var(--muted)',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
            🔒 <span>Privacy-First Editing</span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>Kinetic Video Editor</strong> — Open Source • No Watermarks • No Uploads Required
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            Build for content creators by 103 Software Solutions LLC
          </div>
        </footer>
      </>
    </TimelineProvider>
  );
}

export default function App() {
  return (
    <EditorProvider>
      <AppShell />
    </EditorProvider>
  );
}