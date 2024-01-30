import React, { useState } from "react";
import Modal from "react-modal";
import "./Modal.css";

const StudentEnrollmentModal = ({ isOpen = false, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
      contentLabel="Enroll Student Modal"
      ariaHideApp={false}
      className="modal"
    >
      <h2 className="modal-title">Enroll Student</h2>
      <form className="modal-form">
        <label htmlFor="name" className="modal-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="email" className="modal-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="modal-input"
        />

        <div className="modal-buttons">
          <button
            type="button"
            onClick={handleSubmit}
            className="modal-save-btn"
          >
            Enroll
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="modal-cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StudentEnrollmentModal;
