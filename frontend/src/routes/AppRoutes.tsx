import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginRoute from "./LoginRoute";
import RedirectToLogin from "./RedirectToLogin";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

interface AppRoutesProps {
  isAuthenticated: boolean;
  onLogin: (token: string) => void;
  onLogout: () => void;
  token: string;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  isAuthenticated,
  onLogin,
  onLogout,
  token,
}) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginRoute isAuthenticated={isAuthenticated} onLogin={onLogin} />
        }
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Dashboard onLogout={onLogout} token={token} />
          ) : (
            <RedirectToLogin />
          )
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
