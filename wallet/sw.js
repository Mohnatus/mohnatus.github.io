const staticDev = "money-keeper-v8";
const assets = [
  "/",
  "/index.html",
  "/static/css/*.css",
  "/static/css/**/*.css",
  "/static/js/*.js",
  "/static/js/**/*.js",
];

// eslint-disable-next-line
self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDev).then((cache) => {
      cache.addAll(assets);
    })
  );
});
