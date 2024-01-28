import React, { useState, useEffect } from 'react';
import axios from "../../api/axios";
import Modal from 'react-modal';
import './Modal.css';

const PlanificationModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  const [allFormations, setAllFormations] = useState([]);
  const [allFormateurs, setAllFormateurs] = useState([]);
  const [allEntreprises, setAllEntreprises] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const isAdmin = localStorage.getItem('role') === "ROLE_ADMIN";
  const isAssistant = localStorage.getItem('role') === "ROLE_ASSISTANT";
  const token = localStorage.getItem('token');
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    // Fetch formateurs
    axios.get('/users/getAllFormaters', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        
        setAllFormateurs(response?.data);
        setRefreshFlag(!refreshFlag);
      })
      .catch(error => {
        console.error('Error fetching formateurs:', error);
      });

    // Fetch entreprises
    axios.get('/entreprise/all', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Entreprises:', response.data);
        setAllEntreprises(response?.data);
        setRefreshFlag(!refreshFlag);
      })
      .catch(error => {
        console.error('Error fetching entreprises:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('/formation/null', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Formations null:', response.data);
        setAllFormations(response?.data);
        setIsModalOpen(false);
        setRefreshFlag(!refreshFlag);
      })
      .catch(error => {
        console.error('Error fetching formations:', error);
      });

  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const formattedData = {
      "id": parseInt(formData.idFormation, 10),
      "dateDebut": formData.dateDebut,
      "dateEnd": formData.dateEnd, // Change this to match your backend property name
      "ville": formData.ville,
      "formateur": {
        "id": parseInt(formData.formateurId, 10)
      },
      "entreprise": {
        "idEntreprise": parseInt(formData.entrepriseId, 10)
      },
    };

    console.log('Formatted Data:', formattedData);

    onSubmit(formattedData);
    setIsModalOpen(false);
    onClose();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Add Formation Modal"
      className="modal"
      ariaHideApp={false}
    >
      <h2 className="modal-title">Update Formation</h2>
      <form className="modal-form">
        <label htmlFor="idFormation" className="modal-label">
          Formation:
        </label>
        <select
          id="idFormation"
          name="idFormation"
          value={formData.idFormation}
          onChange={handleInputChange}
          className="modal-input"
        >
          <option value="">Select Formation</option>
          {allFormations.map(({ id, nomFormation }) => (
            <option key={id} value={id}>
              {nomFormation}
            </option>
          ))}
        </select>

        <label htmlFor="dateDebut" className="modal-label">
          Date Debut:
        </label>
        <input
          type="date"
          id="dateDebut"
          name="dateDebut"
          value={formData.dateDebut}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="dateEnd" className="modal-label">
          Date End:
        </label>
        <input
          type="date"
          id="dateEnd"
          name="dateEnd"
          value={formData.dateEnd}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="ville" className="modal-label">
          Ville:
        </label>
        <input
          type="text"
          id="ville"
          name="ville"
          value={formData.ville}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="formateurId" className="modal-label">
          Formateur:
        </label>
        <select
          id="formateurId"
          name="formateurId"
          value={formData.formateurId}
          onChange={handleInputChange}
          className="modal-input"
        >
          <option value="">Select Formateur</option>
          {allFormateurs.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <label htmlFor="entrepriseId" className="modal-label">
          Entreprise:
        </label>
        <select
          id="entrepriseId"
          name="entrepriseId"
          value={formData.entrepriseId}
          onChange={handleInputChange}
          className="modal-input"
        >
          <option value="">Select Entreprise</option>
          {allEntreprises.map(({ idEntreprise, nomEntreprise }) => (
            <option key={idEntreprise} value={idEntreprise}>
              {nomEntreprise}
            </option>
          ))}
        </select>

        <div className="modal-buttons">
          <button type="button" onClick={handleSubmit} className="modal-save-btn">
            Save
          </button>
          <button type="button" onClick={handleClose} className="modal-cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PlanificationModal;
