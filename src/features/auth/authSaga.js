import { call, put, takeLatest } from "redux-saga/effects";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../../api/firebase";
import { loginRequest, loginSuccess, loginError } from "./authSlice";

function* loginHandler({ payload }) {
  try {
    const { email, password } = payload;
    const userCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    yield put(loginSuccess({ uid: user.uid, email: user.email }));
  } catch (error) {
    yield put(loginError(error.message));
  }
}

function* loginWithGoogleHandler() {
  try {
    const result = yield call(signInWithPopup, auth, googleProvider);
    const user = result.user;
    yield put(
      loginSuccess({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }),
    );
  } catch (error) {
    yield put(loginError(error.message));
  }
}

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
    yield put(loginSuccess({ uid: user.uid, email: user.email }));
    alert("Konto zostało utworzone pomyślnie!");
  } catch (error) {
    yield put(loginError(error.message));
    alert("Błąd rejestracji: " + error.message);
  }
}
export function* authSaga() {
  yield takeLatest(loginRequest.type, loginHandler);
  yield takeLatest("auth/loginWithGoogleRequest", loginWithGoogleHandler);
  yield takeLatest("auth/registerRequest", registerHandler);
}
