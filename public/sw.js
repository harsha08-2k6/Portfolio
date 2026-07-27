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
            return caches.match('/').then((rootResponse) => {
              if (rootResponse) return rootResponse;
              return caches.match('/index.html').then((indexResponse) => {
                if (indexResponse) return indexResponse;
                
                // Final fallback HTML response if both are missing
                return new Response(
                  `<!DOCTYPE html>
                  <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Offline | Siva Harsha Vardhan Reddy</title>
                    <style>
                      body {
                        font-family: 'Inter', system-ui, -apple-system, sans-serif;
                        background: #0a0a0a;
                        color: #ffffff;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        margin: 0;
                        text-align: center;
                        padding: 20px;
                        box-sizing: border-box;
                      }
                      .container {
                        max-width: 500px;
                        border: 1px solid #222;
                        padding: 40px;
                        border-radius: 12px;
                        background: #111;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                      }
                      .icon {
                        font-size: 48px;
                        margin-bottom: 20px;
                        color: #78ed95;
                      }
                      h1 {
                        font-size: 24px;
                        margin: 0 0 10px 0;
                        letter-spacing: 0.05em;
                        text-transform: uppercase;
                      }
                      p {
                        color: #a0a0a0;
                        font-size: 15px;
                        line-height: 1.6;
                        margin: 0 0 25px 0;
                      }
                      button {
                        background: #78ed95;
                        color: #000;
                        border: none;
                        padding: 12px 24px;
                        font-size: 14px;
                        font-weight: 600;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: background 0.2s;
                      }
                      button:hover {
                        background: #5cdb7b;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="icon">⚡</div>
                      <h1>Offline Mode</h1>
                      <p>You are currently disconnected from the grid. Check your connection or retry once you are back online.</p>
                      <button onclick="window.location.reload()">Retry Connection</button>
                    </div>
                  </body>
                  </html>`,
                  {
                    status: 200,
                    headers: { 'Content-Type': 'text/html' }
                  }
                );
              });
            });
          }
          
          // Fallback response for other assets to prevent TypeError
          return new Response('Offline resource unavailable', {
            status: 503,
            statusText: 'Offline Resource Unavailable',
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});
