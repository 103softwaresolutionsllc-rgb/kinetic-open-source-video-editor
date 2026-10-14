import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const CORE_VERSION = '0.12.10';
// Single-threaded core on purpose. The multi-threaded core (@ffmpeg/core-mt)
// was observed deadlocking before the first frame in some browsers — the
// export sat at 0% forever with no error — and it also requires
// SharedArrayBuffer / cross-origin isolation. The single-threaded core is
// slower, but it runs everywhere, including Safari and embedded webviews.
const CORE_BASE = `https://unpkg.com/@ffmpeg/core@${CORE_VERSION}/dist/esm`;

const ffmpegInstance = new FFmpeg();
let listenersAttached = false;

export function useFFmpeg() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const loadingRef = useRef(false);

  async function load() {
    if (loaded || loadingRef.current) return;
    loadingRef.current = true;

    if (!listenersAttached) {
      listenersAttached = true;
      ffmpegInstance.on('progress', ({ progress: p }) => {
        setProgress(Math.round(p * 100));
      });
      ffmpegInstance.on('log', ({ message }) => {
        console.debug('[ffmpeg]', message);
      });
    }

    try {
      await ffmpegInstance.load({
        coreURL: await toBlobURL(
          `${CORE_BASE}/ffmpeg-core.js`,
          'text/javascript'
        ),
        wasmURL: await toBlobURL(
          `${CORE_BASE}/ffmpeg-core.wasm`,
          'application/wasm'
        ),
      });
      setLoaded(true);
    } catch (err) {
      console.error('FFmpeg failed to load:', err);
      throw err;
    } finally {
      loadingRef.current = false;
    }
  }

  // Kill the worker after a stalled encode so the failure can surface and
  // FFmpeg can be loaded fresh for the next attempt.
  function terminate() {
    try {
      ffmpegInstance.terminate();
    } catch {
      // Already terminated — nothing to do.
    }
    setLoaded(false);
    setProgress(0);
  }

  return { ffmpeg: ffmpegInstance, fetchFile, loaded, progress, load, terminate };
}
