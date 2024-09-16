import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaUndo as FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Affectation = () => {
  
  const [affectations, setAffectations] = useState([]);
  const [materiels, setMateriels] = useState([]);
  const [historique, setHistorique] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    ID_materiel: '',
    ID_utilisateur: '',
  });
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);


  const fetchHistorique = async () => {
    try {
      const response = await axios.get('http://localhost:8000/affectation/historique');
      setHistorique(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
    }
  };
  const fetchAffectations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/affectation');
      setAffectations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des affectations:', error);
      setLoading(false);
    }
  };
  const fetchMaterielsForAdd = async () => {
    try {
      const response = await axios.get('http://localhost:8000/materiel/non_attribue');
      setMateriels(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des matériels non attribués:', error);
    }
  };
  const fetchMaterielsForUpdate = async () => {
    try {
      const response = await axios.get('http://localhost:8000/materiel/non_attribue');
      setMateriels(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des matériels:', error);
    }
  };
  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getUser');
      setUtilisateurs(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };
  useEffect(() => {
    fetchAffectations();
    fetchHistorique();
    fetchUtilisateurs();
    fetchMaterielsForAdd();
  }, []);
  useEffect(() => {
    if (showUpdateModal) {
      fetchMaterielsForUpdate();
    }
  }, [showUpdateModal]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/affectation', formData);
      setFormData({
        ID_materiel: '',
        ID_utilisateur: '',
      });
      toast.success('Affectation ajoutée avec succès !');
      setShowModal(false);
      fetchAffectations();
      fetchMaterielsForAdd(); // Rafraîchir la liste des matériels non attribués
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'affectation:', error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/affectation/${selectedId}`, formData);
      setFormData({
        ID_materiel: '',
        ID_utilisateur: '',
      });
      alert('Affectation mise à jour avec succès !');
      setShowUpdateModal(false);
      fetchAffectations();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'affectation:', error);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir desaffecter cette materiel ?")) {
      try {
        await axios.delete(`http://localhost:8000/affectation/${id}`);
        toast.success('materiel desaffecté avec succès !');
        fetchAffectations();
        fetchHistorique();
      } catch (error) {
        console.error("Erreur lors de la suppression de l'affectation:", error);
      }
    }
  };
  const handleCancel = () => {
    setShowModal(false);
    setShowUpdateModal(false);
    setSelectedId(null);
    setFormData({
      ID_materiel: '',
      ID_utilisateur: '',
    });
  };
  const handleEdit = (id) => {
    const selectedAffectation = affectations.find((affectation) => affectation.ID_affectation === id);
    setFormData({
      ID_materiel: selectedAffectation.ID_materiel,
      ID_utilisateur: selectedAffectation.ID_utilisateur,
    });
    setSelectedId(id);
    setShowUpdateModal(true);
  };
  const columns = [
    //{ field: 'ID_affectation', headerName: 'ID Affectation', width: 150 },
    {
      field: 'numero_inventaire',
      headerName: 'Numéro d\'Inventaire',
      width: 220,
    },
    {
      field: 'modele',
      headerName: 'Modèle',
      width: 170,
    },
    {
      field: 'utilisateur_nom',
      headerName: 'Utilisateur',
      width: 350,
    },
    { field: 'date_affectation', headerName: 'Date d\'Affectation', width: 240 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(params.row.ID_affectation)}>
            <FaEdit />
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(params.row.ID_affectation)}>
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const historiqueColumns = [
    //{ field: 'ID_historique', headerName: 'ID Historique', width: 150 },
    { field: 'numero_inventaire', headerName: 'Numéro d\'Inventaire', width: 200 },
    { field: 'modele', headerName: 'Modèle', width: 170 },
    { field: 'utilisateur_nom', headerName: 'Utilisateur', width: 350 },
    { field: 'date_affectation', headerName: 'Date Affectation', width: 220 },
    { field: 'date_suppression', headerName: 'Date Désaffectation', width: 180 },
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Liste des Affectations</h4>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              Affecter un materiel
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
                rows={affectations}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.ID_affectation}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                className="bg-light"
              />
            </div>
          )}
        </div>

      </div> <br></br>
      <div className="container mt-4"><div className="card shadow-sm mt-4">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Historique des Affectations</h4>
        </div>
        <div className="card-body">
          <div style={{ height: 450, width: '100%' }}>
            <DataGrid
              rows={historique}
              columns={historiqueColumns}
              pageSize={5}
              getRowId={(row) => row.ID_historique}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              className="bg-light"
            />
          </div>
        </div>
      </div></div>

      {/* Modal d'ajout */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter une Affectation</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAdd}>
                  <h5 className='text-center'>Détails de l'Affectation</h5>
                  <div className="mb-3">
                    <label className="form-label">Matériel</label>
                    <select
                      name="ID_materiel"
                      value={formData.ID_materiel}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Sélectionner un matériel</option>
                      {materiels.map((materiel) => (
                        <option key={materiel.ID_materiel} value={materiel.ID_materiel}>
                          {materiel.numero_inventaire} - {materiel.modele}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Utilisateur</label>
                    <select
                      name="ID_utilisateur"
                      value={formData.ID_utilisateur}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Sélectionner un utilisateur</option>
                      {utilisateurs.map((utilisateur) => (
                        <option key={utilisateur.ID_utilisateur} value={utilisateur.ID_utilisateur}>
                          {utilisateur.nom} - {utilisateur.service} - {utilisateur.lieux}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Ajouter</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>
                    Annuler
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de mise à jour */}
      {showUpdateModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Mettre à jour une Affectation</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <h5 className='text-center'>Détails de l'Affectation</h5>
                  <div className="mb-3">
                    <label className="form-label">Matériel</label>
                    <select
                      name="ID_materiel"
                      value={formData.ID_materiel}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Sélectionner un matériel</option>
                      {materiels.map((materiel) => (
                        <option key={materiel.ID_materiel} value={materiel.ID_materiel}>
                          {materiel.numero_inventaire} - {materiel.modele}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Utilisateur</label>
                    <select
                      name="ID_utilisateur"
                      value={formData.ID_utilisateur}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Sélectionner un utilisateur</option>
                      {utilisateurs.map((utilisateur) => (
                        <option key={utilisateur.ID_utilisateur} value={utilisateur.ID_utilisateur}>
                          {utilisateur.nom} - {utilisateur.service} - {utilisateur.lieux}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Mettre à jour</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>
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

export default Affectation;
