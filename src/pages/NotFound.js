import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center">
                <h1 className="display-1 fw-bold text-danger">404</h1>
                <h2 className="mb-4">Oops! Page inexsistante </h2>
                <p className="lead mb-4">
                    Désolé, la page que vous recherchez n'existe pas.
                    <br />
                    Vous pouvez retourner à la <a href="/" className="link-primary">page d'accueil</a>.
                </p>
                <a href="/" className="btn btn-primary btn-lg">
                    Retourner à la page d'accueil
                </a>
            </div>
        </div>
    );
};

export default NotFound;
