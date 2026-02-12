import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import authReducer from "./features/auth/authSlice";
import { authSaga } from "./features/auth/authSaga";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([authSaga()]);
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
