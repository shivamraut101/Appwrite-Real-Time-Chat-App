import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";

export const PrivateRoute = () => {
  const user = false;
  return <>
  {user ? <Outlet /> : <Navigate to={"/login"} />}
  </>;
};
