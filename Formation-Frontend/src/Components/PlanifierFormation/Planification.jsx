import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import axios, { getRole } from "../../api/axios";
import PlanificationModal from "./PlanificationModal";
import "./planifier.css";
import PlanificationService from "../../services/PlanificationService";

const Planification = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allFormations, setAllFormations] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [formData, setFormData] = useState({
    idFormation: "",
    dateDebut: "",
    dateEnd: "",
    ville: "",
    formaterId: "",
    entrepriseId: "",
  });

  const token = localStorage.getItem("token");
  const isFormateur = getRole() == "Formateur";

  useEffect(() => {
    PlanificationService.getAllFormations()
      .then((formations) => {
        setAllFormations(formations);
        const events = formations.map((formation) => ({
          id: formation.id,
          title: formation.nomFormation,
          start: formation.dateDebut,
          end: formation.dateEnd,
          allDay: true,
        }));
        setCurrentEvents(events);
      })
      .catch((error) => {
        console.error("Error fetching Formations", error);
      });
  }, [refreshFlag]);

  const handleSubmitForm = async () => {
    try {
      await PlanificationService.updateFormation(token, formData);
      setIsModalOpen(false);
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      console.error("Error updating formation:", error);
    }
  };

  const handleAddFormation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {!isFormateur && (
        <button
          type="button"
          onClick={handleAddFormation}
          className="addButton"
        >
          Plan Formation
        </button>
      )}
      {!isModalOpen && (
        <div className="calendar">
          <FullCalendar
            height="auto"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
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
        </div>
      )}

      {isModalOpen && (
        <PlanificationModal
          className="modalShow"
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
