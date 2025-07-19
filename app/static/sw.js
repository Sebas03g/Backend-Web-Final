const CACHE_NAME = 'mi-pwa-v1';
const URLS_TO_CACHE = [
  '/user-dashboard',
  '/contenedores.css',
  '/cuerpo.css',
  '/datosContenedor.css',
  '/ubicacionActual.js',
  '/manifest.json',
  '/setUpPWA.js'
];

// Instalar SW y cachear archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activar SW y limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

// Interceptar peticiones y responder con cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
