import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Categorie = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ type: '' });
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getCategorie');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission (Add or Update)
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // Update category
        await axios.put(`http://localhost:8000/getCategorie/${selectedId}`, formData);
        toast.success('Catégorie mise à jour avec succès');
      } else {
        // Add new category
        await axios.post('http://localhost:8000/getCategorie', formData);
        toast.success('Catégorie ajoutée avec succès');
      }
      setFormData({ type: '' });
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout ou de la mise à jour de la catégorie');
      console.error('Erreur :', error);
    }
  };

  // Handle edit button click
  const handleEdit = (id, type) => {
    setFormData({ type });
    setSelectedId(id);
    setIsEditMode(true);
    setShowModal(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await axios.delete(`http://localhost:8000/getCategorie/${id}`);
        toast.success('Catégorie supprimée avec succès');
        fetchCategories();
      } catch (error) {
        toast.error('Erreur lors de la suppression de la catégorie');
        console.error('Erreur :', error);
      }
    }
  };

  // Handle form cancel
  const handleCancel = () => {
    setShowModal(false);
    setSelectedId(null);
    setFormData({ type: '' });
    setIsEditMode(false);
  };

  const columns = [
    //{ field: 'ID_categorie', headerName: '#', width: 50 },
    { field: 'type', headerName: 'Type de Catégorie', width: 900 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => handleEdit(params.row.ID_categorie, params.row.type)}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(params.row.ID_categorie)}
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
        <h5 className="mb-0">Gestion des Catégories</h5>
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
            Ajouter une Catégorie
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
              rows={categories}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row.ID_categorie}
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
                <h5 className="modal-title">{isEditMode ? 'Modifier une Catégorie' : 'Ajouter une Catégorie'}</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAdd}>
                  <div className="mb-3">
                    <label className="form-label">Type de Catégorie</label>
                    <input
                      type="text"
                      className="form-control"
                      name="type"
                      value={formData.type}
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

export default Categorie;
