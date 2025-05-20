// src/components/RequireRole.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireRole = ({ allowedRole, children }) => {
  const role = localStorage.getItem('role');
  const location = useLocation();

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (role !== allowedRole) {
    localStorage.clear();
    alert(`Access denied. You are logged in as "${role}".`);
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireRole;
