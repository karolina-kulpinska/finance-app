import { call, put, takeLatest } from "redux-saga/effects";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  getCurrentUserSubscriptions,
  getCurrentUserPayments,
} from "@invertase/firestore-stripe-payments";
import { Capacitor } from "@capacitor/core";
import { db } from "../../api/firebase";
import stripePayments from "../../api/stripePayments";
import paymentAdapter from "../../api/paymentAdapter";
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
    // Sprawdzenie platform: mobilna (Google Play) czy web (Stripe)
    const isNative = Capacitor.isNativePlatform();

    if (isNative) {
      // 📱 Mobilna aplikacja: sprawdzaj Google Play Billing
      try {
        yield call(() => paymentAdapter.initialize());
        const subStatus = yield call(() =>
          paymentAdapter.checkSubscriptionStatus(uid),
        );
        if (subStatus.isPro) {
          yield put(setPlan("pro"));
          return;
        }
      } catch (error) {
        console.warn("Błąd sprawdzenia Google Play:", error);
      }
    } else {
      // 🌐 Web: sprawdzaj Stripe
      try {
        const subs = yield call(getCurrentUserSubscriptions, stripePayments, {
          status: "active",
        });
        const payments = yield call(getCurrentUserPayments, stripePayments, {
          status: "succeeded",
        });
        if (subs && subs.length > 0) {
          yield put(setSubscriptionDetails(subs[0]));
          return;
        }
        if (payments && payments.length > 0) {
          yield put(setPlan("pro"));
          return;
        }
      } catch (_) {}
    }

    // Fallback: sprawdzaj Firestore (dla obu platform)
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
    console.error("Błąd fetchSubscriptionHandler:", error);
    yield put(fetchSubscriptionError());
  }
}

export function* subscriptionSaga() {
  yield takeLatest(fetchSubscriptionRequest.type, fetchSubscriptionHandler);
}
