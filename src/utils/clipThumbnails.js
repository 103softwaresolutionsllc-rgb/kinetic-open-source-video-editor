const THUMB_MAX_WIDTH = 160;
const THUMB_TIMEOUT_MS = 8000;
const WAVEFORM_BARS = 32;

function placeholderWaveform(barCount = WAVEFORM_BARS) {
  return Array.from({ length: barCount }, (_, i) => {
    const v = 0.25 + 0.55 * Math.abs(Math.sin(i * 0.65 + 0.3));
    return Number(v.toFixed(3));
  });
}

export function captureVideoThumbnail(url, seekTime = 0, maxWidth = THUMB_MAX_WIDTH) {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    let settled = false;

    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      video.onloadeddata = null;
      video.onseeked = null;
      video.onerror = null;
      video.removeAttribute('src');
      video.load();
      resolve(value);
    };

    const timeout = setTimeout(() => finish(null), THUMB_TIMEOUT_MS);

    const drawFrame = () => {
      try {
        const vw = video.videoWidth || maxWidth;
        const vh = video.videoHeight || Math.round(maxWidth * 0.5625);
        const scale = Math.min(1, maxWidth / vw);
        const w = Math.max(1, Math.round(vw * scale));
        const h = Math.max(1, Math.round(vh * scale));

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(video, 0, 0, w, h);
        finish(canvas.toDataURL('image/jpeg', 0.72));
      } catch {
        finish(null);
      }
    };

    video.onloadeddata = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) {
        drawFrame();
        return;
      }

      const t = Math.min(
        Math.max(seekTime, 0),
        Math.max(0, duration - 0.05)
      );

      if (t <= 0.01) {
        drawFrame();
        return;
      }

      video.currentTime = t;
    };

    video.onseeked = drawFrame;
    video.onerror = () => finish(null);
    video.src = url;
  });
}

export async function generateWaveformPreview(url, barCount = WAVEFORM_BARS) {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new AudioContext();

    try {
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const channel = audioBuffer.getChannelData(0);
      const blockSize = Math.max(1, Math.floor(channel.length / barCount));
      const bars = [];

      for (let i = 0; i < barCount; i++) {
        let peak = 0;
        const start = i * blockSize;
        for (let j = 0; j < blockSize; j++) {
          peak = Math.max(peak, Math.abs(channel[start + j] || 0));
        }
        bars.push(peak);
      }

      const max = Math.max(...bars, 0.001);
      return bars.map((v) => Number((v / max).toFixed(3)));
    } finally {
      await audioContext.close();
    }
  } catch {
    return placeholderWaveform(barCount);
  }
}

export async function buildClipPreview(url, type, seekTime = 0) {
  if (type === 'video') {
    const thumbnail = await captureVideoThumbnail(url, seekTime);
    return { thumbnail: thumbnail || null, waveform: null };
  }

  const waveform = await generateWaveformPreview(url);
  return { thumbnail: null, waveform };
}
