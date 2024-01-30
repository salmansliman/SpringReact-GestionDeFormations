import React, { useEffect, useState } from "react";
import "./AddFormation.css";
import { Button } from "@material-ui/core";
import Modal from "./FormationModal";
import axios, { getRole } from "../../api/axios";
import { Navigate, useNavigate } from "react-router-dom";
import FormationService from "../../services/FormationService";

const FormationList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allFormations, setAllFormations] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const isAdmin = getRole() == "Admin";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleAddFormation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/dashboard");
    }

    FormationService.getAllFormations()
      .then((data) => {
        setAllFormations(data);
      })
      .catch((error) => {
        console.error("Error fetching Formations", error);
      });
  }, [refreshFlag]);

  const handleSubmitForm = (formData) => {
    FormationService.addFormation(token, formData)
      .then((response) => {
        setIsModalOpen(false);
        setRefreshFlag(!refreshFlag);
      })
      .catch((error) => {
        console.error("Error adding formation:", error);
      });
  };

  const handleDeleteFormation = (idFormation) => {
    FormationService.deleteFormationById(token, idFormation)
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
        <h2>Formations</h2>
        <button
          type="button"
          onClick={handleAddFormation}
          className="addButton"
        >
          Add Formation
        </button>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmitForm}
          />
        )}
      </div>
      {allFormations.length === 0 ? (
        <div className="empty-state">Nothing to show...</div>
      ) : (
        <div className="list--containerf">
          {allFormations.map((formation) => (
            <div className="listf" key={formation.id}>
              <div className="teacher--detail">
                <h2>{formation.nomFormation}</h2>
              </div>
              <span>{formation.dateDebut}</span>
              <span>
                {formation.formater ? formation.formater.name : "null"}
              </span>
              <button
                className="teacher--todo"
                onClick={() => handleDeleteFormation(formation.id)}
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

export default FormationList;
