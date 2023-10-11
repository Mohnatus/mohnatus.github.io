const staticDev = "dev-coffee-site-v1";
const assets = [
  "/",
  "/index.html",
  "/static/css/*.css",
  "/static/css/**/*.css",
  "/static/js/*.js",
  "/static/js/**/*.js",
  "*.png",
];

// eslint-disable-next-line
self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDev).then((cache) => {
      cache.addAll(assets);
    })
  );
});
