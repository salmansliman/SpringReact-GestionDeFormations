import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './Dashboard.css'
import Content from '../Content/Content'
import Profile from '../Profile/Profile'
import AddEntreprise from '../AddEntreprise/AddEntreprise'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className="dashboard--content">
        <AddEntreprise/>
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