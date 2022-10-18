const staticCache = "Checkhadith-cache-v10";
const dynamicCache = "Checkhadith-dynamic-v10";
const assets = [
  "/",
  "./index.html",
  "./download.html",
  "./about.html",
  "./privacy.html",
  "./fallback.html",
  "./style.css",
  "./favicon.ico",
  "./images/16x16.webp",
  "./images/32x32.webp",
  "./images/48x48.webp",
  "./images/128x128.webp",
  "./images/64x64.webp",
  "./images/90x90.webp",
  "./images/192x192.webp",
  "./images/256x256.webp",
  "./images/512x512.webp",
  "./images/192x192.webp",
  "https://fonts.googleapis.com/css2?family=Almarai:wght@700&display=swap",
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

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCache).then((cache) => {
      return cache?.addAll(assets);
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
