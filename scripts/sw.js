var cacheName = 'horologium-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/styles/base.css',
  '/styles/main.css',
  '/styles/info.css',
  '/styles/privacy.css',
  '/styles/tabs.css',
  '/scripts/main.js',
  '/scripts/Horologium.js',
  '/scripts/MenuBar.js',
  '/scripts/AdHolder.js',
  '/images/background.jpg',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', event => {
    // delete any caches that aren't in expectedCaches
    // which will get rid of static-v1
    event.waitUntil(
      caches.keys().then(keys => Promise.all(
        keys.map(key => {
          if (!filesToCache.includes(key)) {
            return caches.delete(key);
          }
        })
      )).then(() => {
        console.log('V2 now ready to handle fetches!');
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