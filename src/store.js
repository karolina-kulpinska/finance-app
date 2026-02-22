import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import authReducer from "./features/auth/authSlice";
import registrationReducer from "./features/auth/registrationSlice";
import subscriptionReducer from "./features/subscription/subscriptionSlice";
import { authSaga } from "./features/auth/authSaga";
import { registrationSaga } from "./features/auth/registrationSaga";
import { subscriptionSaga } from "./features/subscription/subscriptionSaga";
import paymentReducer from "./features/payments/paymentSlice";
import { paymentSaga } from "./features/payments/paymentSaga";
import notificationReducer from "./features/notification/notificationSlice";
import confirmReducer from "./features/notification/confirmSlice";
import demoReducer from "./features/demo/demoSlice";
// eslint-disable-next-line no-unused-vars -- used in reducer config
import currencyReducer from "./features/currency/currencySlice";

const sagaMiddleware = createSagaMiddleware({
  onError: (error) => {
  },
});

function* rootSaga() {
  try {
    yield all([authSaga(), registrationSaga(), subscriptionSaga(), paymentSaga()]);
  } catch (error) {
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    subscription: subscriptionReducer,
    payments: paymentReducer,
    notification: notificationReducer,
    confirm: confirmReducer,
    demo: demoReducer,
    currency: currencyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
