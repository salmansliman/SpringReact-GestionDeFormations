import React, { useEffect, useState } from "react";
import "./AddFormation.css";
import { Button } from "@material-ui/core";
import Modal from "./FormationModal";
import axios from "../../api/axios";


const FormationList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allFormations,setAllFormations]=useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const isAdmin = localStorage.getItem('role') == "ROLE_ADMIN"
  const isAssistance=localStorage.getItem('role') == "ROLE_ASSISTANT"
  const token = localStorage.getItem('token');
  const handleAddFormation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
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
      nbrHeurs:formData.nbrHeurs,
      cout:formData.cout,
      objectifs:formData.objectifs,
      programmeDetails:formData.programmeDetails
    };
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

  return (
    <div className="teacher--list">
      <div className="list--header">
        <h2>Formations</h2>
        <button type="button" onClick={handleAddFormation} className="add-formation-button">
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
      <div className="list--containerf">
  {allFormations.map((formation) => (
    <div className="list" key={formation.id}>
      <div className="teacher--detail">
        <h2>{formation.nomFormation}</h2>
      </div>
      <span>{formation.dateDebut}</span>
      <span>{formation.formater ? formation.formater.name : 'null'}</span>
      <span className="teacher--todo">:</span>
    </div>
  ))}
</div>

    </div>
  );
};

export default FormationList;
