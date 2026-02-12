import { call, put, takeLatest } from "redux-saga/effects";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";
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

    yield put(
      loginSuccess({
        uid: user.uid,
        email: user.email,
      }),
    );

    console.log("Zalogowano pomyślnie!");
  } catch (error) {
    yield put(loginError(error.message));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, loginHandler);
}
