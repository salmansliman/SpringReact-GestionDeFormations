// CourseModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';
import { BiAddToQueue } from 'react-icons/bi';

const CourseModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    cost: '',
    goals: '',
    details: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Use regex to allow only numeric values for cost and duration
    if (name === 'cost' || name === 'duration') {
      if (/^[0-9]*$/.test(value) || value === '') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    // Add validation logic here if needed
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
      contentLabel="Add Course Modal"
      className="modal"
    >
      <h2 className="modal-title">Add Course</h2>
      <form className="modal-form">
        <label htmlFor="title" className="modal-label">
          Course Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="duration" className="modal-label">
          Duration:
        </label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="cost" className="modal-label">
          Cost:
        </label>
        <input
          type="text"
          id="cost"
          name="cost"
          value={formData.cost}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="goals" className="modal-label">
          Goals:
        </label>
        <input
          type="text"
          id="goals"
          name="goals"
          value={formData.goals}
          onChange={handleInputChange}
          className="modal-input"
        />

        <label htmlFor="details" className="modal-label">
          Course Details:
        </label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
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

export default CourseModal;
