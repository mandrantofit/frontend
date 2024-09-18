import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modele = () => {
  const [modeles, setModeles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ id: '', modele: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModeles();
  }, []);

  const fetchModeles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/materiel/modele');
      setModeles(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Erreur lors de la récupération des modèles');
      setLoading(false);
    }
  };

  const handleOpenModal = (action, row = {}) => {
    setIsEditMode(action === 'update');
    setFormData({
      id: row.ID_modele || '',
      modele: row.modele || ''
    });
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData({ id: '', modele: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:8000/materiel/modele/${formData.id}`, { modele: formData.modele });
        toast.success('Modèle mis à jour avec succès');
      } else {
        await axios.post('http://localhost:8000/materiel/modele', { modele: formData.modele });
        toast.success('Modèle créé avec succès');
      }
      fetchModeles();
      handleCancel();
    } catch (error) {
      toast.error('Erreur lors de la soumission du formulaire');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/materiel/modele/${id}`);
      toast.success('Modèle supprimé avec succès');
      fetchModeles();
    } catch (error) {
      toast.error('Erreur lors de la suppression du modèle');
    }
  };

  const columns = [
    { field: 'ID_modele', headerName: 'ID', width: 90 },
    { field: 'modele', headerName: 'Modèle', width: 850 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => handleOpenModal('update', params.row)}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(params.row.ID_modele)}
          >
            <FaTrash />
          </button>
        </>
      )
    }
  ];

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">Gestion des Modèles</h5>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <button
            className="btn btn-success"
            onClick={() => handleOpenModal('create')}
          >
            Ajouter un Modèle
          </button>
        </div>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Chargement...</span>
            </div>
          </div>
        ) : (
          <div style={{ height: '300px', width: '100%' }}>
            <DataGrid
              rows={modeles}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row.ID_modele}
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
                <h5 className="modal-title">{isEditMode ? 'Modifier un Modèle' : 'Ajouter un Modèle'}</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAdd}>
                  <div className="mb-3">
                    <label className="form-label">Nom du Modèle</label>
                    <input
                      type="text"
                      className="form-control"
                      name="modele"
                      value={formData.modele}
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

export default Modele;
