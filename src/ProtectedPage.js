// src/ProtectedPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

const ProtectedPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="protected-page-container">
      <nav className="navbar">
        <h2>Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </nav>
      <div className="content">
      </div>
    </div>
  );
};

export default ProtectedPage;
