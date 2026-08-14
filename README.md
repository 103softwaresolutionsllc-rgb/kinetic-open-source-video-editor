# ⚡ Kinetic: The High-Performance Open-Source Video Editor

<img src="public/assets/kinetic-logo.png" width="150" alt="Kinetic Logo">

Kinetic is a browser-based, non-linear video editor (NLE) built for speed, privacy, and precision. By leveraging **FFmpeg.wasm**, Kinetic brings desktop-class processing power directly to your browser without ever uploading your data to a server.

## 🌟 Key Features

*   **Multi-Layer Timeline:** Professional NLE interface with separate video/audio tracks and drag-and-drop functionality.
*   **Audio Extraction & Waveforms:** Extract audio from videos with visual waveform feedback for precise editing.
*   **One-Click Branding:** Add logos and custom colors with Neon Glow effects instantly.
*   **PWA Support:** Install to desktop and work offline with cached FFmpeg processing.
*   **Zero-Footprint Editing:** All processing happens locally. No accounts, no uploads, no leftover projects for the next visitor.
*   **Multi-threaded Processing:** Utilizes all CPU cores for faster video rendering.
*   **Open Source:** Built by the community, for the community.

## 🔒 Session-only privacy

Kinetic is meant to be used in public. Footage never leaves the tab, is not uploaded, and is not restored for the next visitor. Save a `.kinetic.json` file or export MP4/MP3 to keep work on your own computer. Details: [PRIVACY.md](PRIVACY.md).

## 🚀 Quick Start

1. **Install:** Click "Install" to add Kinetic to your desktop for offline access.
2. **Preload:** FFmpeg core loads automatically for instant processing.
3. **Import:** Drag video/audio files onto timeline tracks, or use **Add Videos** / **Add Audio**.
4. **Edit:** Arrange clips on multi-layer timeline, trim with visual waveforms.
5. **Brand:** Add your logo and colors with one-click overlay system.
6. **Export:** Render branded videos as MP4 or extract audio as MP3.

## 🛠️ Technical Stack

| Component | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + Vite | High-speed development and hot reload |
| **State Management** | Timeline Context (useReducer) | Professional timeline state handling |
| **Video Processing** | FFmpeg.wasm (`@ffmpeg/core-mt`) | Multi-threaded WebAssembly processing |
| **Drag & Drop** | `@dnd-kit/core` + `@dnd-kit/sortable` | Professional timeline interactions |
| **Audio Visualization** | WaveSurfer.js | Precise audio waveform display |
| **PWA** | Service Worker + Enhanced Manifest | Offline access and desktop installation |
| **Styling** | CSS Custom Properties | Neon Modular Aesthetic design system |
| **Build Tool** | Vite | Optimized production builds |

## 🎨 Design System

### Color Palette
- **Background:** `#0B0E14` (Deep Charcoal)
- **Primary:** `#BF00FF` (Electric Purple)
- **Accent:** `#00FFD1` (Cyber Teal)
- **Surface:** `#1A1F2E` (Dark Surface)

### UI Integration Examples

```css
/* Active States */
button:hover {
  filter: drop-shadow(0 0 8px #BF00FF);
  border-color: var(--accent);
}

/* Timeline Pulse */
.timeline-item.active {
  border-color: var(--accent);
  box-shadow: 0 0 20px rgba(191, 0, 255, 0.4);
}

/* Loading States */
.progress-bar {
  background: var(--accent-grad);
  animation: shimmer 2s ease-in-out infinite;
}
```

## 📁 Project Structure

```
kinetic-open-source-video-editor/
├── src/
│   ├── components/
│   │   ├── VideoEditor.jsx          # Main editor interface
│   │   ├── MultiLayerTimeline.jsx  # Professional NLE timeline
│   │   ├── TimelineLayer.jsx       # Individual layer rendering
│   │   ├── TimelineClip.jsx        # Clip component with drag & drop
│   │   ├── TimelinePlayhead.jsx    # Interactive playhead
│   │   └── BrandKit.jsx           # One-click branding system
│   ├── contexts/
│   │   └── TimelineContext.jsx    # Timeline state management
│   ├── services/
│   │   └── ProjectStorage.js      # .kinetic.json import/export (no shared autosave)
│   ├── hooks/
│   │   ├── useFFmpeg.js           # FFmpeg.wasm loader (core-mt)
│   │   ├── useSequencePlayback.js # Multi-clip timeline playback
│   │   └── useKeyboardShortcuts.js
│   ├── utils/
│   │   ├── exportBranding.js      # Logo + neon glow export
│   │   ├── exportAudioMix.js      # Audio track mixing
│   │   └── clipThumbnails.js      # Timeline thumbnail generation
│   ├── App.jsx                     # Main application
│   ├── main.jsx                   # Entry point
│   └── styles.css                 # Neon Modular Aesthetic
├── public/
│   ├── assets/
│   │   ├── kinetic-logo.png         # Main branding
│   │   └── kinetic-poster-logo.png
│   ├── sw.js                     # PWA service worker
│   ├── _headers                  # CORS headers for deployment
│   └── robots.txt                # SEO configuration
└── dist/                           # Production build output
```

