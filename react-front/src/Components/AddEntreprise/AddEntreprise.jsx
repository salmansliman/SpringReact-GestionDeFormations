import React, { useEffect, useState } from "react";
import "./AddEntreprise.css";
import { Button } from "@material-ui/core";
import Modal from "./EntrepriseModal";
import axios, {getRole} from "../../api/axios";
import { useNavigate } from "react-router-dom";

const EntrepriseList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allEntreprises,setAllEntreprises]=useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const isFormateur = getRole() == "Formateur" 
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  const handleAddEntreprise = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if(isFormateur) {
      navigate("/dashboard")
    }
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

  const handleDeleteEntreprise = (idEntreprise) => {
    axios.delete('/entreprise/delete', {
      headers: {
        Authorization: 'Bearer ' + token, // Replace with your actual access token
        'Content-Type': 'application/json',
      },
      data: {
        idEntreprise: idEntreprise},
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
      {allEntreprises.length === 0 ? (
        <div className="empty-state">Nothing to show...</div>
      ) : (
        <div className="list--container">
          {allEntreprises.map((entreprise) => (
            <div className="list" key={entreprise.idEntreprise}>
              <div className="teacher--detail">
                <h2>{entreprise.nomEntreprise}</h2>
              </div>
              <span>{entreprise.adresseEntreprise}</span>
              <span>{entreprise.telEntreprise}</span>
              <span>{entreprise.url}</span>
              <span>{entreprise.emailEntreprise}</span>
              <button className="teacher--todo" onClick={() => handleDeleteEntreprise(entreprise.idEntreprise)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntrepriseList;
