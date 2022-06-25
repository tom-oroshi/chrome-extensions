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
