import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

if (!firebaseConfig.apiKey) {
  throw new Error(
    "Brak REACT_APP_FIREBASE_API_KEY. Upewnij się, że plik .env istnieje w katalogu projektu (obok package.json) i zrestartuj serwer (npm start)."
  );
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const functions = getFunctions(app);
export const getSendFamilyInviteEmail = () => httpsCallable(functions, "sendFamilyInviteEmail");
export const getCreateCheckoutSession = () => httpsCallable(functions, "createCheckoutSession");
export const getSyncProPlanAfterPayment = () => httpsCallable(functions, "syncProPlanAfterPayment");
export const getVerifyAndSetProFromStripe = () => httpsCallable(functions, "verifyAndSetProFromStripe");
export const getSetCurrentUserPro = () => httpsCallable(functions, "setCurrentUserPro");
export const getCreateCustomerPortalSession = () => httpsCallable(functions, "createCustomerPortalSession");

export default app;
