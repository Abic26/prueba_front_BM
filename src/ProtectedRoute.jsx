// ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : null;
  const userRole = user ? user.role : null;

  // Verifica si el usuario está autenticado
  if (!user) {
    // Redirige a la página de inicio de sesión si no está autenticado
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Verifica si el rol del usuario está permitido para la ruta
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirige a la página de error si el rol no está permitido
    return <Navigate to="/403" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
