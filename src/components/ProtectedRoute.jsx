// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  // Check if the user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Normalize role and allowedRoles to lowercase
  const normalizedRole = role ? role.toLowerCase() : null;
  const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase());

  // Check if the user's role is authorized
  if (normalizedAllowedRoles && !normalizedAllowedRoles.includes(normalizedRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the protected component if authenticated and authorized
  return children;
};

export default ProtectedRoute;
