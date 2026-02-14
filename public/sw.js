/* Minimalny Service Worker – PWA Moja Aplikacja Finansowa */
const CACHE_NAME = "panel-finansowy-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  /* Sieć pierwsze, bez offline cache – możesz później dodać cache dla wybranych zasobów */
  event.respondWith(fetch(event.request));
});
