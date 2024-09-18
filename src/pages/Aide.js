// src/pages/Aide.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import materiel from '../assets/imgHelp/materiel.png';
import materiel2 from '../assets/imgHelp/materiel2.png';
import materiel3 from '../assets/imgHelp/materiel3.png';
import filtre3 from '../assets/imgHelp/filtre3.png';
import filtre from '../assets/imgHelp/filtre.png';
import filtre1 from '../assets/imgHelp/filtre1.png';
import filtre5 from '../assets/imgHelp/filtre5.png';
import affectation from '../assets/imgHelp/affectation.png';
import affectation2 from '../assets/imgHelp/affectation2.png';
import affectation4 from '../assets/imgHelp/affectation4.png';
import inventaire from '../assets/imgHelp/inventaire.png';



const Aide = () => {
    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white">
                    <h2>Aide</h2>
                </div>
                <div className="card-body">
                    <h4>Bienvenue sur la page d'aide</h4>
                    <p>Cette page vous guidera à travers les différentes fonctionnalités de l'application et fournira des réponses aux questions fréquemment posées.</p>

                    <hr />

                    <h5>Section 1: Gestion des Matériels</h5>
                    <p>Pour ajouter un nouveau matériel, cliquez sur le bouton "Ajouter Matériel" dans la page de gestion des matériels. </p>
                    <img src={materiel} alt="Gestion des Matériels" className="img-fluid" />
                    <br></br> <br></br><br></br>
                    <p>Remplissez le formulaire avec les informations requises, puis cliquez sur "Enregistrer".</p>
                    <div className="d-flex justify-content-center">
                        <img src={materiel3} alt="Gestion des Matériels" className="img-fluid" />
                    </div>
                    <br></br> <br></br><br></br>
                    <p>Pour modifier ou supprimer les Matériels , scrollez à droite et cliquez sur les boutton respectives suivant .</p>
                    <div className="d-flex justify-content-center">
                        <img src={materiel2} alt="Gestion des Matériels" className="img-fluid" />
                    </div>

                    <br></br> <br></br><br></br>
                    <p>Pour avoir une meilleure visibilité , vous pouvez modifier manuelement vos colonne ; </p>
                    <div className="d-flex justify-content-center">
                        <img src={filtre3} alt="filtre" className="img-fluid" />
                    </div>


                    <br></br> <br></br><br></br>
                    <p>Cliquez sur l'icon 3 points ,</p>
                    <div className="d-flex justify-content-center">
                        <img src={filtre} alt="filtre" className="img-fluid" />
                    </div> <br></br>
                    <p> Vous verrez tous les options de visibilité</p>
                    <div className="d-flex justify-content-center">
                        <img src={filtre1} alt="filtre" className="img-fluid" />
                    </div><br></br>
                    <div className="d-flex justify-content-center">
                        <img src={filtre5} alt="filtre" className="img-fluid" />
                    </div>



                    <h5>Section 2: Affectation des Matériels</h5>
                    <p>Pour attribuer un matériel à un utilisateur, accédez à la page "Affectation" et sélectionnez le matériel à attribuer dans la liste. Remplissez les informations nécessaires et cliquez sur "Affecter".</p>
                    <div className="d-flex justify-content-center">
                        <img src={affectation} alt="affectation" className="img-fluid" />
                    </div>
                    <br></br>
                    <p>Aprés chaque affectation , la status du materiel affecté serra mis en oui</p>
                    <div className="d-flex justify-content-center">
                        <img src={affectation4} alt="affectation" className="img-fluid" />
                    </div>
                        <br></br>
                    <p>Vous pouvez désafecter les matériels , cliquez sur cette bouton</p>
                    <div className="d-flex justify-content-center">
                        <img src={affectation2} alt="affectation" className="img-fluid" />
                    </div>
                    <p>Les matériels désafecter seront mis en stock et une historique serra générer automatiquement</p>

                    <h5>Section 3: Page Inventaire</h5>
                    <p>La page inventaire est dédié à l'affichage des matériels non attribué grouper par code Materiel</p>
                    <div className="d-flex justify-content-center">
                        <img src={inventaire} alt="inventaire" className="img-fluid" />
                    </div>

                    <h5>Section 4: Gestion des Utilisateurs</h5>
                    <p>Dans la page "Utilisateurs", vous pouvez ajouter, modifier et supprimer des utilisateurs. Utilisez les boutons appropriés pour effectuer ces actions.</p>

                    <hr />

                    <h5>Questions Fréquemment Posées</h5>
                    <p><strong>Q:</strong> Comment réinitialiser l'insertion or , l'élément à insérer n'est pas dans le champ ?</p>
                    <p><strong>R:</strong> L'administrateur se charge d'ajouter les élements possible à insérer.</p>

                    <p><strong>Q:</strong> Comment réinitialiser mon mot de passe ?</p>
                    <p><strong>R:</strong> Contactez l'administrateur système pour réinitialiser votre mot de passe.</p>

                    <p><strong>Q:</strong> Comment voir l'historique des affectations de matériels ?</p>
                    <p><strong>R:</strong> Accédez à la page "Affectation" pour voir l'historique des affectations des matériels.</p>

                    <div className="mt-4">
                        <p>Pour toute autre question, veuillez contacter l'administrateur.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aide;
