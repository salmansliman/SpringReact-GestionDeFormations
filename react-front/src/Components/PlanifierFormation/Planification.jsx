import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import axios from "../../api/axios";
import PlanificationModal from "./PlanificationModal"; // Assuming correct path

const Planification = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allFormations, setAllFormations] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [formData, setFormData] = useState({
    idFormation: '',
    dateDebut: '',
    dateEnd: '',
    ville:'',
    formaterId: '',
    entrepriseId: '',
  });

  const isAdmin = localStorage.getItem('role') === "ROLE_ADMIN";
  const isAssistance = localStorage.getItem('role') === "ROLE_ASSISTANT";
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get("/formation/all", {})
      .then(function (response) {
        console.log("alllll", response?.data);
        setAllFormations(response?.data);
        const planifications = response.data;
        const events = planifications.map((planification) => ({
          id: planification.id,
          title:planification.nomFormation,
          start: planification.dateDebut,
          end: planification.dateEnd,
          allDay: true,
         
        }));
        setCurrentEvents(events);
        console.log("events",events);
      })
      .catch(function (error) {
        console.error('Error fetching Formations', error);
      });
  }, [refreshFlag]);
  

  const handleSubmitForm = () => {
    const requestBody = {
      "id": parseInt(formData.idFormation, 10),
      "dateDebut": formData.dateDebut,
      "dateEnd": formData.dateEnd,
      "ville":formData.ville,
      "formater": {
          "id": parseInt(formData.formaterId, 10)
      },
      "entreprise": {
          "idEntreprise": parseInt(formData.entrepriseId, 10)
      }
    };

    axios.put('/formation/updateFormation', requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Formation updated successfully:', response.data);
        setIsModalOpen(false);
        setRefreshFlag(!refreshFlag);
      })
      .catch(error => {
        console.error('Error updating formation:', error);
      });
  };

  const handleAddFormation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <FullCalendar
        height="75vh"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={currentEvents}
      />
      
      <button type="button" onClick={handleAddFormation} className="add-formation-button">
        Add Formation
      </button>
      {isModalOpen && (
        <PlanificationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitForm}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default Planification;
