import React, { useEffect, useState } from "react";
import axios, { getRole } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [studentFilter, setStudentFilter] = useState("");
  const [formationFilter, setFormationFilter] = useState("");
  const [uniqueFormationNames, setUniqueFormationNames] = useState([]);
  const isFormateur = getRole() == "Formateur"
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  useEffect(() => {
    if(isFormateur) {
      navigate("/dashboard")
    }
    axios
      .get("/student/false", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        console.log("alllll", response?.data);
        setAllStudents(response?.data);
        setFilteredStudents(response?.data); // Initialize filtered students with all students

        // Extract unique formation names from the list of students
        const uniqueNames = [...new Set(response?.data.map(student => student.formation.nomFormation))];
        setUniqueFormationNames(uniqueNames);
      })
      .catch(function (error) {
        console.error('Error fetching Students', error);
      });
  }, [refreshFlag]);

  useEffect(() => {
    // Apply filters based on studentFilter and formationFilter
    const filteredList = allStudents.filter(student => {
      const nameMatch = student.name.toLowerCase().includes(studentFilter.toLowerCase());
      const formationMatch = formationFilter ? student.formation.nomFormation === formationFilter : true;

      return nameMatch && formationMatch;
    });

    setFilteredStudents(filteredList);
  }, [studentFilter, formationFilter]);

  const handleButtonClick = (studentId) => {
    // Add your logic for handling the button click here
    console.log(`Button clicked for student with ID: ${studentId}`);
    const requestBody = studentId;
    axios.post('/student/accepte', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Student accepted:', response.data);
        setRefreshFlag(!refreshFlag);
      })
      .catch(error => {
        console.error('Error accepting:', error);
      });
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
              <span className="teacher--todo">:</span>
              <button
                onClick={() => handleButtonClick(student.id)}
                className="student-button"
              >
                accept
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;
