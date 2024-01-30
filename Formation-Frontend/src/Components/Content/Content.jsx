import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Content.css";
import TeacherList from "../TeacherList/TeacherList";
import { BiAddToQueue, BiSearch } from "react-icons/bi";
import CourseModal from "./CourseModal";
import axios, { getRole, isAdmin } from "../../api/axios";
import CourseService from "../../services/CourseService";

const Content = () => {
  const [allFormations, setAllFormations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const isAdmin = getRole() == "Admin";
  const isAssistant = getRole() == "Assistant";
  const isFormateur = getRole() == "Formateur";

  const filteredFormations = allFormations.filter((formation) => {
    if (!formation.nomFormation) {
      console.warn("Skipping undefined nomFormation:", formation);
      return false;
    }

    return formation.nomFormation
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
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
    CourseService.getAllCourses()
      .then((data) => {
        setAllFormations(data);
      })
      .catch((error) => {
        console.error("Error fetching Courses", error);
      });
  }, [refreshFlag]);

  const handleAddCourse = (formData) => {
    const token = localStorage.getItem("token");
    CourseService.addCourse(token, formData)
      .then((response) => {
        setIsCourseModalOpen(false);
        setRefreshFlag(!refreshFlag);
      })
      .catch((error) => {
        console.error("Error adding course:", error);
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
      {(isAdmin || isAssistant) && <TeacherList />}

      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={handleCloseCourseModal}
        onSubmit={handleAddCourse}
      />
    </div>
  );
};

export default Content;

const Nothing = () => {
  <div>Nothing to show</div>;
};
