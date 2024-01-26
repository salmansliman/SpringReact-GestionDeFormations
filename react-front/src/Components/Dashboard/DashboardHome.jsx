import Content from '../Content/Content'
import Profile from '../Profile/Profile'
import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import axios from '../../api/axios'

const DashboardHome = () => {
    return(
      <div className="dashboard--content">
        <Content />
        <Profile />
      </div>
    )
  }
export default DashboardHome;
  