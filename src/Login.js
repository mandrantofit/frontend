// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './App.css';  // Import the CSS file

const API_URL = 'http://localhost:8000';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      setToken(token);
      setSuccessMessage('Login successful! Redirecting...');
      setRedirect(true);
      console.log(token);
    } catch (err) {
      setError('Invalid credentials');
      setSuccessMessage(''); // Clear success message on error
    }
  };

  if (redirect) {
    return <Navigate to="/protected" />;
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Connecter vous à votre session</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
