// Get URL list
const urlList = [];

chrome.runtime.onInStalled.addListener(() => {
  chrome.storage.local.set({ urlLsit });
  console.log(`URL List loaded: ${urlLsit}`);
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
