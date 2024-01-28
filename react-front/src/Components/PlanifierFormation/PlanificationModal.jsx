import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';

const PlanificationModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Format the data before submitting
    const formattedData = {
        "id": parseInt(formData.idFormation, 10),
        "dateDebut": formData.dateDebut,
        "dateEnd": formData.dateEnd,
        "formater": {
            "id": parseInt(formData.formaterId, 10)
        },
        "entreprise": {
            "idEntreprise": parseInt(formData.entrepriseId, 10)
        }
    };

    // Log the formatted data before submitting
    console.log('Formatted Data:', formattedData);

    // Call the onSubmit function with the formatted data
    onSubmit(formattedData);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Formation Modal"
      className="modal"
    >
      <h2 className="modal-title">Update Formation</h2>
      <form className="modal-form">
        <label htmlFor="idFormation" className="modal-label">
          idFormation:
        </label>
        <input
          type="number"
          id="idFormation"
          name="idFormation"
          value={formData.idFormation}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="dateDebut" className="modal-label">
          dateDebut:
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
          dateEnd:
        </label>
        <input
          type="date"
          id="dateEnd"
          name="dateEnd"
          value={formData.dateEnd}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="formaterId" className="modal-label">
          formaterId:
        </label>
        <input
          type="number"
          id="formaterId"
          name="formaterId"
          value={formData.formaterId}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="entrepriseId" className="modal-label">
          entrepriseId:
        </label>
        <input
          type="number"
          id="entrepriseId"
          name="entrepriseId"
          value={formData.entrepriseId}
          onChange={handleInputChange}
          className="modal-input"
        />

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
