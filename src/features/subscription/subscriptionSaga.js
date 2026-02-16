import { call, put, takeLatest } from "redux-saga/effects";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getCurrentUserSubscriptions, getCurrentUserPayments } from "@invertase/firestore-stripe-payments";
import { db } from "../../api/firebase";
import stripePayments from "../../api/stripePayments";
import {
  fetchSubscriptionRequest,
  setPlan,
  setSubscriptionDetails,
  fetchSubscriptionError,
} from "./subscriptionSlice";

function* fetchSubscriptionHandler({ payload }) {
  const uid = payload?.uid;
  if (!uid) {
    yield put(setPlan("free"));
    return;
  }

  try {
    try {
      const subs = yield call(getCurrentUserSubscriptions, stripePayments, { status: "active" });
      const payments = yield call(getCurrentUserPayments, stripePayments, { status: "succeeded" });
      if (subs && subs.length > 0) {
        yield put(setSubscriptionDetails(subs[0]));
        return;
      }
      if (payments && payments.length > 0) {
        yield put(setPlan("pro"));
        return;
      }
    } catch (_) {
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
    yield put(fetchSubscriptionError());
  }
}

export function* subscriptionSaga() {
  yield takeLatest(fetchSubscriptionRequest.type, fetchSubscriptionHandler);
}
