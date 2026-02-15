import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import { loginSuccess, logout, selectUser } from "./features/auth/authSlice";
import { fetchSubscriptionRequest } from "./features/subscription/subscriptionSlice";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Invite from "./pages/Invite";
import NotificationModal from "./components/NotificationModal";
import ConfirmModal from "./components/ConfirmModal";
import { toLanding, toLogin, toDashboard, toRegistration, toInvite } from "./routes";
import styled from "styled-components";

const LoadingScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 20px;
  font-weight: 700;
`;

function ProtectedRoute({ children }) {
  const user = useSelector(selectUser);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setChecking(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (checking) {
    return <LoadingScreen>Ładowanie...</LoadingScreen>;
  }

  return user ? children : <Navigate to={toLogin()} replace />;
}

function App() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

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
        dispatch(fetchSubscriptionRequest({ uid: user.uid }));
      } else {
        dispatch(logout());
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!authChecked) {
    return <LoadingScreen>Ładowanie...</LoadingScreen>;
  }

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path={toLanding()} element={<LandingPage />} />
          <Route path={toLogin()} element={<LoginPage />} />
          <Route path={toRegistration()} element={<RegistrationPage />} />
          <Route path={toInvite(":token")} element={<Invite />} />
          <Route 
            path={toDashboard()} 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </HashRouter>
      <NotificationModal />
      <ConfirmModal />
    </>
  );
}

export default App;
