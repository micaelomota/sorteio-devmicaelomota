// https://github.com/firebase/firebase-js-sdk/issues/7584
//@ts-ignore
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAJ8g-StTPg7YsSEOjYHBFNfG95J7wVqY",
  authDomain: "live-micael-01.firebaseapp.com",
  databaseURL: "https://live-micael-01-default-rtdb.firebaseio.com",
  projectId: "live-micael-01",
  storageBucket: "live-micael-01.appspot.com",
  messagingSenderId: "238858151488",
  appId: "1:238858151488:web:7983bd229797773f1521a5",
};

// Initialize Firebase
// @ts-expect-error
export const app = initializeApp(firebaseConfig, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const auth = getAuth(app);
