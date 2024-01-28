// Content.jsx
import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Content.css";
import TeacherList from "../TeacherList/TeacherList";
import { BiAddToQueue, BiSearch } from "react-icons/bi";
import CourseModal from "./CourseModal"; // Import the CourseModal
import axios, { getRole, isAdmin } from "../../api/axios";

const Content = () => {
  const [allFormations, setAllFormations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const isAdmin = localStorage.getItem('role') == "ROLE_ADMIN"

  const filteredFormations = allFormations.filter((formation) => {
    if (!formation.nomFormation) {
      console.warn("Skipping undefined nomFormation:", formation);
      return false;
    }
  
    return formation.nomFormation.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenCourseModal = () => {
    setIsCourseModalOpen(true);
  };

  const handleCloseCourseModal = () => {
    setIsCourseModalOpen(false);
  };
  
  useEffect(() => {
    axios
    .get("/formation/all")
    .then(function (response) {
      console.log(response?.data)
      setAllFormations(response?.data)
    })
    .catch(function (error) {
        console.error('Error fetching formations:', error);
    });
    console.log("ALL FORMATIONS in DashboardHome:", allFormations);
}, [refreshFlag]);


  const handleAddCourse = (formData) => {
    const requestBody = {
      nomFormation: formData.title,
      nbrHeures: parseInt(formData.duration),
      cout: parseFloat(formData.cost), 
      objectifs: formData.goals,
      progammeDetails: formData.details,
    };
    const token = localStorage.getItem('token');

    axios.post('/formation/newFormation', requestBody,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Set the content type if needed
      },
    })
      .then(response => {
        console.log('Course added successfully:', response.data);
        setIsCourseModalOpen(false); 
        setRefreshFlag(!refreshFlag);
      })
      .catch(error => {
        console.error('Error adding course:', error);
      });
  };


  return (
    <div className="content">
      <div className="content--header">
        <h1 className="header--title">Dashboard</h1>
        <div className="header--activity">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <BiSearch className="icon" />
          </div>

          {isAdmin && (
            <div className="notify">
              <BiAddToQueue className="icon" onClick={handleOpenCourseModal} />
            </div>
          )}
        </div>
      </div>
      <Card formations={filteredFormations} />
      <TeacherList />
      <CourseModal isOpen={isCourseModalOpen} onClose={handleCloseCourseModal} onSubmit={handleAddCourse} />
    </div>
  );
};

export default Content;

