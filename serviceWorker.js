const staticCache = "Checkhadith-cache-v8";
const dynamicCache = "Checkhadith-dynamic-v8";
const assets = [
  "/",
  "./index.html",
  "./download.html",
  "./about.html",
  "./privacy.html",
  "./fallback.html",
  "./style.css",
  "./favicon.ico",
  "./images/16x16.png",
  "./images/32x32.png",
  "./images/48x48.png",
  "./images/128x128.png",
  "./images/64x64.png",
  "./images/90x90.png",
  "./images/192x192.png",
  "./images/256x256.png",
  "./images/512x512.png",
  "./images/monochrome.png",
  "./images/192x192.png",
  "https://code.jquery.com/jquery-3.6.0.min.js",
  "https://fonts.googleapis.com/css2?family=Almarai:wght@700&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/webfonts/fa-brands-400.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css",
];
// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticCache).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then(async (fetchRes) => {
            const cache = await caches.open(dynamicCache);
            cache.put(evt.request.url, fetchRes.clone());
            // check cached items size
            limitCacheSize(dynamicCache, 30);
            return fetchRes;
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("/fallback.html");
        }
      })
  );
});
