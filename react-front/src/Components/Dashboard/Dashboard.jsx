import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './Dashboard.css'
import Content from '../Content/Content'
import Profile from '../Profile/Profile'
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
      </Routes>
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