import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './Dashboard.css'
import Content from '../Content/Content'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className="dashboard--content">
        <Content />
      </div>
    </div>
  )
}

export default Dashboard;