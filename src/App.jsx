import React, { useState, useEffect } from 'react';
import { TimelineProvider } from './contexts/TimelineContext.jsx';
import { EditorProvider, useEditor } from './contexts/EditorContext.jsx';
import VideoEditor from './components/VideoEditor.jsx';
import SettingsWheel from './components/SettingsWheel.jsx';
import BrandKit from './components/BrandKit.jsx';
import HeaderMenu from './components/HeaderMenu.jsx';
import PrivacyDialog from './components/PrivacyDialog.jsx';
import { installZeroFootprintGuards } from './services/sessionPrivacy.js';
import { PRIVACY_SUMMARY } from './content/privacyCopy.js';

const GITHUB_URL =
  'https://github.com/103softwaresolutionsllc-rgb/kinetic-open-source-video-editor';

function AppShell() {
  const [theme, setTheme] = useState('dark');
  const [openMenu, setOpenMenu] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showBrandKit, setShowBrandKit] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const { actions, ffmpegLoaded, brandSettings, setBrandSettings } = useEditor();

  useEffect(() => {
    return installZeroFootprintGuards();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('kinetic-theme') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  function resolveTheme(themeName) {
    if (themeName === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return themeName;
  }

  function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', resolveTheme(themeName));
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

  const closeMenus = () => setOpenMenu(null);

  const handleFFmpegReload = () => {
    actions?.preloadFFmpeg?.();
  };

  const handleBrandKitOpen = () => {
    setShowBrandKit(true);
    closeMenus();
  };

  const handleBrandKitClose = () => {
    setShowBrandKit(false);
  };

  function startEditing() {
    setShowWelcome(false);
  }

  const siteFooter = (
    <footer className="site-footer">
      <div className="site-footer-lock">🔒 <span>Privacy-first editing</span></div>
      <p>Open source • No watermarks • No uploads</p>
      <p className="site-footer-note">{PRIVACY_SUMMARY}</p>
      <div className="site-footer-links">
        <button type="button" className="link-button" onClick={() => setShowPrivacy(true)}>
          Privacy
        </button>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noreferrer">
          MIT License
        </a>
      </div>
      <p className="site-footer-legal">
        &copy; 2026 Kinetic Professional Video Editor. All Rights Reserved.
      </p>
      <p className="site-footer-credit">
        A product of 103 Software Solutions LLC. Built with ❤️ for content creators.
      </p>
    </footer>
  );

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
                    Experience <strong>Kinetic</strong>—the browser-based video editor that
                    doesn&apos;t compromise on power. Real-time processing, session-only
                    privacy, and pro-grade simplicity in a stunning Electric Purple interface.
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
                <p>Don&apos;t wait for cloud renders. Kinetic uses your local hardware to process video in real-time.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Leave Nothing Behind</h3>
                <p>
                  Footage never leaves this tab. When you close Kinetic, the next person using
                  this browser cannot see, restore, or play your clips.
                </p>
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
                <strong>Zero Footprint:</strong> No uploads • No accounts • No leftover projects
              </p>
            </div>
          </div>

          {siteFooter}
          <PrivacyDialog open={showPrivacy} onClose={() => setShowPrivacy(false)} />
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

          <div className="header-actions">
            <HeaderMenu
              id="project-menu"
              label="📁 Project"
              variant="secondary"
              open={openMenu === 'project'}
              onOpenChange={(next) => setOpenMenu(next ? 'project' : null)}
            >
              {(close) => (
                <>
                  <button type="button" role="menuitem" className="header-menu-item" onClick={() => { actions?.addVideos?.(); close(); }}>
                    📹 Add Videos
                  </button>
                  <button type="button" role="menuitem" className="header-menu-item" onClick={() => { actions?.addAudio?.(); close(); }}>
                    🎵 Add Audio
                  </button>
                  <button type="button" role="menuitem" className="header-menu-item" onClick={() => { actions?.saveProject?.(); close(); }}>
                    💾 Save Project File
                  </button>
                  <button type="button" role="menuitem" className="header-menu-item" onClick={() => { actions?.importProject?.(); close(); }}>
                    📂 Open Project File
                  </button>
                  <button type="button" role="menuitem" className="header-menu-item" onClick={() => { actions?.preloadFFmpeg?.(); close(); }}>
                    ⚡ Preload FFmpeg
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="header-menu-item header-menu-item-danger"
                    onClick={() => {
                      if (window.confirm('Clear this session? Clips, text, and brand settings will be erased from this tab.')) {
                        actions?.clearProject?.();
                      }
                      close();
                    }}
                  >
                    🗑️ Clear Session
                  </button>
                </>
              )}
            </HeaderMenu>

            <HeaderMenu
              id="export-menu"
              label="📤 Export"
              variant="primary"
              open={openMenu === 'export'}
              onOpenChange={(next) => setOpenMenu(next ? 'export' : null)}
            >
              {(close) => (
                <>
                  <button type="button" role="menuitem" className="header-menu-item" onClick={() => { actions?.exportVideo?.(); close(); }}>
                    🎬 Export as MP4
                  </button>
                  <button type="button" role="menuitem" className="header-menu-item" onClick={() => { actions?.exportAudio?.(); close(); }}>
                    🎵 Export as MP3
                  </button>
                </>
              )}
            </HeaderMenu>

            <SettingsWheel
              currentTheme={theme}
              onThemeChange={handleThemeChange}
              onFFmpegReload={handleFFmpegReload}
              onBrandKitOpen={handleBrandKitOpen}
              onPrivacyOpen={() => {
                setShowPrivacy(true);
                closeMenus();
              }}
              ffmpegLoaded={ffmpegLoaded}
            />
          </div>
        </header>

        <p className="session-privacy-banner">{PRIVACY_SUMMARY}</p>

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

        {siteFooter}
        <PrivacyDialog open={showPrivacy} onClose={() => setShowPrivacy(false)} />
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
