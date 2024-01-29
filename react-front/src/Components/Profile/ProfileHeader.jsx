import React from 'react'
import'./Profile.css'
import { SlLogout } from "react-icons/sl";
import { logout } from '../../api/axios'

const ProfileHeader = () => {
  return (
    <div className='profile--header'>
        <h2 className="header--title">Profile</h2>
        <button className="edit" onClick={logout}>
            <SlLogout className='icon'/>
        </button>
    </div>
  )
}

export default ProfileHeader