import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Utilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', type: 'user' });
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    setUserEmail(storedEmail);
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/login');
      const dataWithIds = response.data.map((user, index) => ({
        ...user,
        ID_logUser: user.ID_logUser || index + 1,
      }));
      setUtilisateurs(dataWithIds);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:8000/login/${selectedId}`, formData);
        toast.success('Modification faite avec succès');
      } else {
        await axios.post('http://localhost:8000/login/ajout', formData);
        toast.success('Ajout fait avec succès');
      }
      setFormData({ email: '', password: '', type: 'user' });
      setShowModal(false);
      fetchUtilisateurs();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout ou de la mise à jour de l\'utilisateur:', error);
    }
  };

  const handleEdit = (id) => {
    const selectedUtilisateur = utilisateurs.find((user) => user.ID_logUser === id);
    setFormData({ email: selectedUtilisateur.email, password: '', type: selectedUtilisateur.type });
    setSelectedId(id);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await axios.delete(`http://localhost:8000/login/${id}`);
        fetchUtilisateurs();
        toast.success("Utilisateur supprimé avec succès");
      } catch (error) {
        toast.error("Erreur lors de la suppression de l'utilisateur:", error);
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedId(null);
    setFormData({ email: '', password: '', type: 'user' });
    setIsEditMode(false);
  };

  // Fonction pour vérifier s'il y a plus d'un administrateur
  const isLastAdmin = () => {
    const adminCount = utilisateurs.filter(user => user.type === 'admin').length;
    return adminCount <= 1;
  };

  const columns = [
    { field: 'ID_logUser', headerName: '#', width: 50 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'type', headerName: 'Type', width: 610 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        const isCurrentUserAdmin = params.row.type === 'admin';
        const isDifferentAdmin = isCurrentUserAdmin && params.row.email !== userEmail;
        const isDisabled = (isDifferentAdmin || (isCurrentUserAdmin && isLastAdmin() && params.row.email !== userEmail));

        return (
          <div>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => handleEdit(params.row.ID_logUser)}
              disabled={isDisabled}
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(params.row.ID_logUser)}
              disabled={isDisabled || (isCurrentUserAdmin && isLastAdmin() && params.row.email === userEmail)}
            >
              <FaTrash />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">Gestion des Utilisateurs de l'application</h5>
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
              getRowId={(row) => row.ID_logUser}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              className="bg-light"
            />
          </div>
        )}
      </div>
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
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <select
                      className="form-control"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      disabled={isEditMode && formData.type === 'admin' && isLastAdmin() && formData.email === userEmail}
                    >
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary me-2">{isEditMode ? 'Modifier' : 'Ajouter'}</button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>Annuler</button>
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

export default Utilisateurs;
