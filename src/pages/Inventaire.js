import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import 'bootstrap/dist/css/bootstrap.min.css';

const Inventaire = () => {
  const [inventaire, setInventaire] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventaire = async () => {
      try {
        const response = await axios.get('http://localhost:8000/materiel/inventaire');
        setInventaire(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'inventaire :', error);
        setLoading(false);
      }
    };

    fetchInventaire();
  }, []);

  const columns = [
    { field: 'modele', headerName: 'Modèle', width: 600 },
    { field: 'non_attribue', headerName: 'Non Attribué', width: 100 },
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Inventaire des Matériels Non Attribués</h4>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center" style={{ height: 400, width: '70%', marginLeft:'10rem' }}>
              <DataGrid
                rows={inventaire}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.modele}
                rowsPerPageOptions={[5]}
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

export default Inventaire;
