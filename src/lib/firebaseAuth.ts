import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyCKrPdfrTof7MER0lqdrDtA07M_E_gIeqw",
  authDomain: "salawaty-f8465.firebaseapp.com",
  projectId: "salawaty-f8465",
  storageBucket: "salawaty-f8465.appspot.com",
  messagingSenderId: "329429310126",
  appId: "1:329429310126:web:76d9868dea929206c86b3f",
};

if (initializeApp(firebaseConfig) !== null) {
  const app = initializeApp(firebaseConfig);
  let auth;
  if (Platform.OS === "web") {
  } else {
    // React Native-specific initialization
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  }
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
