import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const EntrepriseModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nomEntreprise: '',
    adresseEntreprise: '',
    telEntreprise: '',
    url: '',
    emailEntreprise: '',
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
        <label htmlFor="nomEntreprise" className="modal-label">
          Name:
        </label>
        <input
          type="text"
          id="nomEntreprise"
          name="nomEntreprise"
          value={formData.nomEntreprise}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="adresseEntreprise" className="modal-label">
          Adresse:
        </label>
        <input
          type="text"
          id="adresseEntreprise"
          name="adresseEntreprise"
          value={formData.adresseEntreprise}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="telEntreprise" className="modal-label">
          Tel:
        </label>
        <input
          type="text"
          id="telEntreprise"
          name="telEntreprise"
          value={formData.telEntreprise}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="url" className="modal-label">
          Url:
        </label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="emailEntreprise" className="modal-label">
          Email:
        </label>
        <div className="modal-label">
          <input
            type="email"
            id="emailEntreprise"
            name="emailEntreprise"
            value={formData.emailEntreprise}
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

export default EntrepriseModal;
