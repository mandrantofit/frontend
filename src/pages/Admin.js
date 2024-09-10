import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Admin = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/login');
      setUtilisateurs(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:8000/login/${selectedId}`, formData);
      } else {
        await axios.post('http://localhost:8000/login/ajout', formData);
      }
      setFormData({
        email: '',
        password: '',
      });
      setShowModal(false);
      fetchUtilisateurs();
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la mise à jour de l\'utilisateur:', error);
    }
  };

  const handleEdit = (id) => {
    const selectedUtilisateur = utilisateurs.find((user) => user.ID_logUser === id);
    setFormData({
      email: selectedUtilisateur.email,
      password: selectedUtilisateur.password,
    });
    setSelectedId(id);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await axios.delete(`http://localhost:8000/login/${id}`);
        fetchUtilisateurs();
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedId(null);
    setFormData({
      email: '',
      password: '',
    });
    setIsEditMode(false);
  };

  const columns = [
    { field: 'ID_logUser', headerName: '#', width: 50 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'type', headerName: 'Type', width: 600 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(params.row.ID_logUser)}>
            <FaEdit />
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(params.row.ID_logUser)}>
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Gestion des Utilisateurs</h4>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-success" onClick={() => {
              setShowModal(true);
              setIsEditMode(false);
            }}>
              Ajouter un Utilisateur
            </button>
          </div>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <div style={{ height: 450, width: '100%' }}>
              <DataGrid
                rows={utilisateurs}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.ID_logUser} // Utilisez ID_logUser comme ID
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                className="bg-light"
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal d'ajout/édition */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? 'Modifier un Utilisateur' : 'Ajouter un Utilisateur'}</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAdd}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {isEditMode ? 'Mettre à jour' : 'Ajouter'}
                  </button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>
                    Annuler
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
