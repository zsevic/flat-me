export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js", {
          scope: "/app",
        })
        .then(() => console.log("Service worker is registered!"))
        .catch(() => console.error("Service worker registration failed"));
    });
  }
};
