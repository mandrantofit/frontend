import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Materiel = () => {
  const [materiels, setMateriels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [etats, setEtats] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    modele: '',
    marque: '',
    numero_serie: '',
    numero_inventaire: '',
    ID_categorie: '',
    ID_etat: '',
    ID_fournisseur: '',
    bon_de_commande: '',
    config: '',
    bon_de_livraison: '',
  });
  const [selectedId, setSelectedId] = useState(null); // ID du matériel sélectionné pour modification
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const fetchMateriel = async () => {
    try {
      const response = await axios.get('http://localhost:8000/materiel');
      setMateriels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des matériels:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getCategorie');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  const fetchEtats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getEtat');
      setEtats(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des états:', error);
    }
  };

  const fetchFournisseurs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getFournisseur');
      setFournisseurs(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des fournisseurs:', error);
    }
  };

  useEffect(() => {
    fetchMateriel();
    fetchCategories();
    fetchEtats();
    fetchFournisseurs();
  }, []);

  const handleChange = (e) => {
    console.log('Changed:', e.target.name, e.target.value); // Debugging line
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/materiel', formData);
      setFormData({
        modele: '',
        marque: '',
        numero_serie: '',
        numero_inventaire: '',
        ID_categorie: '',
        ID_etat: '',
        ID_fournisseur: '',
        bon_de_commande: '',
        config: '',
        bon_de_livraison: '',
      });
      alert('Matériel ajouté avec succès !');
      setShowModal(false);
      fetchMateriel();
    } catch (error) {
      setError("Une erreur est survenue lors de l'ajout du matériel.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/materiel/${selectedId}`, formData);
      setFormData({
        modele: '',
        marque: '',
        numero_serie: '',
        numero_inventaire: '',
        ID_categorie: '',
        ID_etat: '',
        ID_fournisseur: '',
        bon_de_commande: '',
        config: '',
        bon_de_livraison: '',
      });
      alert('Matériel mis à jour avec succès !');
      setShowUpdateModal(false);
      fetchMateriel();
    } catch (error) {
      setError("Une erreur est survenue lors de la mise à jour du matériel.");
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce matériel ?")) {
      try {
        await axios.delete(`http://localhost:8000/materiel/${id}`);
        alert('Matériel supprimé avec succès !');
        fetchMateriel();  // Mettre à jour la liste après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression du matériel:", error);
        setError("Une erreur est survenue lors de la suppression du matériel.");
      }
    }
  };
  

  const handleCancel = () => {
    setShowModal(false);
    setShowUpdateModal(false);
  };

  const handleEdit = (id) => {
    const selectedMateriel = materiels.find((materiel) => materiel.ID_materiel === id);
    
    // Mappings pour convertir les noms en IDs
    const categorie = categories.find((cat) => cat.type === selectedMateriel.type);
    const etat = etats.find((et) => et.description === selectedMateriel.etat);
    const fournisseur = fournisseurs.find((four) => four.nom === selectedMateriel.fournisseur);
    
    setFormData({
      modele: selectedMateriel.modele || '',
      marque: selectedMateriel.marque || '',
      numero_serie: selectedMateriel.numero_serie || '',
      numero_inventaire: selectedMateriel.numero_inventaire || '',
      ID_categorie: categorie ? categorie.ID_categorie : '',
      ID_etat: etat ? etat.ID_etat : '',
      ID_fournisseur: fournisseur ? fournisseur.ID_fournisseur : '',
      bon_de_commande: selectedMateriel.bon_de_commande || '',
      config: selectedMateriel.config || '',
      bon_de_livraison: selectedMateriel.bon_de_livraison || '',
    });
    
    setSelectedId(id);
    setShowUpdateModal(true);
};


  const columns = [
    { field: 'numero_inventaire', headerName: 'Numéro d\'Inventaire', width: 150 },
    { field: 'marque', headerName: 'Marque', width: 120 },
    { field: 'modele', headerName: 'Modèle', width: 150 },
    { field: 'numero_serie', headerName: 'Numéro de Série', width: 150 },
    { field: 'type', headerName: 'Catégorie', width: 200 },
    { field: 'config', headerName: 'Configuration', width: 200 },
    { field: 'etat', headerName: 'État', width: 80 },
    { field: 'fournisseur', headerName: 'Fournisseur', width: 100 },
    { field: 'bon_de_commande', headerName: 'Bon de Commande', width: 140 },
    { field: 'bon_de_livraison', headerName: 'Bon de Livraison', width: 140 },
    { field: 'attribution', headerName: 'Matériel Affecté', width: 140 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <div>
          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(params.row.ID_materiel)}>
            <FaEdit />
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(params.row.ID_materiel)}>
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
          <h4 className="mb-0">Liste des Matériels</h4>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              Ajouter Matériel
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
                rows={materiels}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.ID_materiel}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                className="bg-light"
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal d'ajout */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter un Matériel</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAdd}>
                  <h5 className='text-center'>Informations Générales</h5>
                  <div className="mb-3">
                    <label className="form-label">Marque</label>
                    <input
                      type="text"
                      name="marque"
                      value={formData.marque}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Modèle</label>
                    <input
                      type="text"
                      name="modele"
                      value={formData.modele}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Numéro de Série</label>
                    <input
                      type="text"
                      name="numero_serie"
                      value={formData.numero_serie}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Numéro d'inventaire</label>
                    <input
                      type="text"
                      name="numero_inventaire"
                      value={formData.numero_inventaire}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  {/* Formulaire pour Détails de la Configuration */}
                  <h5 className='text-center'>Détails de la Configuration</h5>
                  <div className="mb-3">
                    <label className="form-label">Catégorie</label>
                    <select
                      name="ID_categorie"
                      value={formData.ID_categorie}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Sélectionner la catégorie</option>
                      {categories.map((categorie) => (
                        <option key={categorie.ID_categorie} value={categorie.ID_categorie}>
                          {categorie.type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Configuration</label>
                    <input
                      type="text"
                      name="config"
                      value={formData.config}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">État</label>
                    <select
                      name="ID_etat"
                      value={formData.ID_etat}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Sélectionner l'état du Materiel</option>
                      {etats.map((etat) => (
                        <option key={etat.ID_etat} value={etat.ID_etat}>
                          {etat.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Formulaire pour Fournisseur et Documents */}
                  <h5 className='text-center'>Fournisseur et Documents</h5>
                  <div className="mb-3">
                    <label className="form-label">Fournisseur</label>
                    <select
                      name="ID_fournisseur"
                      value={formData.ID_fournisseur}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Sélectionner un fournisseur</option>
                      {fournisseurs.map((fournisseur) => (
                        <option key={fournisseur.ID_fournisseur} value={fournisseur.ID_fournisseur}>
                          {fournisseur.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bon de Commande</label>
                    <input
                      type="text"
                      name="bon_de_commande"
                      value={formData.bon_de_commande}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bon de Livraison</label>
                    <input
                      type="text"
                      name="bon_de_livraison"
                      value={formData.bon_de_livraison}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">Ajouter</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Annuler</button>
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
                <h5 className="modal-title">Mettre à jour le Matériel</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <h5 className='text-center'>Informations Générales</h5>
                  <div className="mb-3">
                    <label className="form-label">Marque</label>
                    <input
                      type="text"
                      name="marque"
                      value={formData.marque}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Modèle</label>
                    <input
                      type="text"
                      name="modele"
                      value={formData.modele}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Numéro de Série</label>
                    <input
                      type="text"
                      name="numero_serie"
                      value={formData.numero_serie}//numero_inventaire
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Numéro d' inventaire</label>
                    <input
                      type="text"
                      name="numero_serie"
                      value={formData.numero_inventaire}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  {/* Formulaire pour Détails de la Configuration */}
                  <h5 className='text-center'>Détails de la Configuration</h5>
                  <div className="mb-3">
                    <label className="form-label">Catégorie</label>
                    <select
                      name="ID_categorie"
                      value={formData.ID_categorie}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Sélectionner la catégorie</option>
                      {categories.map((categorie) => (
                        <option key={categorie.ID_categorie} value={categorie.ID_categorie}>
                          {categorie.type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Configuration</label>
                    <input
                      type="text"
                      name="config"
                      value={formData.config}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">État</label>
                    <select
                      name="ID_etat"
                      value={formData.ID_etat}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Sélectionner l'état du Materiel</option>
                      {etats.map((etat) => (
                        <option key={etat.ID_etat} value={etat.ID_etat}>
                          {etat.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Formulaire pour Fournisseur et Documents */}
                  <h5 className='text-center'>Fournisseur et Documents</h5>
                  <div className="mb-3">
                    <label className="form-label">Fournisseur</label>
                    <select
                      name="ID_fournisseur"
                      value={formData.ID_fournisseur}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Sélectionner un fournisseur</option>
                      {fournisseurs.map((fournisseur) => (
                        <option key={fournisseur.ID_fournisseur} value={fournisseur.ID_fournisseur}>
                          {fournisseur.nom}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bon de Commande</label>
                    <input
                      type="text"
                      name="bon_de_commande"
                      value={formData.bon_de_commande}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bon de Livraison</label>
                    <input
                      type="text"
                      name="bon_de_livraison"
                      value={formData.bon_de_livraison}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">Mettre à jour</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Annuler</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materiel;
