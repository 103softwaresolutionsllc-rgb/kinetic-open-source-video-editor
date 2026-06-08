const SW_VERSION = 'kinetic-v1.0.1';
const STATIC_CACHE = `${SW_VERSION}-static`;
const RUNTIME_CACHE = `${SW_VERSION}-runtime`;

const STATIC_FILES = [
  '/site.webmanifest',
  '/fonts/Roboto-Regular.ttf',
  '/assets/kinetic-logo.png',
  '/assets/kinetic-poster-logo.png',
  '/assets/favicon.ico',
  '/assets/favicon-16x16.png',
  '/assets/favicon-32x32.png',
  '/assets/apple-touch-icon.png',
  '/assets/android-chrome-192x192.png',
  '/assets/android-chrome-512x512.png',
];

function isHashedAsset(pathname) {
  return (
    pathname.startsWith('/assets/') ||
    /\.(js|css|mjs|wasm|woff2?|ttf|png|jpe?g|svg|ico|webp|webmanifest)$/i.test(
      pathname
    )
  );
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== STATIC_CACHE && name !== RUNTIME_CACHE)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    if (url.href.includes('@ffmpeg/core-mt')) {
      event.respondWith(
        caches.open(RUNTIME_CACHE).then(async (cache) => {
          const cached = await cache.match(request);
          if (cached) return cached;

          const response = await fetch(request);
          if (response.ok) {
            cache.put(request, response.clone());
          }
          return response;
        })
      );
    }
    return;
  }

  if (isHashedAsset(url.pathname)) {
    event.respondWith(fetch(request));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(async () => {
          const cached = await caches.match('/index.html');
          return cached || new Response('Offline', { status: 503 });
        })
    );
    return;
  }

  if (STATIC_FILES.includes(url.pathname)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        return cached || fetch(request);
      })
    );
    return;
  }

  event.respondWith(
    fetch(request).catch(async () => {
      const cached = await caches.match(request);
      return cached || new Response('Offline', { status: 503 });
    })
  );
});
