import React, { useState, useCallback } from 'react';

const TextOverlay = ({ 
  onTextAdd, 
  onTextUpdate,
  onTextRemove,
  selectedTexts = new Set()
}) => {
  const [showTextDialog, setShowTextDialog] = useState(false);
  const [textOverlay, setTextOverlay] = useState({
    text: '',
    fontSize: 48,
    fontFamily: 'Arial',
    color: '#FFFFFF',
    position: { x: 50, y: 50 },
    duration: 5,
    startTime: 0
  });

  const fontFamilies = [
    'Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'
  ];

  const fontSizes = [16, 24, 32, 48, 64, 72, 96, 128];

  const colors = [
    '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#FF1493', '#000000'
  ];

  const handleAddText = useCallback(() => {
    const newText = {
      ...textOverlay,
      id: Date.now(),
      name: `Text ${selectedTexts.size + 1}`
    };

    if (onTextAdd) {
      onTextAdd(newText);
    }

    setShowTextDialog(false);
    setTextOverlay({
      text: '',
      fontSize: 48,
      fontFamily: 'Arial',
      color: '#FFFFFF',
      position: { x: 50, y: 50 },
      duration: 5,
      startTime: 0
    });
  }, [onTextAdd, selectedTexts, textOverlay]);

  const handleUpdateText = useCallback((textId, updates) => {
    if (onTextUpdate) {
      onTextUpdate(textId, updates);
    }
  }, [onTextUpdate]);

  const handleRemoveText = useCallback((textId) => {
    if (onTextRemove) {
      onTextRemove(textId);
    }
  }, [onTextRemove]);

  const handleTextDialogSubmit = useCallback(() => {
    if (!textOverlay.text.trim()) {
      alert('Please enter text content');
      return;
    }

    const newText = {
      ...textOverlay,
      id: Date.now(),
      name: `Text ${selectedTexts.size + 1}`
    };

    if (onTextAdd) {
      onTextAdd(newText);
    }

    setShowTextDialog(false);
  }, [onTextAdd, selectedTexts, textOverlay]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-overlay-controls">
      <div className="text-header">
        <h3>Text Overlays</h3>
        <button 
          onClick={() => setShowTextDialog(true)}
          className="add-text-btn"
        >
          <span>📝</span> Add Text Overlay
        </button>
      </div>

      {showTextDialog && (
        <div className="text-dialog-overlay">
          <div className="text-dialog">
            <div className="dialog-header">
              <h4>Add Text Overlay</h4>
              <button onClick={() => setShowTextDialog(false)} className="close-btn">
                ✕
              </button>
            </div>

            <div className="dialog-content">
              <div className="text-input-section">
                <label>Text Content</label>
                <textarea
                  value={textOverlay.text}
                  onChange={(e) => setTextOverlay(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Enter your text here..."
                  className="text-input"
                  rows={3}
                />
              </div>

              <div className="text-properties">
                <div className="property-group">
                  <label>Font Family</label>
                  <select
                    value={textOverlay.fontFamily}
                    onChange={(e) => setTextOverlay(prev => ({ ...prev, fontFamily: e.target.value }))}
                    className="font-select"
                  >
                    {fontFamilies.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                <div className="property-group">
                  <label>Font Size</label>
                  <div className="font-size-control">
                    <input
                      type="range"
                      min="16"
                      max="128"
                      value={textOverlay.fontSize}
                      onChange={(e) => setTextOverlay(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                      className="font-size-slider"
                    />
                    <span className="font-size-value">{textOverlay.fontSize}px</span>
                  </div>
                </div>

                <div className="property-group">
                  <label>Text Color</label>
                  <div className="color-picker">
                    {colors.map(color => (
                      <button
                        key={color}
                        className={`color-option ${textOverlay.color === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setTextOverlay(prev => ({ ...prev, color }))}
                      />
                    ))}
                  </div>
                </div>

                <div className="property-group">
                  <label>Position</label>
                  <div className="position-controls">
                    <div className="position-input">
                      <label>X:</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={textOverlay.position.x}
                        onChange={(e) => setTextOverlay(prev => ({ 
                          ...prev, 
                          position: { ...prev.position, x: parseInt(e.target.value) }
                        }))}
                        className="position-input-field"
                      />
                    </div>
                    <div className="position-input">
                      <label>Y:</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={textOverlay.position.y}
                        onChange={(e) => setTextOverlay(prev => ({ 
                          ...prev, 
                          position: { ...prev.position, y: parseInt(e.target.value) }
                        }))}
                        className="position-input-field"
                      />
                    </div>
                  </div>
                </div>

                <div className="property-group">
                  <label>Duration</label>
                  <div className="duration-control">
                    <input
                      type="number"
                      min="0.5"
                      max="30"
                      step="0.5"
                      value={textOverlay.duration}
                      onChange={(e) => setTextOverlay(prev => ({ ...prev, duration: parseFloat(e.target.value) }))}
                      className="duration-input"
                    />
                    <span className="duration-value">{formatTime(textOverlay.duration)}</span>
                  </div>
                </div>

                <div className="property-group">
                  <label>Start Time</label>
                  <div className="duration-control">
                    <input
                      type="number"
                      min="0"
                      max="300"
                      step="0.5"
                      value={textOverlay.startTime}
                      onChange={(e) => setTextOverlay(prev => ({ ...prev, startTime: parseFloat(e.target.value) }))}
                      className="duration-input"
                    />
                    <span className="duration-value">{formatTime(textOverlay.startTime)}</span>
                  </div>
                </div>
              </div>

              <div className="dialog-actions">
                <button onClick={() => setShowTextDialog(false)} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={handleTextDialogSubmit} className="apply-btn">
                  Add Text Overlay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .text-overlay-controls {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1rem;
          margin-top: 1rem;
        }

        .text-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .text-header h3 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .add-text-btn {
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

        .add-text-btn:hover {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }

        .text-dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .text-dialog {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .dialog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          background: var(--surface-secondary);
        }

        .dialog-header h4 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          color: var(--text-primary);
          background: var(--surface-hover);
        }

        .dialog-content {
          padding: 1.5rem;
          flex: 1;
          overflow-y: auto;
        }

        .text-input-section {
          margin-bottom: 1.5rem;
        }

        .text-input-section label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .text-input {
          width: 100%;
          padding: 0.75rem;
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.9rem;
          resize: vertical;
          min-height: 80px;
        }

        .text-input:focus {
          outline: none;
          border-color: var(--electric-purple);
          box-shadow: 0 0 0 2px var(--electric-purple-alpha);
        }

        .text-properties {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .property-group {
          display: flex;
          flex-direction: column;
        }

        .property-group label {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-weight: 500;
          font-size: 0.9rem;
        }

        .font-select {
          padding: 0.5rem;
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .font-size-control {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .font-size-slider {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: var(--glass-border);
          outline: none;
          -webkit-appearance: none;
        }

        .font-size-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
        }

        .font-size-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
          border: none;
        }

        .font-size-value {
          font-family: var(--font-mono);
          color: var(--text-primary);
          font-weight: 500;
          min-width: 50px;
        }

        .color-picker {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
          gap: 0.5rem;
        }

        .color-option {
          width: 40px;
          height: 40px;
          border: 2px solid var(--glass-border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .color-option:hover {
          border-color: var(--electric-purple);
          transform: scale(1.1);
        }

        .color-option.selected {
          border-color: var(--electric-purple);
          border-width: 3px;
          box-shadow: 0 0 0 2px var(--electric-purple);
        }

        .position-controls {
          display: flex;
          gap: 1rem;
        }

        .position-input {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .position-input label {
          min-width: 20px;
          color: var(--text-secondary);
          font-size: 0.8rem;
        }

        .position-input-field {
          width: 80px;
          padding: 0.5rem;
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .duration-control {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .duration-input {
          width: 80px;
          padding: 0.5rem;
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .duration-value {
          font-family: var(--font-mono);
          color: var(--text-primary);
          font-weight: 500;
          min-width: 60px;
        }

        .dialog-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
        }

        .cancel-btn {
          background: var(--surface);
          color: var(--text-secondary);
          border: 1px solid var(--glass-border);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-btn:hover {
          background: var(--surface-hover);
          border-color: var(--electric-purple);
          color: var(--text-primary);
        }

        .apply-btn {
          background: var(--electric-purple);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .apply-btn:hover {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};

export default TextOverlay;
