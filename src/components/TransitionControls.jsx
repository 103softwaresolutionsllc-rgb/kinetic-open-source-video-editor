import React, { useState, useCallback } from 'react';

const TransitionControls = ({ 
  effectsEngine, 
  selectedClips, 
  onTransitionAdd,
  tracks 
}) => {
  const [transitionType, setTransitionType] = useState('fade');
  const [transitionDuration, setTransitionDuration] = useState(1.0);
  const [showTransitionDialog, setShowTransitionDialog] = useState(false);
  const [fromClip, setFromClip] = useState(null);
  const [toClip, setToClip] = useState(null);

  const transitionTypes = [
    { id: 'fade', name: 'Fade', icon: '🌅' },
    { id: 'dissolve', name: 'Dissolve', icon: '🌊' },
    { id: 'wipe', name: 'Wipe', icon: '📄' },
    { id: 'slide', name: 'Slide', icon: '➡️' }
  ];

  const handleAddTransition = useCallback(() => {
    if (selectedClips.size !== 2) {
      alert('Please select exactly 2 clips to create a transition');
      return;
    }

    // Get selected clips
    const selectedClipIds = Array.from(selectedClips);
    const [clip1Id, clip2Id] = selectedClipIds;
    
    // Parse clip IDs to get track and clip info
    const [track1Id, clip1Num] = clip1Id.split(':').map(Number);
    const [track2Id, clip2Num] = clip2Id.split(':').map(Number);
    
    const track1 = tracks.find(t => t.id === track1Id);
    const track2 = tracks.find(t => t.id === track2Id);
    
    const clip1 = track1?.clips?.find(c => c.id === clip1Num);
    const clip2 = track2?.clips?.find(c => c.id === clip2Num);

    if (!clip1 || !clip2) {
      alert('Could not find selected clips');
      return;
    }

    // Add transition using effects engine
    const transition = effectsEngine.addTransition(
      clip1.id, 
      clip2.id, 
      transitionType, 
      transitionDuration
    );

    if (onTransitionAdd) {
      onTransitionAdd(transition);
    }

    setShowTransitionDialog(false);
    setFromClip(null);
    setToClip(null);
  }, [selectedClips, effectsEngine, onTransitionAdd, transitionType, transitionDuration]);

  const handleClipSelect = useCallback((clip, slot) => {
    if (slot === 'from') {
      setFromClip(clip);
    } else {
      setToClip(clip);
    }
  }, []);

  const handleCancelTransition = useCallback(() => {
    setShowTransitionDialog(false);
    setFromClip(null);
    setToClip(null);
  }, []);

  const openTransitionDialog = useCallback(() => {
    if (selectedClips.size === 2) {
      setShowTransitionDialog(true);
      
      // Auto-select first two clips for from/to
      const selectedClipIds = Array.from(selectedClips);
      const [clip1Id, clip2Id] = selectedClipIds;
      
      const [track1Id, clip1Num] = clip1Id.split(':').map(Number);
      const [track2Id, clip2Num] = clip2Id.split(':').map(Number);
      
      const track1 = tracks.find(t => t.id === track1Id);
      const track2 = tracks.find(t => t.id === track2Id);
      
      const clip1 = track1?.clips?.find(c => c.id === clip1Num);
      const clip2 = track2?.clips?.find(c => c.id === clip2Num);
      
      setFromClip(clip1);
      setToClip(clip2);
    } else {
      alert('Please select exactly 2 clips to add a transition');
    }
  }, [selectedClips, tracks]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = (duration % 60).toFixed(1);
    return `${minutes}:${seconds.padStart(4, '0')}`;
  };

  return (
    <div className="transition-controls">
      <div className="transition-header">
        <h3>Transitions</h3>
        <button 
          onClick={openTransitionDialog}
          disabled={selectedClips.size !== 2}
          className="add-transition-btn"
        >
          <span>➕</span> Add Transition
          <span className="selection-count">
            ({selectedClips.size}/2 clips selected)
          </span>
        </button>
      </div>

      {showTransitionDialog && (
        <div className="transition-dialog-overlay">
          <div className="transition-dialog">
            <div className="dialog-header">
              <h4>Add Transition</h4>
              <button onClick={handleCancelTransition} className="close-btn">
                ✕
              </button>
            </div>

            <div className="dialog-content">
              <div className="transition-selection">
                <label>Transition Type</label>
                <div className="transition-types">
                  {transitionTypes.map(type => (
                    <button
                      key={type.id}
                      className={`transition-type ${transitionType === type.id ? 'selected' : ''}`}
                      onClick={() => setTransitionType(type.id)}
                    >
                      <span className="transition-icon">{type.icon}</span>
                      <span className="transition-name">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="transition-settings">
                <div className="setting-group">
                  <label>From Clip</label>
                  <div className="clip-selector">
                    {fromClip ? (
                      <div className="selected-clip">
                        <span className="clip-name">{fromClip.name}</span>
                        <span className="clip-duration">
                          {formatDuration(fromClip.duration)}
                        </span>
                      </div>
                    ) : (
                      <div className="clip-placeholder">
                        Select clip...
                      </div>
                    )}
                  </div>
                </div>

                <div className="setting-group">
                  <label>To Clip</label>
                  <div className="clip-selector">
                    {toClip ? (
                      <div className="selected-clip">
                        <span className="clip-name">{toClip.name}</span>
                        <span className="clip-duration">
                          {formatDuration(toClip.duration)}
                        </span>
                      </div>
                    ) : (
                      <div className="clip-placeholder">
                        Select clip...
                      </div>
                    )}
                  </div>
                </div>

                <div className="setting-group">
                  <label>Duration</label>
                  <div className="duration-control">
                    <input
                      type="range"
                      min="0.1"
                      max="5.0"
                      step="0.1"
                      value={transitionDuration}
                      onChange={(e) => setTransitionDuration(parseFloat(e.target.value))}
                      className="duration-slider"
                    />
                    <span className="duration-value">
                      {formatDuration(transitionDuration)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="dialog-actions">
                <button onClick={handleCancelTransition} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={handleAddTransition} className="apply-btn">
                  Apply Transition
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .transition-controls {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1rem;
          margin-top: 1rem;
        }

        .transition-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .transition-header h3 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .add-transition-btn {
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

        .add-transition-btn:hover:not(:disabled) {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }

        .add-transition-btn:disabled {
          background: var(--glass-border);
          color: var(--text-disabled);
          cursor: not-allowed;
          transform: none;
        }

        .selection-count {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .transition-dialog-overlay {
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

        .transition-dialog {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          width: 90%;
          max-width: 500px;
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

        .transition-selection {
          margin-bottom: 1.5rem;
        }

        .transition-selection label {
          display: block;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .transition-types {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .transition-type {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .transition-type:hover {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
        }

        .transition-type.selected {
          border-color: var(--electric-purple);
          background: var(--electric-purple);
          color: white;
        }

        .transition-icon {
          font-size: 1.5rem;
        }

        .transition-name {
          font-weight: 500;
        }

        .transition-settings {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .setting-group {
          display: flex;
          flex-direction: column;
        }

        .setting-group label {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .clip-selector {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 0.75rem;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .selected-clip {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .clip-name {
          font-weight: 500;
          color: var(--text-primary);
        }

        .clip-duration {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }

        .clip-placeholder {
          color: var(--text-tertiary);
          font-style: italic;
        }

        .duration-control {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .duration-slider {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: var(--glass-border);
          outline: none;
          -webkit-appearance: none;
        }

        .duration-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
        }

        .duration-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
          border: none;
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

export default TransitionControls;
