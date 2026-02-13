import React, { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import { loginSuccess, logout } from "./features/auth/authSlice";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import NotificationModal from "./components/NotificationModal";
import ConfirmModal from "./components/ConfirmModal";
import { toLanding, toLogin, toDashboard, toRegistration } from "./routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          loginSuccess({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          }),
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path={toLanding()} element={<LandingPage />} />
          <Route path={toLogin()} element={<LoginPage />} />
          <Route path={toRegistration()} element={<RegistrationPage />} />
          <Route path={toDashboard()} element={<Dashboard />} />
        </Routes>
      </HashRouter>
      <NotificationModal />
      <ConfirmModal />
    </>
  );
}

export default App;
