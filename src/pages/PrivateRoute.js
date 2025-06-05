import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, allowedRole, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
