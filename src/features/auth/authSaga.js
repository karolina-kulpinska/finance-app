import { call, put, takeLatest, fork } from "redux-saga/effects";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, googleProvider } from "../../api/firebase";
import {
  loginRequest,
  loginWithGoogleRequest,
  loginSuccess,
  loginError,
} from "./authSlice";

function* checkRedirectResult() {
  try {
    const result = yield call(getRedirectResult, auth);
    if (result && result.user) {
      yield put(
        loginSuccess({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
        }),
      );
    }
  } catch (error) {
    yield put(loginError(error.message));
  }
}

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
    googleProvider.setCustomParameters({ prompt: "select_account" });
    yield call(signInWithRedirect, auth, googleProvider);
  } catch (error) {
    yield put(loginError(error.message));
  }
}

export function* authSaga() {
  yield fork(checkRedirectResult);
  yield takeLatest(loginRequest.type, loginHandler);
  yield takeLatest(loginWithGoogleRequest.type, loginWithGoogleHandler);
}
