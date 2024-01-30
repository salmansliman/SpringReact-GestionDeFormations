import React, { useEffect, useState } from "react";
import "./AddEntreprise.css";
import { Button } from "@material-ui/core";
import Modal from "./EntrepriseModal";
import axios, { getRole } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import EntrepriseService from "../../services/EntrepriseService";

const EntrepriseList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allEntreprises, setAllEntreprises] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const isFormateur = getRole() == "Formateur";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleAddEntreprise = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isFormateur) {
      navigate("/dashboard");
    }
    EntrepriseService.getAllEntreprises(token)
      .then((response) => {
        setAllEntreprises(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching Entreprise", error);
      });
  }, [refreshFlag]);

  const handleSubmitForm = (formData) => {
    EntrepriseService.addEntreprise(token, formData)
      .then((response) => {
        setIsModalOpen(false);
        setRefreshFlag(!refreshFlag);
      })
      .catch((error) => {
        console.error("Error adding entreprise:", error);
      });
  };

  const handleDeleteEntreprise = (idEntreprise) => {
    EntrepriseService.deleteEntreprise(token, idEntreprise)
      .then((response) => {
        setRefreshFlag(!refreshFlag);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="teacher--list">
      <div className="list--header">
        <h2>Companies</h2>
        <button
          type="button"
          onClick={handleAddEntreprise}
          className="addButton"
        >
          Add Company
        </button>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmitForm}
          />
        )}
      </div>
      {allEntreprises.length === 0 ? (
        <div className="empty-state">Nothing to show...</div>
      ) : (
        <div className="list--container">
          {allEntreprises.map((entreprise) => (
            <div className="list" key={entreprise.idEntreprise}>
              <div className="teacher--detail">
                <h2>{entreprise.nomEntreprise}</h2>
              </div>
              <span>{entreprise.adresseEntreprise}</span>
              <span>{entreprise.telEntreprise}</span>
              <span>{entreprise.url}</span>
              <span>{entreprise.emailEntreprise}</span>
              <button
                className="teacher--todo"
                onClick={() => handleDeleteEntreprise(entreprise.idEntreprise)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntrepriseList;
