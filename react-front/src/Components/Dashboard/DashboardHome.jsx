import Content from '../Content/Content'
import Profile from '../Profile/Profile'
import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import axios from '../../api/axios'

const DashboardHome = () => {
    const [allFormations, setAllFormations] = useState([]);

    useEffect(() => {
        axios
        .get("/formation/all")
        .then(function (response) {
          console.log(response?.data)
          setAllFormations(response?.data)
        })
        .catch(function (error) {
            console.error('Error fetching formations:', error);
        });
        console.log("ALL FORMATIONS in DashboardHome:", allFormations);
    }, []);

    return(
      <div className="dashboard--content">
        <Content allFormations={allFormations} />
        <Profile />
      </div>
    )
  }
export default DashboardHome;
  