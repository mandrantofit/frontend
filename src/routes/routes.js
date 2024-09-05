// src/routes/routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login';
import ProtectedPage from '../ProtectedPage';
import PrivateRoute from './PrivateRoute';

const AppRoutes = ({ setToken }) => (
  <Routes>
    <Route path="/login" element={<Login setToken={setToken} />} />
    <Route path="/protected" element={<PrivateRoute element={<ProtectedPage />} />} />
    <Route path="/" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
