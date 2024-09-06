import React from 'react';
import { createRoot } from 'react-dom/client'; // Import de la nouvelle API
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Sélectionne l'élément root dans le DOM
const rootElement = document.getElementById('root');

// Utilise createRoot pour rendre l'application
const root = createRoot(rootElement);

root.render(
  <Router>
    <App />
  </Router>
);
