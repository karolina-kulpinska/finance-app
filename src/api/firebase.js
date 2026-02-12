import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB78AyeCpSqedgoCd1puxgn_vQTNeF3fc0",
  authDomain: "myfinanceapp-e2a0c.firebaseapp.com",
  projectId: "myfinanceapp-e2a0c",
  storageBucket: "myfinanceapp-e2a0c.firebasestorage.app",
  messagingSenderId: "1029791390659",
  appId: "1:1029791390659:web:b32ab0c10f5aefc1c6fb76",
  measurementId: "G-D2LM8D2G4P",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
