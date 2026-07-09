import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZ9rUc7992szFQz_3ddNP-UA21RGsnXxs",
  authDomain: "stock-manager-e92ec.firebaseapp.com",
  projectId: "stock-manager-e92ec",
  storageBucket: "stock-manager-e92ec.firebasestorage.app",
  messagingSenderId: "796637071576",
  appId: "1:796637071576:web:1d7ec93c1892cc45502fad",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;