## 🔧 Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
git clone https://github.com/103softwaresolutionsllc-rgb/kinetic-open-source-video-editor.git
cd kinetic-open-source-video-editor
npm install
```

### Development
```bash
npm run dev    # Start development server
npm run build  # Production build
npm run preview # Preview production build
```

## 🌐 Deployment

Kinetic is designed for zero-config deployment to platforms like:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**

Ensure CORS headers are properly configured for FFmpeg.wasm loading.

## 📱 PWA Features

### Desktop Installation
- Click "Install" in browser to add Kinetic to desktop
- Removes browser address bar for professional feel
- Works offline once FFmpeg core is cached

### Offline Capabilities
- FFmpeg core (~25-30MB) cached for offline processing
- Static assets served from cache
- Background sync for queued operations

### Enhanced Manifest
- App shortcuts for quick access
- Share target integration
- Protocol handlers (`web+kinetic://`)

## 🎨 Branding System

### One-Click Branding
- **Logo Upload:** PNG/JPG support with drag-and-drop
- **Color Presets:** Kinetic Purple, Electric Blue, Neon Green, Cyber Red, Solar Orange
- **Positioning:** 5 options (corners + center)
- **Neon Glow:** Subtle purple-tinted color filter
- **Live Preview:** Real-time branding preview

### FFmpeg Integration
```bash
# Logo overlay
ffmpeg -i video.mp4 -i logo.png -filter_complex "overlay=W-w-10:H-h-10" output.mp4

# Neon glow effect
ffmpeg -i input.mp4 -filter_complex "colorbalance=rs=0.1:gs=-0.2:bs=0.3" output.mp4
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Areas for Contribution
- **UI/UX:** Enhance the Neon Modular Aesthetic
- **Performance:** Optimize FFmpeg processing
- **Features:** Add new video effects and transitions
- **Accessibility:** Improve keyboard navigation and screen reader support

## 📄 License

MIT License — see [LICENSE](LICENSE).

Privacy details: [PRIVACY.md](PRIVACY.md). Contributions: [CONTRIBUTING.md](CONTRIBUTING.md).

## 🙏 Acknowledgments

- **FFmpeg** for the incredible video processing engine
- **WaveSurfer.js** for audio visualization
- **Vite** for the blazing fast build tool
- **React** for the component framework

---

## 🗺️ v1.0 Roadmap

### ✅ Completed (v1.0)
- [x] **Multi-Layer Timeline** — Video and audio tracks with add/remove layer controls
- [x] **Drag-and-Drop** — Clip reordering plus file drop onto timeline tracks
- [x] **Audio Extraction & Waveforms** — MP3 export, mixer waveforms, timeline clip previews
- [x] **One-Click Branding** — Logo overlay and Kinetic Glow (preview + export, with or without logo)
- [x] **PWA / Offline** — Web manifest + registered service worker for cached assets
- [x] **Multi-threaded Processing** — `@ffmpeg/core-mt` for faster encoding
- [x] **Timeline State** — `TimelineContext` with split, duplicate, mute/solo, resize
- [x] **Live Preview Compositor** — Crop, text overlays, brand kit, effect presets
- [x] **Sequential Playback** — Multi-clip timeline playhead with synced audio tracks
- [x] **Advanced Effects** — Fade in/out, color presets, brightness/contrast/saturation
- [x] **Project Save/Load** — `.kinetic.json` import/export to the user’s computer
- [x] **Keyboard Shortcuts** — Space, Ctrl+S/O, Delete, Ctrl+D, S, arrow seek
- [x] **Export System** — MP4/MP3/GIF/WebM with presets, crop, text, and audio mix
- [x] **Clip Thumbnails** — Video frame strips and audio waveform bars on timeline
- [x] **Privacy-First** — Session-only editing; no uploads, accounts, or leftover projects

### 📋 Planned (v1.1)
- [ ] **Real-time Collaboration** - Multi-user editing sessions (opt-in; off by default)
- [ ] **Plugin System** - Extensible effects architecture
- [ ] **Mobile Optimization** - Touch-friendly interface

### 🌟 Community Goals
- [ ] **1000+ GitHub Stars** - Build open-source community
- [ ] **Contributor Docs** - Comprehensive development guides
- [ ] **Video Tutorials** - Hands-on learning resources
- [ ] **Performance Benchmarks** - Browser compatibility matrix

---

*Kinetic is a pet project originally known as datiz4free. We are currently transitioning to a more robust, modular architecture with community-driven development.*
