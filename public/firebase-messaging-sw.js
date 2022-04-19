importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyC-I6PYtZwd9iiBlceEKqzHIPexlT-X4iA",
  authDomain: "flat-me-2b34d.firebaseapp.com",
  projectId: "flat-me-2b34d",
  storageBucket: "flat-me-2b34d.appspot.com",
  messagingSenderId: "238414106033",
  appId: "1:238414106033:web:e38eca44a89cfe3d0ec190",
  measurementId: "G-1F2ED6J80T"
});
// eslint-disable-next-line
const messaging = firebase.messaging();