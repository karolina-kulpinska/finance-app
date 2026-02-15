import { call, put, takeLatest } from "redux-saga/effects";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getCurrentUserSubscriptions, getCurrentUserPayments } from "@invertase/firestore-stripe-payments";
import { db } from "../../api/firebase";
import stripePayments from "../../api/stripePayments";
import {
  fetchSubscriptionRequest,
  setPlan,
  fetchSubscriptionError,
} from "./subscriptionSlice";

function* fetchSubscriptionHandler({ payload }) {
  const uid = payload?.uid;
  if (!uid) {
    yield put(setPlan("free"));
    return;
  }

  try {
    // Rozszerzenie Stripe: aktywna subskrypcja lub udana płatność = Pro
    try {
      const subs = yield call(getCurrentUserSubscriptions, stripePayments, { status: "active" });
      const payments = yield call(getCurrentUserPayments, stripePayments, { status: "succeeded" });
      if ((subs && subs.length > 0) || (payments && payments.length > 0)) {
        yield put(setPlan("pro"));
        return;
      }
    } catch (_) {
      // brak rozszerzenia lub błąd – używamy Firestore
    }

    const userRef = doc(db, "users", uid);
    const userSnap = yield call(getDoc, userRef);

    if (userSnap.exists()) {
      const plan = userSnap.data().plan || "free";
      yield put(setPlan(plan));
    } else {
      yield call(setDoc, userRef, { plan: "free" }, { merge: true });
      yield put(setPlan("free"));
    }
  } catch (error) {
    console.error("Błąd pobierania planu:", error);
    yield put(fetchSubscriptionError());
  }
}

export function* subscriptionSaga() {
  yield takeLatest(fetchSubscriptionRequest.type, fetchSubscriptionHandler);
}
