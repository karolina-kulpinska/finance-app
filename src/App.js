import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { toLanding, toLogin, toDashboard } from "./routes";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={toLanding()} element={<LandingPage />} />
        <Route path={toLogin()} element={<LoginPage />} />
        <Route path={toDashboard()} element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
