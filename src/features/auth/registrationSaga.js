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

    if (displayName) {
      yield call(updateProfile, user, { displayName });
    }

    const userData = {
      email: user.email,
      displayName: displayName || "",
      createdAt: new Date().toISOString(),
      plan: "free",
    };

    if (pendingInvite && pendingInvite.familyId) {
      try {
        const familyRef = doc(db, "families", pendingInvite.familyId);
        const familyDoc = yield call(getDoc, familyRef);
        
        if (familyDoc.exists()) {
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
          
          userData.familyId = pendingInvite.familyId;
          
          localStorage.removeItem("pendingFamilyInvite");
        }
      } catch (familyError) {
      }
    }

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
