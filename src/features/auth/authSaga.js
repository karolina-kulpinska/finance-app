import { call, put, takeLatest } from "redux-saga/effects";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth, googleProvider } from "../../api/firebase";
import {
  loginRequest,
  loginWithGoogleRequest,
  loginSuccess,
  loginError,
} from "./authSlice";
import { showNotification } from "../notification/notificationSlice";

function* loginHandler({ payload }) {
  try {
    const { email, password, remember } = payload;
    yield call(
      setPersistence,
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence,
    );
    const userCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    yield put(
      loginSuccess({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }),
    );

    yield put(
      showNotification({
        message: "Witaj ponownie! Zalogowano pomyślnie.",
        type: "success",
      }),
    );
  } catch (error) {
    yield put(loginError(error.message));

    let errorMessage = "Wystąpił błąd podczas logowania.";

    if (error.code === "auth/user-not-found") {
      errorMessage = "Nie znaleziono użytkownika z tym adresem e-mail.";
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Nieprawidłowe hasło.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Nieprawidłowy adres e-mail.";
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "Zbyt wiele prób logowania. Spróbuj ponownie później.";
    }

    yield put(
      showNotification({
        message: errorMessage,
        type: "error",
      }),
    );
  }
}

function* loginWithGoogleHandler() {
  try {
    googleProvider.setCustomParameters({ prompt: "select_account" });
    const result = yield call(signInWithPopup, auth, googleProvider);

    if (result && result.user) {
      yield put(
        loginSuccess({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
        }),
      );

      yield put(
        showNotification({
          message: "Zalogowano pomyślnie przez Google!",
          type: "success",
        }),
      );
    }
  } catch (error) {
    const code = error?.code || "";
    console.error("[Google Login] Błąd:", code, error?.message || error);

    if (
      code === "auth/popup-closed-by-user" ||
      code === "auth/cancelled-popup-request"
    ) {
      return;
    }

    yield put(loginError(error.message));

    let errorMessage =
      "Nie udało się zalogować przez Google. Spróbuj ponownie.";

    if (code === "auth/popup-blocked") {
      errorMessage =
        "Okno logowania zostało zablokowane. Zezwól na wyskakujące okna.";
    } else if (code === "auth/network-request-failed") {
      errorMessage = "Brak połączenia z internetem. Sprawdź swoje połączenie.";
    } else if (code === "auth/unauthorized-domain") {
      errorMessage =
        "Domena nie jest autoryzowana. Dodaj smartbudget.pl w Firebase (Authentication → Settings → Authorized domains) i w Google Cloud (OAuth → Authorized JavaScript origins).";
    } else if (code === "auth/operation-not-allowed") {
      errorMessage =
        "Logowanie przez Google nie jest włączone. Włącz w Firebase Console → Authentication → Sign-in method.";
    } else if (code === "auth/internal-error") {
      errorMessage =
        "Błąd po stronie Firebase. Sprawdź OAuth w Google Cloud Console (Authorized JavaScript origins i redirect URIs).";
    }

    yield put(
      showNotification({
        message: errorMessage,
        type: "error",
      }),
    );
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, loginHandler);
  yield takeLatest(loginWithGoogleRequest.type, loginWithGoogleHandler);
}
