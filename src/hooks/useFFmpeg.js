import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const CORE_VERSION = '0.12.10';
const CORE_MT_BASE = `https://unpkg.com/@ffmpeg/core-mt@${CORE_VERSION}/dist/esm`;

const ffmpegInstance = new FFmpeg();

export function useFFmpeg() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const loadingRef = useRef(false);

  async function load() {
    if (loaded || loadingRef.current) return;
    loadingRef.current = true;

    ffmpegInstance.on('progress', ({ progress: p }) => {
      setProgress(Math.round(p * 100));
    });

    try {
      await ffmpegInstance.load({
        coreURL: await toBlobURL(
          `${CORE_MT_BASE}/ffmpeg-core.js`,
          'text/javascript'
        ),
        wasmURL: await toBlobURL(
          `${CORE_MT_BASE}/ffmpeg-core.wasm`,
          'application/wasm'
        ),
        workerURL: await toBlobURL(
          `${CORE_MT_BASE}/ffmpeg-core.worker.js`,
          'text/javascript'
        ),
      });
      setLoaded(true);
    } finally {
      loadingRef.current = false;
    }
  }

  return { ffmpeg: ffmpegInstance, fetchFile, loaded, progress, load };
}
