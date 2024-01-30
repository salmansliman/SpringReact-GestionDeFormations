import React, { useEffect, useState } from "react";
import "./AddFormation.css";
import { Button } from "@material-ui/core";
import Modal from "./FormationModal";
import axios, { getRole } from "../../api/axios";
import { Navigate, useNavigate } from "react-router-dom";


const FormationList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allFormations,setAllFormations]=useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const isAdmin = getRole() == "Admin"
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleAddFormation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if(!isAdmin) {
      navigate("/dashboard");
    }

    axios
    .get("/formation/all",{
    })
    .then(function(response){
      console.log("alllll",response?.data)
      setAllFormations(response?.data)
    })
    .catch(function(error){
      console.error('Error fetching Formations',error);
    });
    console.log("All Formations in Dashboard",allFormations);
  },[refreshFlag]);

  const handleSubmitForm = (formData) => {
    const requestBody={
      nomFormation:formData.nomFormation,
      nbrHeures:formData.nbrHeurs,
      cout:formData.cout,
      objectifs:formData.objectifs,
      progammeDetails:formData.programmeDetails,
      categorie:formData.categorie
    };

    console.log(requestBody)

    axios.post('/formation/newFormation', requestBody,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Set the content type if needed
      },
    })
    .then(response => {
      console.log('Formation added successfully:', response.data);
      setIsModalOpen(false); 
      setRefreshFlag(!refreshFlag);
    })
    .catch(error => {
      console.error('Error adding course:', error);
    });
  };

  const handleDeleteFormation = (idFormation) => {
    const data={
      id: idFormation
    }
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }    

    axios.delete('/formation/DeleteById', {
      headers: {
        Authorization: 'Bearer ' + token, // Replace with your actual access token
        'Content-Type': 'application/json',
      },
      data: idFormation,
    })
      .then(response => {
        console.log('Success:', response.data);
        setRefreshFlag(!refreshFlag);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

  return (
    <div className="teacher--list">
      <div className="list--header">
        <h2>Formations</h2>
        <button type="button" onClick={handleAddFormation} className="addButton">
          Add Formation
        </button>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmitForm}
          />
        )}
      </div>
      {allFormations.length === 0 ? (
        <div className="empty-state">Nothing to show...</div>
      ) : (
        <div className="list--containerf">
          {allFormations.map((formation) => (
            <div className="listf" key={formation.id}>
              <div className="teacher--detail">
                <h2>{formation.nomFormation}</h2>
              </div>
              <span>{formation.dateDebut}</span>
              <span>{formation.formater ? formation.formater.name : 'null'}</span>
              <button className="teacher--todo" onClick={() => handleDeleteFormation(formation.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormationList;
