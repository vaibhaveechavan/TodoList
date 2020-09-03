const cacheName = 'todo-list';
const staticAssets = [
    './',
    './index.html',
    './manifest.webmanifest',
    './sw.js',
    './assets/app.js',
    './assets/style.css',
    './assets/images/icon-512x512.png',
    './assets/css/all.css',
    './assets/webfonts/fonts.css',
    './assets/css/all.min.css',
    './assets/webfonts/swap.woff2',
    './assets/webfonts/fa-solid-900.woff2',
    './assets/webfonts/fa-solid-900.woff',
    './assets/webfonts/fa-solid-900.ttf',
    './assets/webfonts/fa-solid-900.svg',
    './assets/webfonts/fa-solid-900.eot'
];

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', async e => {
    self.clients.claim();
});

self.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);

    if(url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    }else{
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try{
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
    } catch (e){
        const cached = await cache.match(req);
        return cached;
    }
}