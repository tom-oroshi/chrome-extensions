async function saveOptions() {
  let color = document.getElementById("color").value;
  chrome.storage.sync.set({ color });
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
    args: [color],
  });
}

function setPageBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

function restoreOptions() {
  chrome.storage.sync.get({ color }, function (options) {
    console.log(`current restored color: ${options.color}`);
    document.getElementById("color").value = options.color;
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
