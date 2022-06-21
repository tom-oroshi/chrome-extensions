const staticDashboard = "chrome-dashboard-looper-v1";
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

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});

checkdashboard();
chrome.storage.onChanged.addListener(storagechanged);
chrome.runtime.onStartup.addListener(checkurls);
// add get-urls

function storagechanged(changes, areaName) {
  if (
    areaName === "managed" &&
    ("url_list" in changes || "loop_interval" in changes)
  ) {
    checkconfig();
  }
}
function checkdashboard() {
  checkconfig((config) => {
    if (config.url_list != "" || config.loop_interval != "") {
      seturls(config.urls);
      setloopinterval(config.loop_interval);
    } else {
      clearsettings();
    }
  });
}
function checkconfig(action) {
  var url_list = [];
  var loop_interval;
  chrome.storage.managed.get(["url_list", "loop_interval"], (data) => {
    if ("url_list" in data) {
      url_list = data.url_list;
    }
    if ("loop_interval" in data) {
      loop_interval = data.loop_interval;
    }
    chrome.storage.local.get(["url_list", "loop_interval"], (datalocal) => {
      action({
        url_list,
        loop_interval,
      });
    });
  });
}

function seturls(url_list) {
  chrome.storage.local.set({
    url_list: url_list,
  });
}

function setloopinterval(interval) {
  chrome.storage.local.set({
    loop_interval: interval,
  });
}
