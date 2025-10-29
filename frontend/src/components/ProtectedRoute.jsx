import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthService from "../services/Auth.service";

const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = AuthService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
