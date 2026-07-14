const CACHE_NAME = 'shvr-portfolio-cache-v1';

// Install event - pre-cache critical shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        // Fallback or placeholder assets can go here
      ]).then(() => self.skipWaiting());
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
  // Only handle GET requests and local/same-origin assets (or safe remote assets)
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // We only want to cache local files, ignore external hot-reloads (like websocket connections)
  if (url.pathname.includes('hot-update') || url.pathname.includes('vite') || url.protocol === 'ws:') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If response is valid, clone it and cache it
        if (response && response.status === 200 && response.type === 'basic') {
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
        });
      })
  );
});
