import { call, put, takeLatest, select } from "redux-saga/effects";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../api/firebase";
import { addPaymentRequest, addPaymentSuccess } from "./paymentSlice";
import { selectUser } from "../auth/authSlice";

function* addPaymentHandler({ payload }) {
  try {
    const user = yield select(selectUser);

    if (!user) throw new Error("Musisz być zalogowana!");

    const paymentData = {
      ...payload,
      userId: user.uid,
      createdAt: serverTimestamp(),
      amount: parseFloat(payload.amount),
    };

    const docRef = yield call(addDoc, collection(db, "payments"), paymentData);

    yield put(
      addPaymentSuccess({
        id: docRef.id,
        ...paymentData,
      }),
    );

    console.log("Płatność zapisana w bazie!");
  } catch (error) {
    console.error("Błąd zapisu:", error);
  }
}

export function* paymentSaga() {
  yield takeLatest(addPaymentRequest.type, addPaymentHandler);
}
