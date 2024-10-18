import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";

interface LoginRouteProps {
  isAuthenticated: boolean;
  onLogin: (token: string) => void;
}

const LoginRoute: React.FC<LoginRouteProps> = ({ isAuthenticated, onLogin }) => {
  const location = useLocation();
  const from = location.state?.from || "/"; 

  return isAuthenticated ? <Navigate to={from} replace /> : <Login onLogin={onLogin} />;
};

export default LoginRoute;
