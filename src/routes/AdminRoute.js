import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('type');

  // Vérifie si le type d'utilisateur est admin
  if (userType !== 'admin') {
    // Redirige vers la page d'accueil ou une autre page si l'utilisateur n'est pas admin
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
