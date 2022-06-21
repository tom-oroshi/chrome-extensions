if ("serviceworker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceworker
      .register("/serviceworker.js")
      .then((res) => console.log("service worker registered", res))
      .catch((err) => console.log("service worker not registerd", err));
  });
}

var curURLIndex = -1;

function iframeDidLoad() {
  console.log("Done");
}
const dashboardIframe = document.getElementById("dashboardIframe");
setInterval(function () {
  ++curURLIndex;
  if (curURLIndex >= urlList.length) {
    curURLIndex = 0;
  }
  // Change URL every 20s
  dashboardIframe.setAttribute("src", urlList[curURLIndex]);
}, 20000);
