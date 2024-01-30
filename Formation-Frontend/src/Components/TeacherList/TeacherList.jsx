import React, { useEffect, useState } from "react";
import "./TeacherList.css";
import Modal from "./TeacherModal";
import axios from "../../api/axios";
import TeacherService from "../../services/TeacherService";

const TeacherList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allTeachers, setAllTeachers] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const token = localStorage.getItem("token");

  const handleAddTeacher = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachers = await TeacherService.getAllTeachers();
        setAllTeachers(teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchData();
  }, [refreshFlag]);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmitForm = (formData) => {
    try {
      TeacherService.addTeacher(formData)
        .then(() => {
          setIsModalOpen(false);
          setRefreshFlag(!refreshFlag);
        })
        .catch((error) => {
          console.error("Error adding teacher:", error);
        });
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const handleDeleteTeacher = (idFormateur) => {
    try {
      TeacherService.deleteTeacher(idFormateur)
        .then(() => {
          setRefreshFlag(!refreshFlag);
        })
        .catch((error) => {
          console.error("Error deleting teacher:", error);
        });
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="teacher--list">
      <div className="list--header">
        <h2>Formateurs</h2>
        <button
          className="teacher--add"
          type="button"
          onClick={handleAddTeacher}
        >
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
      {allTeachers.length === 0 ? (
        <div className="empty-state">Nothing to show...</div>
      ) : (
        <div className="list--container">
          {allTeachers.map((teacher) => (
            <div className="list" key={teacher.id}>
              <div className="teacher--detail">
                <h2>{teacher.name}</h2>
              </div>
              <span>{teacher.competence}</span>
              <button
                className="teacher--todo"
                onClick={() => handleDeleteTeacher(teacher.id)}
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

export default TeacherList;
