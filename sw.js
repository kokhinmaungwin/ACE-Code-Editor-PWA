const CACHE_NAME = 'ace-editor-pwa-v1';
const OFFLINE_URL = "/ace-pwa/";

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        "/ace-pwa/",
        "/ace-pwa/index.html",
        "/ace-pwa/app.js",
        "/ace-pwa/manifest.json",
        "/ace-pwa/icons/icon-192.svg",
        "/ace-pwa/icons/icon-512.svg",
        "/ace-pwa/icons/icon-192.png",
        "/ace-pwa/icons/icon-512.png",
        "https://cdnjs.cloudflare.com/ajax/libs/ace/1.15.2/ace.js"
      ])
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response => response || caches.match(OFFLINE_URL))
    )
  );
});
