export function isBlobUrl(url) {
  return typeof url === 'string' && url.startsWith('blob:');
}

export function revokeUrl(url) {
  if (!isBlobUrl(url)) return;
  try {
    URL.revokeObjectURL(url);
  } catch {
    // Ignore already-revoked URLs.
  }
}

export function collectMediaUrls(layers = []) {
  const urls = new Set();
  for (const layer of layers) {
    for (const clip of layer.clips ?? []) {
      if (clip?.url) urls.add(clip.url);
    }
  }
  return urls;
}

export function revokeClipMedia(clip, stillUsed) {
  if (!clip?.url) return;
  if (stillUsed?.has(clip.url)) return;
  revokeUrl(clip.url);
}

export function revokeAllLayerMedia(layers = []) {
  for (const url of collectMediaUrls(layers)) {
    revokeUrl(url);
  }
}
