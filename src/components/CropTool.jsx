import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';

const CropTool = ({ 
  image, 
  onCropComplete, 
  aspect = 16/9, 
  onClose,
  initialCrop = { x: 0, y: 0 },
  initialZoom = 1
}) => {
  const [crop, setCrop] = useState(initialCrop);
  const [zoom, setZoom] = useState(initialZoom);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom) => {
    setZoom(zoom);
  }, []);

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedArea);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApplyCrop = useCallback(() => {
    if (croppedAreaPixels && onCropComplete) {
      onCropComplete({
        crop,
        zoom,
        croppedArea,
        croppedAreaPixels
      });
    }
    onClose();
  }, [crop, zoom, croppedArea, croppedAreaPixels, onCropComplete, onClose]);

  const handleReset = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedArea(null);
    setCroppedAreaPixels(null);
  }, []);

  return (
    <div className="crop-tool-overlay">
      <div className="crop-tool-modal">
        <div className="crop-tool-header">
          <h3>Crop Video Frame</h3>
          <div className="crop-tool-controls">
            <button onClick={handleReset} className="secondary">
              Reset
            </button>
            <button onClick={onClose} className="secondary">
              Cancel
            </button>
            <button onClick={handleApplyCrop} className="primary">
              Apply Crop
            </button>
          </div>
        </div>
        
        <div className="crop-tool-content">
          <div className="crop-container">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={onCropChange}
              onCropComplete={onCropCompleteCallback}
              onZoomChange={onZoomChange}
              objectFit="contain"
              style={{
                containerStyle: {
                  width: '100%',
                  height: '400px',
                  position: 'relative',
                  backgroundColor: '#0B0E14'
                },
                cropAreaStyle: {
                  border: '2px solid #BF00FF',
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                },
                mediaStyle: {
                  transform: `scale(${zoom}) translate(${crop.x}px, ${crop.y}px)`
                }
              }}
            />
          </div>
          
          <div className="crop-controls-panel">
            <div className="control-group">
              <label>Zoom: {Math.round(zoom * 100)}%</label>
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="zoom-slider"
              />
            </div>
            
            <div className="control-group">
              <label>Aspect Ratio</label>
              <select 
                value={aspect} 
                onChange={(e) => setAspectRatio(Number(e.target.value))}
                className="aspect-select"
              >
                <option value={16/9}>16:9 (Widescreen)</option>
                <option value={4/3}>4:3 (Standard)</option>
                <option value={1}>1:1 (Square)</option>
                <option value={9/16}>9:16 (Vertical)</option>
                <option value={null}>Free</option>
              </select>
            </div>
            
            {croppedAreaPixels && (
              <div className="crop-info">
                <h4>Crop Dimensions</h4>
                <div className="crop-dimensions">
                  <span>Width: {Math.round(croppedAreaPixels.width)}px</span>
                  <span>Height: {Math.round(croppedAreaPixels.height)}px</span>
                  <span>X: {Math.round(croppedAreaPixels.x)}px</span>
                  <span>Y: {Math.round(croppedAreaPixels.y)}px</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .crop-tool-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .crop-tool-modal {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          width: 90%;
          max-width: 900px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .crop-tool-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          background: var(--surface-glass);
        }

        .crop-tool-header h3 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .crop-tool-controls {
          display: flex;
          gap: 0.5rem;
        }

        .crop-tool-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .crop-container {
          flex: 1;
          position: relative;
        }

        .crop-controls-panel {
          width: 300px;
          padding: 1.5rem;
          background: var(--surface-secondary);
          border-left: 1px solid var(--glass-border);
          overflow-y: auto;
        }

        .control-group {
          margin-bottom: 1.5rem;
        }

        .control-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .zoom-slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: var(--glass-border);
          outline: none;
          -webkit-appearance: none;
        }

        .zoom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
          border: 2px solid var(--surface);
        }

        .zoom-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
          border: 2px solid var(--surface);
        }

        .aspect-select {
          width: 100%;
          padding: 0.5rem;
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .crop-info {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 1rem;
        }

        .crop-info h4 {
          margin: 0 0 0.75rem 0;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 600;
        }

        .crop-dimensions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .crop-dimensions span {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }

        button.primary {
          background: var(--electric-purple);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        button.primary:hover {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }

        button.secondary {
          background: var(--surface);
          color: var(--text-secondary);
          border: 1px solid var(--glass-border);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        button.secondary:hover {
          background: var(--surface-hover);
          border-color: var(--electric-purple);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};

export default CropTool;
