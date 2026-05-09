# ⚡ Kinetic: The High-Performance Open-Source Video Editor

![Kinetic Logo]((public/assets/kinetic-logo.png){width=150})

Kinetic is a browser-based, non-linear video editor (NLE) built for speed, privacy, and precision. By leveraging **FFmpeg.wasm**, Kinetic brings desktop-class processing power directly to your browser without ever uploading your data to a server.

## 🌟 Key Features

*   **Multi-Layer Timeline:** Professional NLE interface with separate video/audio tracks and drag-and-drop functionality.
*   **Audio Extraction & Waveforms:** Extract audio from videos with visual waveform feedback for precise editing.
*   **One-Click Branding:** Add logos and custom colors with Neon Glow effects instantly.
*   **PWA Support:** Install to desktop and work offline with cached FFmpeg processing.
*   **Zero-Footprint Editing:** All processing happens locally. No accounts, no uploads, no watermarks.
*   **Multi-threaded Processing:** Utilizes all CPU cores for faster video rendering.
*   **Open Source:** Built by the community, for the community.

## 🚀 Quick Start

1. **Install:** Click "Install" to add Kinetic to your desktop for offline access.
2. **Preload:** FFmpeg core loads automatically for instant processing.
3. **Import:** Drag videos directly onto timeline tracks or use the upload panel.
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
│   │   └── FFmpegService.jsx      # Enhanced FFmpeg operations
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
git clone https://github.com/your-username/kinetic-video-editor.git
cd kinetic-video-editor
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

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FFmpeg** for the incredible video processing engine
- **WaveSurfer.js** for audio visualization
- **Vite** for the blazing fast build tool
- **React** for the component framework

---

## 🗺️ v1.0 Roadmap

### ✅ Completed (v1.0)
- [x] **Multi-Layer Timeline** - Professional NLE with separate video/audio tracks
- [x] **Drag-and-Drop System** - @dnd-kit integration for clip repositioning
- [x] **Audio Extraction & Waveforms** - FFmpeg audio processing with visual feedback
- [x] **One-Click Branding** - Logo overlay with Neon Glow effects
- [x] **PWA Implementation** - Service worker for offline access and desktop installation
- [x] **Multi-threaded Processing** - @ffmpeg/core-mt for performance optimization
- [x] **Timeline State Management** - React Context API for professional workflows
- [x] **Neon Modular Aesthetic** - Cyber Midnight theme with Electric Purple accents
- [x] **Export System** - Branded MP4 and MP3 rendering
- [x] **Privacy-First Architecture** - Zero server uploads with local processing

### 🚧 In Progress
- [ ] **Advanced Effects** - Transitions, filters, and color grading
- [ ] **Multi-track Audio** - Separate audio channels
- [ ] **Keyboard Shortcuts** - Professional editing workflows
- [ ] **Project Saving** - Local project file format

### 📋 Planned (v1.1)
- [ ] **Real-time Collaboration** - Multi-user editing sessions
- [ ] **Plugin System** - Extensible effects architecture
- [ ] **Cloud Storage** - Optional cloud backup (encrypted)
- [ ] **Mobile Optimization** - Touch-friendly interface

### 🌟 Community Goals
- [ ] **1000+ GitHub Stars** - Build open-source community
- [ ] **Contributor Docs** - Comprehensive development guides
- [ ] **Video Tutorials** - Hands-on learning resources
- [ ] **Performance Benchmarks** - Browser compatibility matrix

---

*Kinetic is a pet project originally known as datiz4free. We are currently transitioning to a more robust, modular architecture with community-driven development.*
