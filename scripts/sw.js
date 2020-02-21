var cacheName = 'horologium-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/css/base.css',
  '/css/horo.css',
  '/css/info.css',
  '/css/privacy.css',
  '/css/tabs.css',
  '/js/main.js',
  '/js/horo.js',
  '/js/Horologium.js',
  '/js/MenuBar.js',
  '/js/AdHolder.js',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});