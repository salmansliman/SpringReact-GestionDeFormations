import React, { useEffect, useState } from "react";
import "./AddEntreprise.css";
import { Button } from "@material-ui/core";
import Modal from "./EntrepriseModal";
import axios from "../../api/axios";


const EntrepriseList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allEntreprises,setAllEntreprises]=useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const isAdmin = localStorage.getItem('role') == "ROLE_ADMIN"
  const isAssistance=localStorage.getItem('role') == "ROLE_ASSISTANT"
  const token = localStorage.getItem('token');
  const handleAddEntreprise = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    axios
    .get("/entreprise/all",{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Set the content type if needed
      },
    })
    .then(function(response){
      console.log("alllll",response?.data)
      setAllEntreprises(response?.data)
    })
    .catch(function(error){
      console.error('Error fetching Entreprise',error);
    });
    console.log("All Entreprises in Dashboard",allEntreprises);
  },[refreshFlag]);
  const handleSubmitForm = (formData) => {
    const requestBody={
      nomEntreprise:formData.nomEntreprise,
      adresseEntreprise:formData.adresseEntreprise,
      telEntreprise:formData.telEntreprise,
      url:formData.url,
      emailEntreprise:formData.emailEntreprise
    };
    axios.post('/entreprise/newEntreprise', requestBody,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Set the content type if needed
      },
    })
    .then(response => {
      console.log('Entreprise added successfully:', response.data);
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
        <h2>Companies</h2>
        <button type="button" onClick={handleAddEntreprise} className="addButton">
          Add Company
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
  {allEntreprises.map((Entreprise) => (
    <div className="list" key={Entreprise.idEntreprise}>
      <div className="teacher--detail">
        <h2>{Entreprise.nomEntreprise}</h2>
      </div>
      <span>{Entreprise.adresseEntreprise}</span>
      <span>{Entreprise.telEntreprise}</span>
      <span>{Entreprise.url}</span>
      <span>{Entreprise.emailEntreprise}</span>
      <span className="teacher--todo">:</span>
    </div>
  ))}
</div>

    </div>
  );
};

export default EntrepriseList;
