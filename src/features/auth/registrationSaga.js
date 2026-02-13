import { call, put, takeLatest } from "redux-saga/effects";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";
import {
  registerRequest,
  registerSuccess,
  registerError,
} from "./registrationSlice";
import { loginSuccess } from "./authSlice";

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
    alert("Konto zostało utworzone pomyślnie!");
  } catch (error) {
    yield put(registerError(error.message));
    alert("Błąd rejestracji: " + error.message);
  }
}

export function* registrationSaga() {
  yield takeLatest(registerRequest.type, registerHandler);
}
