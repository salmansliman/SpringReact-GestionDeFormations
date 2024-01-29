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

    // Validate email
    if (!isEmailValid(email)) {
      console.error('Invalid email address');
      // You can set an email error state here if needed
      return;
    }

    // Validate password and confirmPassword
    if (password !== confirmPassword) {
      console.error('Password and confirm password do not match');
      // You can set a confirmPassword error state here if needed
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
        'Content-Type': 'application/json', // Set the content type if needed
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
  {allTeachers.map((teacher) => (
    <div className="list" key={teacher.id}>
      <div className="teacher--detail">
        <h2>{teacher.name}</h2>
      </div>
      <span>{teacher.competence}</span>
      <span className="teacher--todo">:</span>

      
    </div>
  ))}
</div>

    </div>
  );
};

export default TeacherList;
