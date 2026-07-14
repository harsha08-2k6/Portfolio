const CACHE_NAME = 'shvr-portfolio-cache-v1';

// Install event - pre-cache critical shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const assets = [
        '/',
        '/index.html',
        /* ASSETS_TO_CACHE */
      ];
      // Filter out empty items
      const cleanAssets = assets.filter(asset => asset && typeof asset === 'string' && !asset.startsWith('/*'));
      
      // Cache assets individually to ensure one failed asset doesn't break the entire caching process
      return Promise.all(
        cleanAssets.map((asset) => {
          return cache.add(asset)
            .then(() => console.log('Successfully cached:', asset))
            .catch((err) => console.warn('Failed to cache during install:', asset, err));
        })
      ).then(() => self.skipWaiting());
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('ServiceWorker clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Network-First, fallback to Cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Exclude hot-reload files and WebSocket connections
  if (url.pathname.includes('hot-update') || url.pathname.includes('vite') || url.protocol === 'ws:') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache same-origin assets dynamically as they are successfully fetched
        if (response && response.status === 200 && (response.type === 'basic' || response.type === 'cors')) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed (offline). Try cache.
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If it is a navigation request (like reloading a page), return cached root / index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
          // Fallback response to prevent 'TypeError: Failed to convert value to Response'
          return new Response('Offline resource unavailable', {
            status: 503,
            statusText: 'Offline Resource Unavailable',
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});
