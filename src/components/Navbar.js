import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Assurez-vous d'inclure le JavaScript de Bootstrap
import canalLogo from '../assets/canal_plus.png'; // Import du logo
import '../styles/Navbar.css';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirige vers la page de login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" >
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
              <Link className="nav-link" to="/inventaire">Inventaire</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/affectation">Affectation</Link>
            </li>
          </ul>
          {/* Déplacement du bouton Logout dans la liste des liens */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-danger nav-link" id="logout-btn" onClick={handleLogout} style={{border: 'none'}}>
              <FaSignOutAlt/>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
