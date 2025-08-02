import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { setLocalStorage } from '../../utils/helper'


const firebaseConfig = {
  apiKey: "AIzaSyAwUpI7qwPY5uRtmaH4Q1Zl2OjkQxrXAuQ",
  authDomain: "property-management-admin.firebaseapp.com",
  projectId: "property-management-admin",
  storageBucket: "property-management-admin.appspot.com",
  messagingSenderId: "180468041458",
  appId: "1:180468041458:web:d8dbf04e6fed75d3b1326b"
};
initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const RequestForToken = async () => {
        try {
            const currentToken = await getToken(messaging, { vapidKey: 'BBT6oivSkAjdG_FI-zqGI3B-TtFrOTwLlowv4fFvaXTJTed7qNKKSC8GQIYbz-lmibDtcNGPisPFOOuN1DqLvPM' });
            if (currentToken) {
                setLocalStorage("FCM", currentToken);
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        } catch (err) {
            console.log('An error occurred while retrieving token. ', err);
        }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});