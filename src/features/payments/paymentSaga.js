import { call, put, takeLatest, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../api/firebase";
import {
  addPaymentRequest,
  addPaymentSuccess,
  fetchPaymentsRequest,
  setPayments,
  deletePaymentRequest,
  updatePaymentStatusRequest,
} from "./paymentSlice";
import { selectUser } from "../auth/authSlice";

function createPaymentsChannel(userId) {
  return eventChannel((emitter) => {
    const q = query(collection(db, "payments"), where("userId", "==", userId));
    return onSnapshot(q, (snapshot) => {
      const payments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      emitter(payments);
    });
  });
}

function* fetchPaymentsHandler() {
  const user = yield select(selectUser);
  if (!user) return;

  const channel = yield call(createPaymentsChannel, user.uid);
  try {
    while (true) {
      const payments = yield take(channel);
      yield put(setPayments(payments));
    }
  } finally {
    channel.close();
  }
}

function* addPaymentHandler({ payload }) {
  try {
    const user = yield select(selectUser);
    if (!user) {
      alert("Błąd: Nie jesteś zalogowana!");
      return;
    }

    const paymentData = {
      name: payload.name,
      amount: parseFloat(payload.amount),
      date: payload.date,
      userId: user.uid,
      createdAt: serverTimestamp(),
      paid: false,
    };

    const docRef = yield call(addDoc, collection(db, "payments"), paymentData);
    yield put(addPaymentSuccess({ id: docRef.id, ...paymentData }));
    alert("Sukces! Płatność zapisana w bazie.");
  } catch (error) {
    console.error("Błąd dodawania płatności:", error);
    alert("Błąd: " + error.message);
  }
}

function* deletePaymentHandler({ payload }) {
  try {
    yield call(deleteDoc, doc(db, "payments", payload));
  } catch (error) {
    console.error("Błąd usuwania płatności:", error);
  }
}

function* updateStatusHandler({ payload }) {
  try {
    const paymentRef = doc(db, "payments", payload.id);
    yield call(updateDoc, paymentRef, {
      paid: !payload.currentStatus,
    });
  } catch (error) {
    console.error("Błąd aktualizacji statusu:", error);
  }
}

export function* paymentSaga() {
  yield takeLatest(addPaymentRequest.type, addPaymentHandler);
  yield takeLatest(fetchPaymentsRequest.type, fetchPaymentsHandler);
  yield takeLatest(deletePaymentRequest.type, deletePaymentHandler);
  yield takeLatest(updatePaymentStatusRequest.type, updateStatusHandler);
}
