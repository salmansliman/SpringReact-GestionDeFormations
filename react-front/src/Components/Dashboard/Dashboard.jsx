import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar'
import './Dashboard.css'
import {
  Routes,
  Route,
  useNavigate,
  Outlet,
} from 'react-router-dom'
import axios, { isLogin, isAdmin, getAllFormations } from '../../api/axios'

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin()) {
      console.log("User not logged in. Redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);


  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard--content">
        <Outlet />
      </div>
    </div>

  )
}

export default Dashboard;
