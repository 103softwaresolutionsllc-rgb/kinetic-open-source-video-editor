import React, { useState } from 'react';

const ExportPresets = ({ onExport, ffmpegLoaded }) => {
  const [selectedPreset, setSelectedPreset] = useState('youtube');
  const [customSettings, setCustomSettings] = useState({
    resolution: '1920x1080',
    bitrate: '2M',
    fps: 30,
    format: 'mp4'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const presets = {
    youtube: {
      name: 'YouTube',
      description: 'Optimized for YouTube uploads',
      resolution: '1920x1080',
      bitrate: '8M',
      fps: 30,
      format: 'mp4'
    },
    instagram: {
      name: 'Instagram',
      description: 'Square format for Instagram posts',
      resolution: '1080x1080',
      bitrate: '5M',
      fps: 30,
      format: 'mp4'
    },
    tiktok: {
      name: 'TikTok',
      description: 'Vertical format for TikTok',
      resolution: '1080x1920',
      bitrate: '4M',
      fps: 30,
      format: 'mp4'
    },
    web: {
      name: 'Web',
      description: 'Optimized for web streaming',
      resolution: '1280x720',
      bitrate: '2M',
      fps: 30,
      format: 'mp4'
    },
    cinema: {
      name: 'Cinema',
      description: 'High quality for cinematic projects',
      resolution: '3840x2160',
      bitrate: '20M',
      fps: 24,
      format: 'mp4'
    },
    custom: {
      name: 'Custom',
      description: 'Configure your own settings',
      resolution: '1920x1080',
      bitrate: '2M',
      fps: 30,
      format: 'mp4'
    }
  };

  const handlePresetChange = (presetName) => {
    setSelectedPreset(presetName);
    if (presetName !== 'custom') {
      setCustomSettings(presets[presetName]);
    }
  };

  const handleExport = async () => {
    if (!ffmpegLoaded) {
      alert('FFmpeg is still loading. Please wait...');
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    try {
      const settings = selectedPreset === 'custom' ? customSettings : presets[selectedPreset];
      
      // Simulate export progress
      const progressInterval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      await onExport(settings);
      
      clearInterval(progressInterval);
      setExportProgress(100);
      
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 1000);
      
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
      setExportProgress(0);
      alert('Export failed: ' + error.message);
    }
  };

  const handleCustomSettingChange = (key, value) => {
    setCustomSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="export-presets">
      <h3>Export Settings</h3>
      
      <div className="preset-grid">
        {Object.entries(presets).map(([key, preset]) => (
          <div
            key={key}
            className={`preset-card ${selectedPreset === key ? 'selected' : ''}`}
            onClick={() => handlePresetChange(key)}
          >
            <h4>{preset.name}</h4>
            <p>{preset.description}</p>
            <div className="preset-specs">
              <span>{preset.resolution}</span>
              <span>{preset.bitrate}</span>
              <span>{preset.fps}fps</span>
            </div>
          </div>
        ))}
      </div>

      {selectedPreset === 'custom' && (
        <div className="custom-settings">
          <h4>Custom Settings</h4>
          <div className="settings-grid">
            <div className="setting-group">
              <label>Resolution</label>
              <select
                value={customSettings.resolution}
                onChange={(e) => handleCustomSettingChange('resolution', e.target.value)}
              >
                <option value="3840x2160">4K (3840x2160)</option>
                <option value="1920x1080">1080p (1920x1080)</option>
                <option value="1280x720">720p (1280x720)</option>
                <option value="854x480">480p (854x480)</option>
                <option value="640x360">360p (640x360)</option>
                <option value="1080x1920">Vertical 1080x1920</option>
                <option value="1080x1080">Square 1080x1080</option>
              </select>
            </div>

            <div className="setting-group">
              <label>Bitrate</label>
              <select
                value={customSettings.bitrate}
                onChange={(e) => handleCustomSettingChange('bitrate', e.target.value)}
              >
                <option value="1M">1 Mbps</option>
                <option value="2M">2 Mbps</option>
                <option value="4M">4 Mbps</option>
                <option value="5M">5 Mbps</option>
                <option value="8M">8 Mbps</option>
                <option value="10M">10 Mbps</option>
                <option value="20M">20 Mbps</option>
              </select>
            </div>

            <div className="setting-group">
              <label>Frame Rate</label>
              <select
                value={customSettings.fps}
                onChange={(e) => handleCustomSettingChange('fps', Number(e.target.value))}
              >
                <option value={24}>24 fps</option>
                <option value={30}>30 fps</option>
                <option value={60}>60 fps</option>
              </select>
            </div>

            <div className="setting-group">
              <label>Format</label>
              <select
                value={customSettings.format}
                onChange={(e) => handleCustomSettingChange('format', e.target.value)}
              >
                <option value="mp4">MP4</option>
                <option value="webm">WebM</option>
                <option value="mov">MOV</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="export-actions">
        <button
          onClick={handleExport}
          disabled={isExporting || !ffmpegLoaded}
          className={`export-button ${isExporting ? 'exporting' : ''}`}
        >
          {isExporting ? `Exporting... ${Math.round(exportProgress)}%` : 'Export Video'}
        </button>
        
        {isExporting && (
          <div className="export-progress">
            <div 
              className="progress-bar" 
              style={{ width: `${exportProgress}%` }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        .export-presets {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          margin-top: 1rem;
        }

        .export-presets h3 {
          margin: 0 0 1.5rem 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .preset-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .preset-card {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .preset-card:hover {
          border-color: var(--electric-purple);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .preset-card.selected {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
          box-shadow: 0 0 0 1px var(--electric-purple);
        }

        .preset-card h4 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 1rem;
        }

        .preset-card p {
          margin: 0 0 0.75rem 0;
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .preset-specs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .preset-specs span {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }

        .custom-settings {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .custom-settings h4 {
          margin: 0 0 1rem 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .setting-group {
          display: flex;
          flex-direction: column;
        }

        .setting-group label {
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .setting-group select {
          padding: 0.5rem;
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .export-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .export-button {
          background: var(--electric-purple);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1rem;
        }

        .export-button:hover:not(:disabled) {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }

        .export-button:disabled {
          background: var(--glass-border);
          color: var(--text-disabled);
          cursor: not-allowed;
          transform: none;
        }

        .export-button.exporting {
          background: var(--electric-purple);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .export-progress {
          width: 100%;
          height: 8px;
          background: var(--surface-secondary);
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--glass-border);
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--electric-purple), var(--electric-purple-hover));
          transition: width 0.3s ease;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default ExportPresets;
