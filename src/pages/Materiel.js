import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Materiel = () => {
  const [materiels, setMateriels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les données depuis le backend
    const fetchMateriel = async () => {
      try {
        const response = await axios.get('http://localhost:8000/materiel');
        setMateriels(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des matériels:', error);
        setLoading(false);
      }
    };

    fetchMateriel();
  }, []);

  // Définir les colonnes pour le tableau MUI
  const columns = [
    { field: 'ID_materiel', headerName: 'ID', width: 90 },
    { field: 'modele', headerName: 'Modèle', width: 150 },
    { field: 'marque', headerName: 'Marque', width: 150 },
    { field: 'numero_serie', headerName: 'Numéro de Série', width: 180 },
    { field: 'type', headerName: 'Catégorie', width: 130 },
    { field: 'etat', headerName: 'État', width: 120 },
    { field: 'fournisseur', headerName: 'Fournisseur', width: 150 },
    { field: 'bon_de_commande', headerName: 'Bon de Commande', width: 180 },
    { field: 'config', headerName: 'Configuration', width: 200 },
    { field: 'bon_de_livraison', headerName: 'Bon de Livraison', width: 180 },
    { field: 'attribution', headerName: 'Attribution', width: 150 },
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Liste des Matériels</h4>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={materiels}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.ID_materiel} // Assurez-vous que chaque ligne a un ID unique
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                className="bg-light"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Materiel;
