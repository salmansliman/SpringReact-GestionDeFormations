import React, { useEffect, useState } from "react";
import "./TeacherList.css";
import { Button } from "@material-ui/core";
import Modal from "./TeacherModal";
import axios from "../../api/axios";


const TeacherList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allTeachers,setAllTeachers]=useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const isAdmin = localStorage.getItem('role') == "ROLE_ADMIN"
  const isAssistance=localStorage.getItem('role') == "ROLE_ASSISTANT"
  const token = localStorage.getItem('token');
  
  const handleAddTeacher = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
    .get("/users/getAllFormaters",{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Set the content type if needed
      },
    })
    .then(function(response){
      console.log("alllll",response?.data)
      setAllTeachers(response?.data)
    })
    .catch(function(error){
      console.error('Error fetching Teachers',error);
    });
    console.log("All Teachers in Dashboard",allTeachers);
  },[refreshFlag]);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmitForm = (formData) => {
    const { email, password, confirmPassword } = formData;

    if (!isEmailValid(email)) {
      console.error('Invalid email address');
      return;
    }

    if (password !== confirmPassword) {
      console.error('Password and confirm password do not match');
      return;
    }
    const requestBody={
      name:formData.name,
      email:formData.email,
      password:formData.password,
      competence:formData.competences
    };
    axios.post('/users/newFormaterInterne', requestBody,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('Teacher added successfully:', response.data);
      setIsModalOpen(false); 
      setRefreshFlag(!refreshFlag);
    })
    .catch(error => {
      console.error('Error adding course:', error);
    });

  };

  const handleDeleteTeacher = (idFormateur) => {
    const data={
      id: idFormateur
    }
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }    

    axios.delete('/users/deleteFormater', {headers, data})
    .then(response => {
      console.log('Teacher deleted successfully:', response.data);
      setRefreshFlag(!refreshFlag);
    })
    .catch(error => {
      console.error('Error deleting teacher:', error);
    });  
  }

  return (
    <div className="teacher--list">
      <div className="list--header">
        <h2>Formateurs</h2>
        <button className="teacher--add" type="button" onClick={handleAddTeacher}>
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
            <button className="teacher--todo" onClick={() => handleDeleteTeacher(teacher.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherList;
