import React from "react";
import {
  BiBookAlt,
  BiHelpCircle,
  BiHome,
  BiTask,
  BiSolidReport,
  BiStats,
} from "react-icons/bi";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="menu">
      <div className="logo">
        <BiBookAlt className="logo-icon" />
        <h2>Manage Formations</h2>
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
        <Link
          to="/dashboard/formations"
          className={`item ${
            location.pathname === "/dashboard/formations" ? "active" : ""
          }`}
        >
          <BiTask />
          Formations
        </Link>
        <Link
          to="/dashboard/entreprise"
          className={`item ${
            location.pathname === "/dashboard/entreprise" ? "active" : ""
          }`}
        >
          <BiStats />
          Companies
        </Link>
        <Link
          to="/dashboard/Planification"
          className={`item ${
            location.pathname === "/dashboard/Planification" ? "active" : ""
          }`}
        >
          <BiStats />
          planifier
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
