self.addEventListener("install", event => {
  console.log("🛠️ Service Worker instalado");
  event.waitUntil(
    caches.open("mi-cache").then(cache => {
      return cache.addAll([
        "/",
        "/static/icons/icon-192.png",
        "/static/icons/icon-512.png",
        "/static/manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
