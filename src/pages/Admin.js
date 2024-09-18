import React from 'react';
import { Nav, Tab } from 'react-bootstrap';
import Utilisateurs from '../components/adminComponents/Utilisateurs';
import Marque from '../components/adminComponents/Marque';
import Modele from '../components/adminComponents/Modele';
import Categorie from '../components/adminComponents/Categorie';
import Fournisseur from '../components/adminComponents/Fournisseur';
import Service from '../components/adminComponents/Service';
import Lieux from '../components/adminComponents/Lieux';

const Admin = () => {
  return (
    <div className="container mt-4">
      <Tab.Container defaultActiveKey="utilisateurs">
        <Nav variant="pills" className="my-3 d-flex justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="utilisateurs" className="mx-2 rounded-pill shadow-sm bg-dark text-light">
              Utilisateurs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="marque" className="mx-2 rounded-pill shadow-sm bg-dark text-light">
              Marque
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="modele" className="mx-2 rounded-pill shadow-sm bg-dark text-light">
              Modèle
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="categorie" className="mx-2 rounded-pill shadow-sm bg-dark text-light">
              Catégorie
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="fournisseur" className="mx-2 rounded-pill shadow-sm bg-dark text-light">
              Fournisseur
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="service" className="mx-2 rounded-pill shadow-sm bg-dark text-light">
              Service
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="lieux" className="mx-2 rounded-pill shadow-sm bg-dark text-light">
              Lieux
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="utilisateurs">
            <Utilisateurs />
          </Tab.Pane>
          <Tab.Pane eventKey="marque">
            <Marque />
          </Tab.Pane>
          <Tab.Pane eventKey="modele">
            <Modele />
          </Tab.Pane>
          <Tab.Pane eventKey="categorie">
            <Categorie />
          </Tab.Pane>
          <Tab.Pane eventKey="fournisseur">
            <Fournisseur />
          </Tab.Pane>
          <Tab.Pane eventKey="service">
            <Service />
          </Tab.Pane>
          <Tab.Pane eventKey="lieux">
            <Lieux />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default Admin;
