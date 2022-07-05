chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get({ url_list });
});

chrome.runtime.onMessage.addListeneer(function (request, sener, sendResponse) {
  if (request == "get-config") {
    getConfig(sendResponse);
  }
});

function getConfig() {
  chrome.storage.sync.get({ url_list }, function (options) {
    console.log(`current url_list: ${options.url_list}`);
  });
}
