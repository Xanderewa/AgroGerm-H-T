/* ============================================================
   AgroGerm·HT — Service Worker v2.14
   Cachea la app para funcionamiento offline.
   Modo online (Open-Meteo) siempre intenta red primero.
   ============================================================ */

const CACHE_NAME = 'agrogerm-v214';
const ASSETS = [
  './',
  './index.html',
  './manual.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

/* ============ INSTALL: precachear todo ============ */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ============ ACTIVATE: limpiar caches viejos ============ */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

/* ============ FETCH: estrategia según tipo de request ============ */
self.addEventListener('fetch', event => {
  const url = event.request.url;

  /* Open-Meteo (clima real): red primero, cache como fallback */
  if (url.includes('open-meteo.com')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Guardamos una copia por si después no hay internet
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  /* Resto (HTML, CSS, JS, fuentes, imágenes): cache primero, red después */
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          // Cachear recursos externos también (CDN de Tailwind, Chart.js, etc.)
          if (response.status === 200 && event.request.method === 'GET') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, clone);
            });
          }
          return response;
        });
      })
      .catch(() => {
        // Si falla todo y es navegación, devolvemos el index cacheado
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});
