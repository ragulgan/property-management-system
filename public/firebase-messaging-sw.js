importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");


const firebaseConfig = {
    apiKey: "AIzaSyAwUpI7qwPY5uRtmaH4Q1Zl2OjkQxrXAuQ",
    authDomain: "property-management-admin.firebaseapp.com",
    projectId: "property-management-admin",
    storageBucket: "property-management-admin.appspot.com",
    messagingSenderId: "180468041458",
    appId: "1:180468041458:web:d8dbf04e6fed75d3b1326b",
    measurementId: "G-MD9JGN9CFB"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
