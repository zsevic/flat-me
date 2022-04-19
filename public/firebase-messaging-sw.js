importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
firebase.initializeApp({
  messagingSenderId: "238414106033",
});
// eslint-disable-next-line
const messaging = firebase.messaging();