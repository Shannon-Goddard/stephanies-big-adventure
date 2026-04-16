const CACHE = 'sba-v3';

// Cache immediately on install — HTML, CSS, JS, fonts, images
const PRECACHE = [
  './',
  './index.html',
  './setup.html',
  './pee-wee.html',
  './mario.html',
  './map.html',
  './mission.html',
  './maze.html',
  './word-search.html',
  './why-not.html',
  './credits.html',
  './manifest.json',
  './assets/img/apple-touch.png',
  './assets/img/background-image.png',
  './assets/img/background-image-portrait.png',
  './assets/img/forest-background.png',
  './assets/img/forest-background-portraite.png',
  './assets/img/map.png',
  './assets/img/map1.png',
  './assets/img/map2.png',
  './assets/img/map3.png',
  './assets/img/map4.png',
  './assets/img/title.png',
  './assets/img/bike.png',
  './assets/mario/mario-background.png',
  './assets/mario/controller.png',
  './assets/mario/mario-idle-right.png',
  './assets/mario/mario-walk-right-1.png',
  './assets/mario/mario-walk-right-2.png',
  './assets/mario/mario-walk-right-3.png',
  './assets/mario/mario-jump-right-1.png',
  './assets/mario/mario-jump-right-2.png',
  './assets/mario/mario-jump-right-3.png',
  './assets/mario/mario-jump-right-4.png',
  './assets/mario/mario-jump-right-5.png',
  './assets/mario/mario-crouch-right.png',
  './assets/mario/mario-fall-right.png',
  './assets/mario/mario-sit-right.png',
];

// Cache on first play — audio and video (too large to precache)
const LAZY_EXTENSIONS = ['.mp3', '.mp4', '.webm'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isLazy = LAZY_EXTENSIONS.some(ext => url.pathname.endsWith(ext));
  const isImage = url.pathname.startsWith('/assets/img/donkeys') ||
                  url.pathname.startsWith('/assets/img/kittens') ||
                  url.pathname.startsWith('/assets/img/puppies');

  // Animal images — cache on first load, serve from cache after
  if (isImage) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // Audio/video — cache on first play, serve from cache after
  if (isLazy) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // Everything else — cache first, fall back to network
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
