import React, { useState } from "react";
import Modal from "react-modal";
import "./Modal.css";

const StudentEnrollmentModal = ({ isOpen = false, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    dob: "",
    tel: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (tel) => {
    // Simple phone number validation regex
    const telRegex = /^\d{10}$/;
    return telRegex.test(tel);
  };

  const handleSubmit = () => {
    const { name, lastname, email, dob, tel } = formData;

    // Basic validation for email and phone number
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidPhoneNumber(tel)) {
      alert("Please enter a valid phone number (10 digits).");
      return;
    }

    // If validations pass, submit the form
    onSubmit({ name, lastname, email, dob, tel });
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

        <label htmlFor="lastname" className="modal-label">
          Lastname:
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
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

        <label htmlFor="dob" className="modal-label">
          Date of Birth:
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="tel" className="modal-label">
          Phone Number:
        </label>
        <input
          type="tel"
          id="tel"
          name="tel"
          value={formData.tel}
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
