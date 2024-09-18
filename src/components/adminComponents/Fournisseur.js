import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Fournisseur = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [formData, setFormData] = useState({ nom: '' });
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all fournisseurs
  const fetchFournisseurs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getFournisseur');
      setFournisseurs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des fournisseurs :', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  // Handle input change
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission (Add or Update)
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // Update fournisseur
        await axios.put(`http://localhost:8000/getFournisseur/${selectedId}`, formData);
        toast.success('Fournisseur mis à jour avec succès');
      } else {
        // Add new fournisseur
        await axios.post('http://localhost:8000/getFournisseur', formData);
        toast.success('Fournisseur ajouté avec succès');
      }
      setFormData({ nom: '' });
      setShowModal(false);
      fetchFournisseurs();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout ou de la mise à jour du fournisseur');
      console.error('Erreur :', error);
    }
  };

  // Handle edit button click
  const handleEdit = (id, nom) => {
    setFormData({ nom });
    setSelectedId(id);
    setIsEditMode(true);
    setShowModal(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      try {
        await axios.delete(`http://localhost:8000/getFournisseur/${id}`);
        toast.success('Fournisseur supprimé avec succès');
        fetchFournisseurs();
      } catch (error) {
        toast.error('Erreur lors de la suppression du fournisseur');
        console.error('Erreur :', error);
      }
    }
  };

  // Handle form cancel
  const handleCancel = () => {
    setShowModal(false);
    setSelectedId(null);
    setFormData({ nom: '' });
    setIsEditMode(false);
  };

  const columns = [
    { field: 'nom', headerName: 'Nom', width: 915 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => handleEdit(params.row.ID_fournisseur, params.row.nom)}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(params.row.ID_fournisseur)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">Gestion des Fournisseurs</h5>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <button
            className="btn btn-success"
            onClick={() => {
              setShowModal(true);
              setIsEditMode(false);
            }}
          >
            Ajouter un Fournisseur
          </button>
        </div>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <div style={{ height: '350px', width: '100%' }}>
            <DataGrid
              rows={fournisseurs}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row.ID_fournisseur}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              className="bg-light"
            />
          </div>
        )}
      </div>
      {/* Modal d'ajout/édition */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? 'Modifier un Fournisseur' : 'Ajouter un Fournisseur'}</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAdd}>
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary me-2">
                    {isEditMode ? 'Modifier' : 'Ajouter'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Annuler
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Fournisseur;
