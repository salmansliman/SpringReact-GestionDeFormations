import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormationModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nomFormation: '',
    nbrHeurs: '',
    cout: '',
    objectifs: '',
    programmeDetails: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
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
      <h2 className="modal-title">Add Formation</h2>
      <form className="modal-form">
        <label htmlFor="nomFormation" className="modal-label">
          Name:
        </label>
        <input
          type="text"
          id="nomFormation"
          name="nomFormation"
          value={formData.nomFormation}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="nbrHeurs" className="modal-label">
          nbrHeurs:
        </label>
        <input
          type="number"
          id="nbrHeurs"
          name="nbrHeurs"
          value={formData.nbrHeurs}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="cout" className="modal-label">
          Cout:
        </label>
        <input
          type="number"
          id="cout"
          name="cout"
          value={formData.cout}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="objectifs" className="modal-label">
          objectifs:
        </label>
        <input
          type="text"
          id="objectifs"
          name="objectifs"
          value={formData.objectifs}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="programmeDetails" className="modal-label">
          programmeDetails:
        </label>
        <div className="modal-label">
          <input
            type="text"
            id="programmeDetails"
            name="programmeDetails"
            value={formData.programmeDetails}
            onChange={handleInputChange}
            className="modal-input"
          />
        </div>

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

export default FormationModal;
