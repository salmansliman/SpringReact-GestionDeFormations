import React, { useState } from "react";
import "./TeacherList.css";
import { Button } from "@material-ui/core";
import Modal from "./TeacherModal";

const teachers = [
  {
    name: "Prof. John Doe",
    phone: "0677889911",
    competences: "Javascript",
  },
  {
    name: "Prof. Salman Sliman",
    phone: "0677889911",
    competences: "Springboot",
  },
  {
    name: "Prof. Cheknane",
    phone: "0677889911",
    competences: "React",
  },
];

const TeacherList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTeacher = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitForm = (formData) => {
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
    setIsModalOpen(false);
    handleCloseModal();
  };

  return (
    <div className="teacher--list">
      <div className="list--header">
        <h2>Formateurs</h2>
        <button type="button" onClick={handleAddTeacher}>
          Add Teacher
        </button>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmitForm}
          />
        )}
      </div>
      <div className="list--container">
        {teachers.map((teacher) => (
          <div className="list">
            <div className="teacher--detail">
              <h2>{teacher.name}</h2>
            </div>
            <span>{teacher.phone}</span>
            <span>{teacher.competences}</span>
            <span className="teacher--todo">:</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;
