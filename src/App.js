import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { toLogin, toDashboard } from "./routes";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={toLogin()} element={<LoginPage />} />
        <Route path={toDashboard()} element={<Dashboard />} />
        <Route path="/" element={<Navigate to={toLogin()} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
