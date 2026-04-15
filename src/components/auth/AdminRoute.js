import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isAdmin } from "../../utils/auth";

function AdminRoute() {
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin(currentUser)) {
    return <Navigate to="/panel" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
