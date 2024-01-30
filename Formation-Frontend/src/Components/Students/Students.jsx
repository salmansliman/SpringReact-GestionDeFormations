import React, { useEffect, useState } from "react";
import axios, { getRole } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import StudentService from "../../services/StudentService";

const Students = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [studentFilter, setStudentFilter] = useState("");
  const [formationFilter, setFormationFilter] = useState("");
  const [uniqueFormationNames, setUniqueFormationNames] = useState([]);
  const isFormateur = getRole() == "Formateur";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (isFormateur) {
      navigate("/dashboard");
    }
    const fetchData = async () => {
      try {
        const students = await StudentService.getAllStudents();
        setAllStudents(students);
        setFilteredStudents(students);

        const uniqueNames = [
          ...new Set(students.map((student) => student.formation.nomFormation)),
        ];
        setUniqueFormationNames(uniqueNames);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, [refreshFlag]);

  useEffect(() => {
    const filteredList = allStudents.filter((student) => {
      const nameMatch = student.name
        .toLowerCase()
        .includes(studentFilter.toLowerCase());
      const formationMatch = formationFilter
        ? student.formation.nomFormation === formationFilter
        : true;

      return nameMatch && formationMatch;
    });

    setFilteredStudents(filteredList);
  }, [studentFilter, formationFilter]);

  const handleButtonClick = (studentId) => {
    try {
      StudentService.acceptStudent(studentId)
        .then(() => {
          setRefreshFlag(!refreshFlag);
        })
        .catch((error) => {
          console.error("Error accepting student:", error);
        });
    } catch (error) {
      console.error("Error accepting student:", error);
    }
  };

  const handleDeleteStudent = (idStudent) => {
    try {
      StudentService.deleteStudent(idStudent)
        .then(() => {
          setRefreshFlag(!refreshFlag);
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
        });
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="teacher--list">
      <div className="list--header">
        <h2>Wait List</h2>
      </div>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Enter student name"
          value={studentFilter}
          onChange={(e) => setStudentFilter(e.target.value)}
        />
        <select
          value={formationFilter}
          onChange={(e) => setFormationFilter(e.target.value)}
        >
          <option value="">Select formation</option>
          {uniqueFormationNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {filteredStudents.length === 0 ? (
        <div className="empty-state">Nothing to show...</div>
      ) : (
        <div className="list--container">
          {filteredStudents.map((student) => (
            <div className="list" key={student.id}>
              <div className="teacher--detail">
                <h2>{student.name}</h2>
              </div>
              <span>{student.statue.toString()}</span>
              <span>{student.formation.nomFormation}</span>
              <button
                className="teacher--todo"
                onClick={() => handleDeleteStudent(student.id)}
              >
                Delete
              </button>
              <button
                onClick={() => handleButtonClick(student.id)}
                className="student-button"
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;
