const CACHE_NAME = "coding-learning-hub-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./assets/css/main.css",
  "./assets/css/components.css",
  "./assets/css/responsive.css",
  "./assets/js/data.js",
  "./assets/js/progress.js",
  "./assets/js/app.js",
  "./assets/js/quiz.js",
  "./assets/js/playground.js",
  "./assets/js/pwa.js",
  "./pages/html.html",
  "./pages/css.html",
  "./pages/javascript.html",
  "./pages/python.html",
  "./pages/cpp.html",
  "./pages/roadmap.html",
  "./pages/playground.html",
  "./pages/quiz.html",
  "./pages/reference.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => Promise.resolve())
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return Promise.resolve();
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
