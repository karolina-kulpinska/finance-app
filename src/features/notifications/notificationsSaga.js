import { call, put, select, takeLatest, take, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { collection, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import i18n from "../../i18n";
import { db } from "../../api/firebase";
import { selectUser } from "../auth/authSlice";
import { selectPayments } from "../payments/paymentSlice";
import { selectNotificationPreferences } from "./notificationsSlice";
import { setPreferences, setPermission, setLastCheckedAt } from "./notificationsSlice";

function createNotificationsChannel(userId) {
  return eventChannel((emitter) => {
    const startTime = new Date().toISOString();
    const colRef = collection(db, "users", userId, "notifications");
    const unsub = onSnapshot(colRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          if (data.createdAt && data.createdAt >= startTime) {
            emitter(data);
          }
        }
      });
    });
    return () => unsub();
  });
}

function* notificationsListenerHandler() {
  const user = yield select(selectUser);
  if (!user?.uid) return;
  const prefs = yield select(selectNotificationPreferences);
  if (!prefs.enabled || !prefs.notifyFamilyPaymentAdded) return;
  const perm = typeof Notification !== "undefined" ? Notification.permission : "denied";
  if (perm !== "granted") return;

  const channel = yield call(createNotificationsChannel, user.uid);
  try {
    while (true) {
      const data = yield take(channel);
      if (data.type === "family_payment_added" && typeof Notification !== "undefined") {
        const t = (k, o) => (i18n?.t ? i18n.t(k, o) : k);
        const title = t("notifications.familyPayment");
        const body = `${data.fromName}: ${data.paymentName}`;
        try {
          new Notification(title, { body, tag: "family-notification" });
        } catch {
        }
      }
    }
  } finally {
    channel.close();
  }
}

function* fetchPreferencesHandler() {
  const user = yield select(selectUser);
  if (!user?.uid) return;
  try {
    const ref = doc(db, "users", user.uid);
    const snap = yield call(getDoc, ref);
    const data = snap.data();
    const prefs = data?.notificationsSettings;
    if (prefs) {
      yield put(setPreferences(prefs));
    }
  } catch {
  }
}

function* savePreferencesHandler({ payload }) {
  const user = yield select(selectUser);
  if (!user?.uid) return;
  try {
    const ref = doc(db, "users", user.uid);
    yield call(setDoc, ref, { notificationsSettings: payload }, { merge: true });
    yield put(setPreferences(payload));
  } catch {
  }
}

function* checkPaymentRemindersHandler() {
  const user = yield select(selectUser);
  if (!user?.uid) return;
  const prefs = yield select(selectNotificationPreferences);
  if (!prefs.enabled) return;

  const perm = typeof Notification !== "undefined" ? Notification.permission : "denied";
  yield put(setPermission(perm));
  if (perm !== "granted") return;

  const payments = yield select(selectPayments) || [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const unpaid = payments.filter((p) => !p.paid && p.date);
  const toNotify = [];

  unpaid.forEach((p) => {
    const dueDate = new Date(p.date + "T12:00:00");
    dueDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (prefs.notifyOnDueDate && diffDays === 0) {
      toNotify.push({ ...p, reason: "due" });
    } else if (prefs.daysBeforePayment > 0 && diffDays > 0 && diffDays <= prefs.daysBeforePayment) {
      toNotify.push({ ...p, reason: "upcoming", daysLeft: diffDays });
    }
  });

  if (toNotify.length > 0 && typeof Notification !== "undefined") {
    const t = (key, opts) => (i18n?.t ? i18n.t(key, opts) : key);
    const title = toNotify.length === 1
      ? toNotify[0].reason === "due"
        ? t("notifications.paymentDueToday")
        : t("notifications.paymentInDays", { days: toNotify[0].daysLeft })
      : t("notifications.multiplePayments", { count: toNotify.length });
    const body = toNotify.length === 1
      ? `${toNotify[0].name} – ${toNotify[0].amount} zł`
      : toNotify.slice(0, 3).map((x) => x.name).join(", ") + (toNotify.length > 3 ? "..." : "");
    try {
      new Notification(title, { body, tag: "payment-reminder" });
    } catch {
    }
  }

  yield put(setLastCheckedAt(new Date().toISOString()));
}

export function* notificationsSaga() {
  yield takeLatest("notifications/fetchPreferences", fetchPreferencesHandler);
  yield takeLatest("notifications/savePreferences", savePreferencesHandler);
  yield takeLatest("notifications/checkPaymentReminders", checkPaymentRemindersHandler);
  yield takeLatest("notifications/startListener", function* () {
    yield fork(notificationsListenerHandler);
  });
}
