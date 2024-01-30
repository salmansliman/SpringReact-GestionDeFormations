import React, { useEffect, useState } from "react";
import axios, { getRole } from "../../api/axios";
import AcceptedService from "../../services/AcceptedService";

const Accepted = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [studentNameFilter, setStudentNameFilter] = useState("");
  const [formationNameFilter, setFormationNameFilter] = useState("");
  const [uniqueFormationNames, setUniqueFormationNames] = useState([]);
  const isFormateur = getRole() == "Formateur";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await AcceptedService.getAllStudents();
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
        .includes(studentNameFilter.toLowerCase());
      const formationMatch = formationNameFilter
        ? student.formation.nomFormation === formationNameFilter
        : true;

      return nameMatch && formationMatch;
    });

    setFilteredStudents(filteredList);
  }, [studentNameFilter, formationNameFilter]);

  const handleDeleteStudent = (idStudent) => {
    try {
      AcceptedService.deleteStudent(idStudent)
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
        <h2>Accepted List</h2>
      </div>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Enter student name"
          value={studentNameFilter}
          onChange={(e) => setStudentNameFilter(e.target.value)}
        />
        <select
          value={formationNameFilter}
          onChange={(e) => setFormationNameFilter(e.target.value)}
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
              <span>{student.formation.nomFormation}</span>
              {!isFormateur && (
                <button
                  className="teacher--todo"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accepted;
