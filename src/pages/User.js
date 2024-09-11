import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Utilisateur = () => {
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        nom: '',
        ID_service: '',
    });
    const [selectedId, setSelectedId] = useState(null); // ID de l'utilisateur sélectionné pour modification
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/getUser');
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            setError("Une erreur est survenue lors de la récupération des utilisateurs.");
        } finally {
            setLoading(false);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:8000/getUser/service');
            setServices(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des services:', error);
            setError("Une erreur est survenue lors de la récupération des services.");
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchServices();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/getUser', formData);
            setFormData({ nom: '', ID_service: '' });
            toast.success('Utilisateur ajouté avec succès !');
            setShowModal(false);
            fetchUsers();
        } catch (error) {
            toast.error("Une erreur est survenue lors de l'ajout de l'utilisateur.");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/getUser/${selectedId}`, formData);
            setFormData({ nom: '', ID_service: '' });
            toast.success('Utilisateur mis à jour avec succès !');
            setShowUpdateModal(false);
            fetchUsers();
        } catch (error) {
            toast.error("Une erreur est survenue lors de la mise à jour de l'utilisateur.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            try {
                await axios.delete(`http://localhost:8000/getUser/${id}`);
                toast.success('Utilisateur supprimé avec succès !');
                fetchUsers();
            } catch (error) {
                toast.error("Une erreur est survenue lors de la suppression de l'utilisateur.");
            }
        }
    };

    const handleEdit = (id) => {
        const selectedUser = users.find((user) => user.ID_utilisateur === id);
        setFormData({
            nom: selectedUser.nom || '',
            ID_service: selectedUser.ID_service || '', // Utilisation de l'ID du service
        });
        setSelectedId(id);
        setShowUpdateModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
        setShowUpdateModal(false);
        setFormData({ nom: '', ID_service: '' });
        setSelectedId(null); // Réinitialiser la sélection
    };

    const columns = [
        { field: 'nom', headerName: 'Nom', width: 200 },
        { field: 'service', headerName: 'Service', width: 750 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <div>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(params.row.ID_utilisateur)}>
                        <FaEdit />
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(params.row.ID_utilisateur)}>
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
                        <button className="btn btn-success" onClick={() => setShowModal(true)}>
                            Ajouter Utilisateur
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
                                rows={users}
                                columns={columns}
                                pageSize={5}
                                getRowId={(row) => row.ID_utilisateur}
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
                                <h5 className="modal-title">Ajouter un Utilisateur</h5>
                                <button type="button" className="btn-close" onClick={handleCancel}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleAdd}>
                                    <div className="mb-3">
                                        <label className="form-label">Nom</label>
                                        <input
                                            type="text"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Service</label>
                                        <select
                                            name="ID_service"
                                            value={formData.ID_service}
                                            onChange={handleChange}
                                            className="form-select"
                                            required
                                        >
                                            <option value="">Sélectionner le service</option>
                                            {services.map((service) => (
                                                <option key={service.ID_service} value={service.ID_service}>
                                                    {service.Nom}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Ajouter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de modification */}
            {showUpdateModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modifier un Utilisateur</h5>
                                <button type="button" className="btn-close" onClick={handleCancel}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-3">
                                        <label className="form-label">Nom</label>
                                        <input
                                            type="text"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Service</label>
                                        <select
                                            name="ID_service"
                                            value={formData.ID_service}
                                            onChange={handleChange}
                                            className="form-select"
                                            required
                                        >
                                            <option value="">Sélectionner le service</option>
                                            {services.map((service) => (
                                                <option key={service.ID_service} value={service.ID_service}>
                                                    {service.Nom}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Mettre à jour</button>
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

export default Utilisateur;
