const DB_NAME = 'kinetic-editor';
const DB_VERSION = 1;
const AUTOSAVE_KEY = 'autosave';
const PROJECT_VERSION = 1;
// Public sessions must not leave footage in IndexedDB for the next visitor.
const ALLOW_BROWSER_MEDIA_PERSISTENCE = false;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('projects')) {
        db.createObjectStore('projects');
      }
      if (!db.objectStoreNames.contains('media')) {
        db.createObjectStore('media');
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function stripClipForSave(clip) {
  const { file, url, ...rest } = clip;
  return rest;
}

function collectClips(layers) {
  return layers.flatMap((layer) =>
    layer.clips.map((clip) => ({ layerId: layer.id, clip }))
  );
}

export function buildProjectPayload({ layers, textOverlays, brandSettings }) {
  return {
    version: PROJECT_VERSION,
    savedAt: new Date().toISOString(),
    timeline: {
      layers: layers.map((layer) => ({
        ...layer,
        clips: layer.clips.map(stripClipForSave),
      })),
    },
    textOverlays: textOverlays ?? [],
    brandSettings: brandSettings ?? null,
  };
}

async function storeMediaBlobs(db, layers) {
  const tx = db.transaction('media', 'readwrite');
  const store = tx.objectStore('media');

  for (const { clip } of collectClips(layers)) {
    if (clip.file) {
      await new Promise((resolve, reject) => {
        const req = store.put(
          {
            blob: clip.file,
            name: clip.file.name,
            type: clip.file.type,
          },
          clip.id
        );
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    }
  }

  await new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function hydrateLayers(db, layers) {
  const tx = db.transaction('media', 'readonly');
  const store = tx.objectStore('media');

  const hydrated = [];

  for (const layer of layers) {
    const clips = [];

    for (const clip of layer.clips) {
      const record = await new Promise((resolve, reject) => {
        const req = store.get(clip.id);
        req.onsuccess = () => resolve(req.result ?? null);
        req.onerror = () => reject(req.error);
      });

      if (record?.blob) {
        const file = new File([record.blob], record.name, { type: record.type });
        const url = URL.createObjectURL(file);
        clips.push({ ...clip, file, url });
      } else {
        clips.push(clip);
      }
    }

    hydrated.push({ ...layer, clips });
  }

  return hydrated;
}

export async function saveProjectToStorage({ layers, textOverlays, brandSettings }) {
  if (!ALLOW_BROWSER_MEDIA_PERSISTENCE) return;

  const db = await openDB();
  const payload = buildProjectPayload({ layers, textOverlays, brandSettings });

  await storeMediaBlobs(db, layers);

  await new Promise((resolve, reject) => {
    const tx = db.transaction('projects', 'readwrite');
    const store = tx.objectStore('projects');
    const req = store.put(payload, AUTOSAVE_KEY);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => db.close();
  });
}

export async function loadProjectFromStorage() {
  if (!ALLOW_BROWSER_MEDIA_PERSISTENCE) return null;

  const db = await openDB();

  const payload = await new Promise((resolve, reject) => {
    const tx = db.transaction('projects', 'readonly');
    const store = tx.objectStore('projects');
    const req = store.get(AUTOSAVE_KEY);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });

  if (!payload?.timeline?.layers) {
    db.close();
    return null;
  }

  const layers = await hydrateLayers(db, payload.timeline.layers);
  db.close();

  return {
    layers,
    textOverlays: payload.textOverlays ?? [],
    brandSettings: payload.brandSettings ?? null,
    savedAt: payload.savedAt,
  };
}

export async function clearProjectStorage() {
  const db = await openDB();

  await new Promise((resolve, reject) => {
    const tx = db.transaction(['projects', 'media'], 'readwrite');
    tx.objectStore('projects').clear();
    tx.objectStore('media').clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });

  db.close();
}

export function deleteEditorDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    request.onblocked = () => resolve();
  });
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function base64ToBlob(base64, mimeType) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}

export async function exportProjectFile({ layers, textOverlays, brandSettings }) {
  const payload = buildProjectPayload({ layers, textOverlays, brandSettings });
  const media = [];

  for (const { clip } of collectClips(layers)) {
    if (clip.file) {
      media.push({
        clipId: clip.id,
        name: clip.file.name,
        type: clip.file.type,
        data: await blobToBase64(clip.file),
      });
    }
  }

  const bundle = { ...payload, media };
  const json = JSON.stringify(bundle);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `kinetic-project-${Date.now()}.kinetic.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function importProjectFile(file) {
  const text = await file.text();
  const bundle = JSON.parse(text);

  if (!bundle?.timeline?.layers) {
    throw new Error('Invalid Kinetic project file.');
  }

  const mediaMap = new Map(
    (bundle.media ?? []).map((m) => [m.clipId, m])
  );

  const layers = bundle.timeline.layers.map((layer) => ({
    ...layer,
    clips: layer.clips.map((clip) => {
      const entry = mediaMap.get(clip.id);
      if (!entry) return clip;

      const blob = base64ToBlob(entry.data, entry.type);
      const mediaFile = new File([blob], entry.name, { type: entry.type });
      const url = URL.createObjectURL(mediaFile);

      return { ...clip, file: mediaFile, url };
    }),
  }));

  return {
    layers,
    textOverlays: bundle.textOverlays ?? [],
    brandSettings: bundle.brandSettings ?? null,
    savedAt: bundle.savedAt,
  };
}
