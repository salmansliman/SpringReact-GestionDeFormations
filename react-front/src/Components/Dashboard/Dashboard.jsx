import React, { useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar'
import './Dashboard.css'
import Content from '../Content/Content'
import Profile from '../Profile/Profile'
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'
import axios, { isLogin } from '../../api/axios'

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLogin())

    if (!isLogin()) {
      console.log("User not logged in. Redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className="dashboard--content">
        <DashboardHome />
      </div>
    </div>

  )
}

export default Dashboard;

const DashboardHome = () => {
  return(
    <div className="dashboard--content">
      <Content />
      <Profile />
    </div>
  )
}