import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Lieux = () => {
  const [lieux, setLieux] = useState([]);
  const [formData, setFormData] = useState({ lieux: '' });
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all lieux
  const fetchLieux = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getUser/lieux');
      setLieux(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des lieux :', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLieux();
  }, []);

  // Handle input change
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // Update lieu
        await axios.put(`http://localhost:8000/getUser/lieux/${selectedId}`, formData);
        toast.success('Lieu mis à jour avec succès');
      } else {
        // Add new lieu
        await axios.post('http://localhost:8000/getUser/lieux', formData);
        toast.success('Lieu ajouté avec succès');
      }
      setFormData({ lieux: '' });
      setShowModal(false);
      fetchLieux();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout ou de la mise à jour du lieu');
      console.error('Erreur :', error);
    }
  };

  // Handle edit button click
  const handleEdit = (id, lieux) => {
    setFormData({ lieux });
    setSelectedId(id);
    setIsEditMode(true);
    setShowModal(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce lieu ?')) {
      try {
        await axios.delete(`http://localhost:8000/getUser/lieux/${id}`);
        toast.success('Lieu supprimé avec succès');
        fetchLieux();
      } catch (error) {
        toast.error('Erreur lors de la suppression du lieu');
        console.error('Erreur :', error);
      }
    }
  };

  // Handle form cancel
  const handleCancel = () => {
    setShowModal(false);
    setSelectedId(null);
    setFormData({ lieux: '' });
    setIsEditMode(false);
  };

  const columns = [
    { field: 'lieux', headerName: 'Lieux', width: 900 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => handleEdit(params.row.ID_lieux, params.row.lieux)}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(params.row.ID_lieux)}
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
        <h5 className="mb-0">Gestion des Lieux</h5>
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
            Ajouter un Lieu
          </button>
        </div>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <div style={{ height: '340px', width: '100%' }}>
            <DataGrid
              rows={lieux}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row.ID_lieux}
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
                <h5 className="modal-title">{isEditMode ? 'Modifier un Lieu' : 'Ajouter un Lieu'}</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Lieu</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lieux"
                      value={formData.lieux}
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

export default Lieux;
