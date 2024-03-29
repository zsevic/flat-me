/* eslint-disable no-unused-vars */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    event.notification?.data?.FCM_MSG?.notification?.click_action ||
    "https://www.flat-me.com/app?tab=2";

  event.waitUntil(
    clients.matchAll({ type: "window" }).then(() => clients.openWindow(url))
  );
});

let messaging = null;
try {
  if (typeof importScripts === "function") {
    importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
    importScripts(
      "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
    );

    firebase.initializeApp({
      apiKey: "AIzaSyC-I6PYtZwd9iiBlceEKqzHIPexlT-X4iA",
      authDomain: "flat-me-2b34d.firebaseapp.com",
      projectId: "flat-me-2b34d",
      storageBucket: "flat-me-2b34d.appspot.com",
      messagingSenderId: "238414106033",
      appId: "1:238414106033:web:e38eca44a89cfe3d0ec190",
      measurementId: "G-1F2ED6J80T",
    });

    messaging = firebase.messaging();
  }
} catch (error) {
  console.error("Firebase messaging service worker failed", error);
}
