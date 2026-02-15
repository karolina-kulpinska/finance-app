import { call, put, takeLatest } from "redux-saga/effects";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../api/firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import {
  registerRequest,
  registerSuccess,
  registerError,
} from "./registrationSlice";
import { loginSuccess } from "./authSlice";
import { showNotification } from "../notification/notificationSlice";

function* registerHandler({ payload }) {
  try {
    const { email, password, displayName, pendingInvite } = payload;
    const userCredential = yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Ustaw displayName jeśli podano
    if (displayName) {
      yield call(updateProfile, user, { displayName });
    }

    // Utwórz dokument użytkownika w Firestore
    const userData = {
      email: user.email,
      displayName: displayName || "",
      createdAt: new Date().toISOString(),
      plan: "free",
    };

    // Jeśli jest zaproszenie do rodziny, dodaj użytkownika
    if (pendingInvite && pendingInvite.familyId) {
      try {
        const familyRef = doc(db, "families", pendingInvite.familyId);
        const familyDoc = yield call(getDoc, familyRef);
        
        if (familyDoc.exists()) {
          // Dodaj użytkownika do członków rodziny
          yield call(updateDoc, familyRef, {
            members: arrayUnion({
              userId: user.uid,
              email: user.email,
              displayName: displayName || user.email.split("@")[0],
              role: "member",
              addedAt: new Date().toISOString(),
              status: "active",
            }),
          });
          
          // Dodaj familyId do dokumentu użytkownika
          userData.familyId = pendingInvite.familyId;
          
          // Wyczyść localStorage
          localStorage.removeItem("pendingFamilyInvite");
        }
      } catch (familyError) {
        console.error("Błąd dołączania do rodziny:", familyError);
        // Kontynuuj rejestrację nawet jeśli dołączanie do rodziny się nie powiodło
      }
    }

    // Zapisz dokument użytkownika
    yield call(setDoc, doc(db, "users", user.uid), userData);

    yield put(registerSuccess());
    yield put(loginSuccess({ 
      uid: user.uid, 
      email: user.email,
      displayName: displayName || user.displayName 
    }));

    const successMessage = pendingInvite 
      ? `Witaj w rodzinie "${pendingInvite.familyName}"! 👨‍👩‍👧‍👦`
      : "Konto zostało utworzone pomyślnie! Witaj w aplikacji.";

    yield put(
      showNotification({
        message: successMessage,
        type: "success",
      }),
    );
  } catch (error) {
    yield put(registerError(error.message));
    
    let errorMessage = "Wystąpił błąd podczas rejestracji.";
    
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Ten adres e-mail jest już używany.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Hasło jest zbyt słabe. Użyj min. 6 znaków.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Nieprawidłowy adres e-mail.";
    }
    
    yield put(
      showNotification({
        message: errorMessage,
        type: "error",
      }),
    );
  }
}

export function* registrationSaga() {
  yield takeLatest(registerRequest.type, registerHandler);
}
