const cacheName = 'snake-v1';
const assets = ['./', './index.html', './style.css', './game.js', './logo.png', './grass.png', './eat.mp3', './gameover.mp3', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
