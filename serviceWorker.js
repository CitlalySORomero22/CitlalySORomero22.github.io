const staticCurriculum = "curriculum-site-v1"
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/images/foto.jpg",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticCurriculum).then(cache => {
            cache.addAll(assets)
        })
    )
})


self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        }).catch(() => caches.match("/pages/fallback.html"))
    );
});

self.addEventListener("activate", activateEvent => {
    activateEvent.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCurriculum)
                .map(key => caches.delete(key))
            )
        })
    )
})

self.addEventListener('push', function(event) {
    console.log('Push message received', event);
    var title = 'Push message';
    
    event.waitUntil(
        self.registration.showNotification(title, {
        body: 'The Message',
        icon: 'images/icons/icon-192x192.png',
        tag: 'my-tag'
    }));
});



