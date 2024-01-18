import React from 'react'
import { BiBookAlt, BiHelpCircle, BiHome, BiTask, BiSolidReport, BiStats } from 'react-icons/bi'
import './Sidebar.css'
import { Link } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='menu'>
        <div className="logo">
            <BiBookAlt className='logo-icon'/>
            <h2>Manage Formations</h2>
        </div>

        <div className="menu--list">
            <Link to="/dashboard" className="item active">
                <BiHome />
                Dashboard
            </Link>
            <Link to="profile" className="item">
                <BiTask />
                Formations
            </Link>
            <a href="#" className="item">
                <BiStats />
                Companies
            </a>
            <a href="#" className="item">
                <BiHelpCircle />
                Lorem Ipsum
            </a>
        </div>
    </div>
  )
}

export default Sidebar