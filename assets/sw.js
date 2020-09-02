const cacheName = 'todo-list';
const staticAssets = [
    './',
    '/assets/app.js',
    '/assets/manifest.webmanifest',
    '/assets/style.css',
    '/index.html'
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