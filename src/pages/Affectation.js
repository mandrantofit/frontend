import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Container, Typography } from '@mui/material';

const Affectation = () => {
  const [ID_utilisateur, setIDUtilisateur] = useState('');
  const [ID_materiel, setIDMateriel] = useState('');
  const [date_affectation, setDateAffectation] = useState('');
  const [message, setMessage] = useState('');
  const [affectations, setAffectations] = useState([]);

  // Fonction pour créer une affectation
  const createAffectation = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/affectation', {
        ID_utilisateur,
        ID_materiel
      });
      setMessage('Affectation créée avec succès');
      fetchAffectations(); // Recharger les données après ajout
    } catch (error) {
      console.error('Erreur lors de la création de l\'affectation:', error);
      setMessage('Erreur lors de la création de l\'affectation');
    }
  };

  // Fonction pour supprimer une affectation
  const deleteAffectation = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/affectation/${id}`);
      setMessage('Affectation supprimée avec succès');
      fetchAffectations(); // Recharger les données après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'affectation:', error);
      setMessage('Erreur lors de la suppression de l\'affectation');
    }
  };

  // Fonction pour charger les affectations
  const fetchAffectations = async () => {
    try {
      const { data } = await axios.get('http://127.0.0.1:8000/affectation');
      // Assurez-vous que chaque objet a une propriété 'id'
      const formattedData = data.map((item) => ({
        id: item.ID_affectation, // Utilisez la clé appropriée pour l'id
        ...item
      }));
      setAffectations(formattedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des affectations:', error);
    }
  };

  useEffect(() => {
    fetchAffectations();
  }, []);

  // Colonnes pour DataGrid
  const columns = [
    { field: 'ID_affectation', headerName: 'ID Affectation', width: 150 },
    { field: 'ID_utilisateur', headerName: 'ID Utilisateur', width: 150 },
    { field: 'ID_materiel', headerName: 'ID Matériel', width: 150 },
    { field: 'date_affectation', headerName: 'Date d\'Affectation', width: 180 }
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Affectation
      </Typography>
      <div style={{ marginBottom: 20 }}>
        <TextField
          label="ID Utilisateur"
          variant="outlined"
          value={ID_utilisateur}
          onChange={(e) => setIDUtilisateur(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <TextField
          label="ID Matériel"
          variant="outlined"
          value={ID_materiel}
          onChange={(e) => setIDMateriel(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <Button variant="contained" color="primary" onClick={createAffectation}>
          Créer Affectation
        </Button>
      </div>
      <div style={{ marginBottom: 20 }}>
        <TextField
          label="ID Affectation à supprimer"
          variant="outlined"
          onChange={(e) => setIDMateriel(e.target.value)} // Utiliser une autre variable pour l'ID à supprimer
          style={{ marginRight: 10 }}
        />
        <Button variant="contained" color="secondary" onClick={() => deleteAffectation(ID_materiel)}>
          Supprimer Affectation
        </Button>
      </div>
      {message && <Typography variant="body1">{message}</Typography>}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={affectations}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.ID_affectation} // Assurez-vous que cette clé est unique
        />
      </div>
    </Container>
  );
};

export default Affectation;
