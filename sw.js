self.cacheName = 'horologium-pwa';

self.cacheKeys = [
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
    '/images/icon-192.png',
    '/images/icon-512.png',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(self.cacheName).then(function (cache) {
            return cache.addAll(self.cacheKeys);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(self.cacheName).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});