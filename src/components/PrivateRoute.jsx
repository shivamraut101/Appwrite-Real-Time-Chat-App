import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { useAuth } from "../utils/AuthContext";

export const PrivateRoute = () => {
  const {user} = useAuth();
  return <>
  {user ? <Outlet /> : <Navigate to={"/login"} />}
  </>;
};
