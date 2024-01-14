import React from 'react'
import { BiBookAlt, BiHelpCircle, BiHome, BiTask, BiSolidReport, BiStats } from 'react-icons/bi'
import './Sidebar.css'


const Sidebar = () => {
  return (
    <div className='menu'>
        <div className="logo">
            <BiBookAlt className='logo-icon'/>
            <h2>Manage Formations</h2>
        </div>

        <div className="menu--list">
            <a href="#" className="item active">
                <BiHome />
                Dashboard
            </a>
            <a href="#" className="item">
                <BiTask />
                Formations
            </a>
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