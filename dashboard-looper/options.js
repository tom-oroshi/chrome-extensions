const input_url = document.getElementById("inputUrl");
const set = document.getElementById("set");
const reset = document.getElementById("reset");

function saveUrlEntry(event) {
  event.preventDefault();
  const value = input_url.value.trim();
  if (!value) {
    console.log("no value detected");
    return;
  }
  try {
    console.log(`setting value: ${value}`);
    chrome.storage.local.set({ url_list: value });
  } catch (err) {
    console.log(err);
  }
}

set.addEventListener("click", (event) => {
  saveUrlEntry(event);
});

reset.addEventListener("click", resetUrls);
input_url.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    saveUrlEntry(event);
  }
});

function resetUrls() {
  chrome.storage.sync.set({ url_list: [] });
}
