import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, allowedRole, children }) => {
  // Check if there's a stored token even if user state is not set
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  
  // If no token or stored user data, redirect to login
  if (!token || !storedUser) {
    return <Navigate to="/login" replace />;
  }
  
  // If we have a token but no user in state, use the stored user data
  let userToCheck = user;
  if (!user && storedUser) {
    try {
      userToCheck = JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return <Navigate to="/login" replace />;
    }
  }

  // Check if user has the required role
  if (allowedRole && userToCheck?.role !== allowedRole) {
    // Redirect based on user's actual role
    if (userToCheck?.role === 'superadmin') {
      return <Navigate to="/superadmin-dashboard" replace />;
    } else if (userToCheck?.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  // User is authenticated and has the required role
  return children;
};

export default PrivateRoute;