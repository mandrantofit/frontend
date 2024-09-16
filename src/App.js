import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Admin from './pages/Admin';
import AdminRoute from './routes/AdminRoute';
import Login from './pages/Login';
import Materiel from './pages/Materiel';
import Inventaire from './pages/Inventaire';
import Affectation from './pages/Affectation';
import Utilisateur from './pages/User';
import NotFound from './pages/NotFound';  // Import de la page 404
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation(); // Hook pour obtenir la route actuelle

  return (
    <div className="App">
      {/* Affiche Navbar seulement si on n'est pas sur la page de login */}
      {location.pathname !== '/login' && location.pathname !== '/' && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/materiel" element={<PrivateRoute><Materiel /></PrivateRoute>} />
        <Route path="/inventaire" element={<PrivateRoute><Inventaire /></PrivateRoute>} />
        <Route path="/affectation" element={<PrivateRoute><Affectation /></PrivateRoute>} />
        <Route path="/utilisateur" element={<PrivateRoute><Utilisateur /></PrivateRoute>} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        {/* Route catch-all pour les pages non trouvées */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
