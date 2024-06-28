import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/v1/signin" />;
};

export default PrivateRoute;
