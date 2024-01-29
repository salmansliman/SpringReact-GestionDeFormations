import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const Accepted = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [studentNameFilter, setStudentNameFilter] = useState("");
  const [formationNameFilter, setFormationNameFilter] = useState("");
  const [uniqueFormationNames, setUniqueFormationNames] = useState([]);

  const isAdmin = localStorage.getItem('role') === "ROLE_ADMIN";
  const isAssistance = localStorage.getItem('role') === "ROLE_ASSISTANT";
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get("/student/true", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        console.log("alllll", response?.data);
        setAllStudents(response?.data);
        setFilteredStudents(response?.data); 

        
        const uniqueNames = [...new Set(response?.data.map(student => student.formation.nomFormation))];
        setUniqueFormationNames(uniqueNames);
      })
      .catch(function (error) {
        console.error('Error fetching Students', error);
      });
  }, [refreshFlag]);

  useEffect(() => {
    const filteredList = allStudents.filter(student => {
      const nameMatch = student.name.toLowerCase().includes(studentNameFilter.toLowerCase());
      const formationMatch = formationNameFilter ? student.formation.nomFormation === formationNameFilter : true;

      return nameMatch && formationMatch;
    });

    setFilteredStudents(filteredList);
  }, [studentNameFilter, formationNameFilter]);

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
              <button className="teacher--todo">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accepted;
