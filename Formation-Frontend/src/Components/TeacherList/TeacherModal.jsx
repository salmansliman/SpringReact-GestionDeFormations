import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import TagsInput from "../TagsInput/TagsInput"; 
import {
  AiFillPlusSquare,
} from "react-icons/ai";

const TeacherModal = ({ isOpen, onClose, onSubmit, emailError, confirmPasswordError }) => {
  const [formData, setFormData] = useState({
    name: '',
    competences: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTagInputChange = (tags) => {
    setFormData((prevData) => ({
      ...prevData,
      competences: tags.join(', '),
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
      contentLabel="Add Teacher Modal"
      className="modal"
      emailError={"please check your email"} // Fixed typo here
    >
      <h2 className="modal-title">Add Teacher</h2>
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

        <label htmlFor="competences" className="modal-label">
          Competences:
        </label>
        <div className="input flex">
          <TagsInput selectedTags={handleTagInputChange} style={{ border: 1 }}/>
        </div>

        <label htmlFor="email" className="modal-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`modal-input ${emailError ? 'error' : ''}`}
        />
        {emailError && <p className="error-message">{emailError}</p>}

        <label htmlFor="password" className="modal-label">
          Password:{}
        </label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="modal-input password-input"
          />
          <span
            className={`password-toggle-icon ${showPassword ? 'visible' : ''}`}
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <label htmlFor="confirmPassword" className="modal-label">
          Confirm Password:
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={`modal-input ${confirmPasswordError ? 'error' : ''}`}
        />
        {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}

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

export default TeacherModal;
