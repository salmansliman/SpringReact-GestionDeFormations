import React from "react";
import {
  BiBookAlt,
  BiHome,
  BiTask,
} from "react-icons/bi";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { FaRegBuilding, FaCalendarAlt, FaUserClock } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { getRole } from "../../api/axios";

const Sidebar = () => {
  const location = useLocation();
  const role = getRole();

  const isAdmin = role === "Admin";
  const isAssistant = role === "Assistant";

  return (
    <div className="menu">
      <div className="logo">
        <BiBookAlt className="logo-icon" />
        <Link to={"/"} className="page-title">
          Manage Formations
        </Link>
      </div>

      <div className="menu--list">
        <Link
          to="/dashboard"
          className={`item ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
        >
          <BiHome />
          Dashboard
        </Link>

        {isAdmin && (
          <Link
            to="/dashboard/formations"
            className={`item ${
              location.pathname === "/dashboard/formations" ? "active" : ""
            }`}
          >
            <BiTask />
            Formations
          </Link>
        )}

        {(isAdmin || isAssistant) && (
          <Link
            to="/dashboard/entreprise"
            className={`item ${
              location.pathname === "/dashboard/entreprise" ? "active" : ""
            }`}
          >
            <FaRegBuilding />
            Companies
          </Link>
        )}
        <Link
          to="/dashboard/Planification"
          className={`item ${
            location.pathname === "/dashboard/Planification" ? "active" : ""
          }`}
        >
          <FaCalendarAlt />
          Calendar
        </Link>
        {(isAdmin || isAssistant) && (
          <Link
            to="/dashboard/Students"
            className={`item ${
              location.pathname === "/dashboard/Students" ? "active" : ""
            }`}
          >
            <FaUserClock />
            Students WaitList
          </Link>
        )}

        <>
          <Link
            to="/dashboard/Accepted"
            className={`item ${
              location.pathname === "/dashboard/Accepted" ? "active" : ""
            }`}
          >
            <PiStudentBold />
            Accepted Students
          </Link>
        </>
      </div>
    </div>
  );
};

export default Sidebar;
