import React, { useState } from "react";
import Card from "./Card";
import "./Content.css";
import TeacherList from "../TeacherList/TeacherList";
import { BiNotification, BiSearch } from "react-icons/bi";

const Content = ({ allFormations }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFormations = allFormations.filter((formation) =>
    formation.nomFormation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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

          <div className="notify">
            <BiNotification className="icon" />
          </div>
        </div>
      </div>
      <Card formations={filteredFormations} />
      <TeacherList />
    </div>
  );
};

export default Content;