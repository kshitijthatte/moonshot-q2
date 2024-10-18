import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RedirectToLogin: React.FC = () => {
  const location = useLocation();
  return (
    <Navigate
      to="/login"
      state={{ from: location.pathname + location.search }} 
      replace
    />
  );
};

export default RedirectToLogin;
