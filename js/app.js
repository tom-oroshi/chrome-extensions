if ("serviceworker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceworker
      .register("/serviceworker.js")
      .then((res) => console.log("service worker registered"))
      .cathc((err) => console.log("service worker not registerd", err));
  });
}
