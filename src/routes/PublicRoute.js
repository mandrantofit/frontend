import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return !token ? children : <Navigate to="/materiel" />;
};

export default PublicRoute;
