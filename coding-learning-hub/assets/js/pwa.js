(function () {
  if (!("serviceWorker" in navigator) || window.location.protocol === "file:") {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(getServiceWorkerPath()).catch(() => {
      // Service worker bersifat enhancement, jadi gagal registrasi tidak perlu memblokir aplikasi.
    });
  });

  function getServiceWorkerPath() {
    const isHomePage = document.body.dataset.page === "home";
    return isHomePage ? "./service-worker.js" : "../service-worker.js";
  }
})();
