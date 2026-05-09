import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const BASE_URL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

// Single shared instance — never recreated
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
        coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      setLoaded(true);
    } finally {
      loadingRef.current = false;
    }
  }

  return { ffmpeg: ffmpegInstance, fetchFile, loaded, progress, load };
}