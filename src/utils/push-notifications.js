import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig } from "constants/config";
import { setItem, TOKEN_KEY } from "./local-storage";

export const initializeFirebase = () => initializeApp(firebaseConfig);

export const getTokenForPushNotifications = async () => {
  const messaging = getMessaging();
  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  });
  setItem(TOKEN_KEY, token);
  return token;
};
