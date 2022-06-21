const staticDashboard = "chrom-dashboard-looper-v1";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/icons/icon-16x16.png",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDashboard).then((cache) => {
      cache.addAll(assets);
    })
  );
});
