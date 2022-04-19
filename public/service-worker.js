function main(workbox) {
  const {
    cacheableResponse: { CacheableResponsePlugin },
    core: { clientsClaim },
    expiration: { ExpirationPlugin },
    precaching: { cleanupOutdatedCaches },
    routing: { registerRoute },
    strategies: { NetworkFirst },
  } = workbox;

  clientsClaim();

  self.skipWaiting();

  cleanupOutdatedCaches();

  registerRoute(
    ({ request }) => request.mode === "navigate",
    new NetworkFirst({
      cacheName: "pages",
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  registerRoute(
    ({ request }) => ["script", "style"].includes(request.destination),
    new NetworkFirst({
      cacheName: "static-resources",
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  registerRoute(
    ({ request }) => request.destination === "image",
    new NetworkFirst({
      cacheName: "images",
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  registerRoute(
    ({ url }) =>
      url.origin === self.location.origin &&
      url.pathname.startsWith("/_next/static/"),
    new NetworkFirst({
      cacheName: "static-caches",
    })
  );
}

if (typeof importScripts === "function") {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js"
  );

  if (workbox) {
    main(workbox);
  }
}
