import { FirebaseApp, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2Gd22vfoUkyEgT8LngFe3axtEGXChSBE",
  authDomain: "ventas-promo.firebaseapp.com",
  projectId: "ventas-promo",
  storageBucket: "ventas-promo.appspot.com",
  messagingSenderId: "570195258237",
  appId: "1:570195258237:web:3b2c2fb40cd8c8b2a57a14",
  measurementId: "G-HHPJXSY8PJ",
  databaseURL: "https://ventas-promo-default-rtdb.firebaseio.com/",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
