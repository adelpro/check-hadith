const staticCache = "Checkhadith-cache-v21",
  dynamicCache = "Checkhadith-dynamic-v21",
  assets = [
    "/",
    "./index.html",
    "./download.html",
    "./about-us.html",
    "./privacy.html",
    "./fallback.html",
    "./style-min.css",
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
    "https://fonts.googleapis.com/css2?family=Almarai:wght@700&display=swap",
  ],
  limitCacheSize = (e, a) => {
    caches.open(e).then((t) => {
      t.keys().then((c) => {
        c.length > a && t.delete(c[0]).then(() => limitCacheSize(e, a));
      });
    });
  };
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCache).then((e) => {
      e && e.addAll(assets);
    })
  );
}),
  self.addEventListener("activate", (e) => {
    e.waitUntil(
      caches
        .keys()
        .then((e) =>
          Promise.all(
            e
              .filter((e) => e !== staticCache && e !== dynamicCache)
              .map((e) => caches.delete(e))
          )
        )
    );
  }),
  self.addEventListener("fetch", (e) => {
    e.respondWith(
      caches
        .match(e.request)
        .then(
          (a) =>
            a ||
            fetch(e.request).then((a) =>
              caches
                .open(dynamicCache)
                .then(
                  (t) => (
                    t.put(e.request.url, a.clone()),
                    limitCacheSize(dynamicCache, 30),
                    a
                  )
                )
            )
        )
        .catch(() => {
          if (e.request.url.indexOf(".html") > -1)
            return caches.match("/fallback.html");
        })
    );
  });
