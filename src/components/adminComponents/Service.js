import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Composant Service
const Service = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ Nom: '' });
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all services
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getUser/service');
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des services :', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle input change
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // Update service
        await axios.put(`http://localhost:8000/getUser/service/${selectedId}`, formData);
        toast.success('Service mis à jour avec succès');
      } else {
        // Add new service
        await axios.post('http://localhost:8000/getUser/service', formData);
        toast.success('Service ajouté avec succès');
      }
      setFormData({ Nom: '' });
      setShowModal(false);
      fetchServices();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout ou de la mise à jour du service');
      console.error('Erreur :', error);
    }
  };

  // Handle edit button click
  const handleEdit = (id, Nom) => {
    setFormData({ Nom });
    setSelectedId(id);
    setIsEditMode(true);
    setShowModal(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      try {
        await axios.delete(`http://localhost:8000/getUser/service/${id}`);
        toast.success('Service supprimé avec succès');
        fetchServices();
      } catch (error) {
        toast.error('Erreur lors de la suppression du service');
        console.error('Erreur :', error);
      }
    }
  };

  // Handle form cancel
  const handleCancel = () => {
    setShowModal(false);
    setSelectedId(null);
    setFormData({ Nom: '' });
    setIsEditMode(false);
  };

  const columns = [
    { field: 'Nom', headerName: 'Nom du Service', width: 850 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => handleEdit(params.row.ID_service, params.row.Nom)}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(params.row.ID_service)}
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
        <h5 className="mb-0">Gestion des Services</h5>
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
            Ajouter un Service
          </button>
        </div>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <div style={{ height: '300px', width: '100%' }}>
            <DataGrid
              rows={services}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row.ID_service}
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
                <h5 className="modal-title">{isEditMode ? 'Modifier un Service' : 'Ajouter un Service'}</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nom du Service</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Nom"
                      value={formData.Nom}
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

export default Service;
