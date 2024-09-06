import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Materiel from './pages/Materiel';
import Inventaire from './pages/Inventaire';
import Affectation from './pages/Affectation';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/materiel" element={<PrivateRoute><Materiel /></PrivateRoute>} />
        <Route path="/inventaire" element={<PrivateRoute><Inventaire /></PrivateRoute>} />
        <Route path="/affectation" element={<PrivateRoute><Affectation /></PrivateRoute>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
