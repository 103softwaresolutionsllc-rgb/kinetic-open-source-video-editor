import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

export default function MixerWaveform({ url, muted = false }) {
  const containerRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !url) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      height: 52,
      waveColor: muted ? 'rgba(100, 116, 139, 0.45)' : '#0ea5a4',
      progressColor: 'rgba(191, 0, 255, 0.35)',
      interact: false,
      barWidth: 2,
      barGap: 1,
      barRadius: 1,
      normalize: true,
      cursorWidth: 0,
    });

    ws.load(url);
    wsRef.current = ws;

    return () => {
      ws.destroy();
      wsRef.current = null;
    };
  }, [url]);

  useEffect(() => {
    const ws = wsRef.current;
    if (!ws?.setOptions) return;

    ws.setOptions({
      waveColor: muted ? 'rgba(100, 116, 139, 0.45)' : '#0ea5a4',
    });
  }, [muted]);

  if (!url) {
    return (
      <div className="mixer-waveform mixer-waveform-empty">
        <span>No waveform</span>
      </div>
    );
  }

  return (
    <div className={`mixer-waveform ${muted ? 'is-muted' : ''}`}>
      <div ref={containerRef} className="mixer-waveform-inner" />
    </div>
  );
}
