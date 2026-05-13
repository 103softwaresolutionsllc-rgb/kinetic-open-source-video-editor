import React, { useState, useCallback } from 'react';

const ExportOptions = ({ 
  onExport, 
  ffmpegLoaded,
  selectedClips = new Set()
}) => {
  const [exportSettings, setExportSettings] = useState({
    format: 'mp4',
    resolution: '1920x1080',
    quality: 'high',
    bitrate: '5M',
    fps: 30,
    gifFps: 10,
    gifDuration: 5
  });

  const handleExport = useCallback(async () => {
    if (!ffmpegLoaded) {
      alert('FFmpeg is still loading. Please wait...');
      return;
    }

    if (onExport) {
      await onExport(exportSettings);
    }
  }, [ffmpegLoaded, onExport, exportSettings]);

  const formatOptions = [
    { value: 'mp4', label: 'MP4', description: 'Standard video format' },
    { value: 'webm', label: 'WebM', description: 'Web optimized format' },
    { value: 'mov', label: 'MOV', description: 'Apple QuickTime format' },
    { value: 'gif', label: 'GIF', description: 'Animated image format' }
  ];

  const resolutionOptions = [
    { value: '3840x2160', label: '4K UHD' },
    { value: '1920x1080', label: '1080p HD' },
    { value: '1280x720', label: '720p HD' },
    { value: '854x480', label: '480p SD' },
    { value: '640x360', label: '360p Web' },
    { value: '1080x1920', label: 'Vertical 1080p' },
    { value: '1080x1080', label: 'Square 1080p' }
  ];

  const qualityOptions = [
    { value: 'high', label: 'High Quality', bitrate: '8M' },
    { value: 'medium', label: 'Medium Quality', bitrate: '5M' },
    { value: 'low', label: 'Low Quality', bitrate: '2M' }
  ];

  const fpsOptions = [24, 30, 60];

  return (
    <div className="export-options">
      <div className="export-header">
        <h3>Export Options</h3>
        <button 
          onClick={handleExport}
          disabled={!ffmpegLoaded}
          className="export-btn"
        >
          <span>📤</span> Export Video
        </button>
      </div>

      <div className="export-settings">
        <div className="setting-group">
          <label>Format</label>
          <div className="format-options">
            {formatOptions.map(format => (
              <button
                key={format.value}
                className={`format-option ${exportSettings.format === format.value ? 'selected' : ''}`}
                onClick={() => setExportSettings(prev => ({ ...prev, format: format.value }))}
              >
                <span className="format-label">{format.label}</span>
                <span className="format-desc">{format.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <label>Resolution</label>
          <select
            value={exportSettings.resolution}
            onChange={(e) => setExportSettings(prev => ({ ...prev, resolution: e.target.value }))}
            className="resolution-select"
          >
            {resolutionOptions.map(res => (
              <option key={res.value} value={res.value}>{res.label}</option>
            ))}
          </select>
        </div>

        {exportSettings.format !== 'gif' && (
          <>
            <div className="setting-group">
              <label>Quality</label>
              <div className="quality-options">
                {qualityOptions.map(quality => (
                  <button
                    key={quality.value}
                    className={`quality-option ${exportSettings.quality === quality.value ? 'selected' : ''}`}
                    onClick={() => setExportSettings(prev => ({ 
                      ...prev, 
                      quality: quality.value, 
                      bitrate: quality.bitrate 
                    }))}
                  >
                    <span className="quality-label">{quality.label}</span>
                    <span className="quality-bitrate">{quality.bitrate}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-group">
              <label>Frame Rate</label>
              <div className="fps-options">
                {fpsOptions.map(fps => (
                  <button
                    key={fps}
                    className={`fps-option ${exportSettings.fps === fps ? 'selected' : ''}`}
                    onClick={() => setExportSettings(prev => ({ ...prev, fps }))}
                  >
                    {fps} fps
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {exportSettings.format === 'gif' && (
          <>
            <div className="setting-group">
              <label>GIF Frame Rate</label>
              <div className="gif-fps-options">
                {[5, 10, 15, 20].map(fps => (
                  <button
                    key={fps}
                    className={`gif-fps-option ${exportSettings.gifFps === fps ? 'selected' : ''}`}
                    onClick={() => setExportSettings(prev => ({ ...prev, gifFps: fps }))}
                  >
                    {fps} fps
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-group">
              <label>GIF Duration</label>
              <input
                type="number"
                min="1"
                max="30"
                value={exportSettings.gifDuration}
                onChange={(e) => setExportSettings(prev => ({ ...prev, gifDuration: parseInt(e.target.value) }))}
                className="gif-duration-input"
              />
              <span className="duration-label">seconds</span>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .export-options {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1rem;
          margin-top: 1rem;
        }

        .export-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .export-header h3 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .export-btn {
          background: var(--electric-purple);
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .export-btn:hover:not(:disabled) {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }

        .export-btn:disabled {
          background: var(--glass-border);
          color: var(--text-disabled);
          cursor: not-allowed;
        }

        .export-settings {
          display: grid;
          gap: 1rem;
        }

        .setting-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .setting-group label {
          color: var(--text-primary);
          font-weight: 500;
          font-size: 0.9rem;
        }

        .format-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 0.5rem;
        }

        .format-option {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .format-option:hover {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
        }

        .format-option.selected {
          border-color: var(--electric-purple);
          background: var(--electric-purple);
          color: white;
        }

        .format-label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .format-desc {
          display: block;
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .resolution-select {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.5rem;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .quality-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.5rem;
        }

        .quality-option {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }

        .quality-option:hover {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
        }

        .quality-option.selected {
          border-color: var(--electric-purple);
          background: var(--electric-purple);
          color: white;
        }

        .quality-label {
          display: block;
          font-weight: 500;
        }

        .quality-bitrate {
          display: block;
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .fps-options, .gif-fps-options {
          display: flex;
          gap: 0.5rem;
        }

        .fps-option, .gif-fps-option {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .fps-option:hover, .gif-fps-option:hover {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
        }

        .fps-option.selected, .gif-fps-option.selected {
          border-color: var(--electric-purple);
          background: var(--electric-purple);
          color: white;
        }

        .gif-duration-input {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.5rem;
          color: var(--text-primary);
          font-size: 0.9rem;
          width: 80px;
        }

        .duration-label {
          color: var(--text-secondary);
          font-size: 0.8rem;
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default ExportOptions;
