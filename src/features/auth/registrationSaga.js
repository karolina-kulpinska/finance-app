import { call, put, takeLatest } from "redux-saga/effects";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";
import {
  registerRequest,
  registerSuccess,
  registerError,
} from "./registrationSlice";
import { loginSuccess } from "./authSlice";
import { showNotification } from "../notification/notificationSlice";

function* registerHandler({ payload }) {
  try {
    const { email, password } = payload;
    const userCredential = yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    yield put(registerSuccess());
    yield put(loginSuccess({ uid: user.uid, email: user.email }));

    yield put(
      showNotification({
        message: "Konto zostało utworzone pomyślnie! Witaj w aplikacji.",
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
