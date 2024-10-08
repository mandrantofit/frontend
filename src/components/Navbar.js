import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Inclure le JavaScript de Bootstrap
import canalLogo from '../assets/canal_plus.png'; // Import du logo
import '../styles/Navbar.css';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('email');
    window.location.href = '/login'; // Redirige vers la page de login
  };

  // Vérifier si le type d'utilisateur est admin
  const isAdmin = localStorage.getItem('type') === 'admin';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand">
          <img src={canalLogo} alt="Canal+" style={{ height: '40px' }} /> {/* Ajout du logo ici */}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/materiel">Matériel</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/affectation">Affectation</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/inventaire">Inventaire</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/utilisateur">Utilisateur</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aide">Aide</Link> {/* Ajouter le lien vers Aide */}
            </li>
            {/* Afficher le lien Admin uniquement si l'utilisateur est un admin */}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
            
          </ul>
          {/* Déplacement du bouton Logout dans la liste des liens */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-danger nav-link" id="logout-btn" onClick={handleLogout} style={{ border: 'none' }}>
                <FaSignOutAlt />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
