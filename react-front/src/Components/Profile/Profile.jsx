import ProfileHeader from './ProfileHeader'
import'./Profile.css'
import { BiBook } from "react-icons/bi"
import React, { useEffect } from 'react';
import axios, { getRole } from '../../api/axios';

const courses = [
    {
        title: "UML",
        duration: "2 Hours",
        icon: <BiBook />
    },
    {
        title: "Compilation",
        duration: "1.5 Hours",
        icon: <BiBook />
    }
]

const Profile = () => {
    const userRole = getRole()
    const hasCourses = getRole() == "Formateur" 
    const userEmail = localStorage.getItem('user')

    useEffect(() => {
        console.log(window.location.pathname);
        console.log(hasCourses)
      }, []);

      axios.get('/users/getFormaterByEmail', userEmail)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
          console.error('Error fetching formateurs:', error);
        });
      
    
  return (
    <div className='profile'>
        <ProfileHeader />

        <div className="user--profile">
            <div className="user--detail">
                <h3 className="username">{userEmail}</h3>
                <span className="role">{userRole}</span>
            </div>
            {
                hasCourses ?             <div className="user-courses">
                <h5 className="mycourses">My Courses</h5>
                {courses.map((course) => (
                    <div className="course">
                        <div className="course-detail">
                            <div className="course-cover">{course.icon}</div>
                            <div className="course-name">
                                <h5 className="title">{course.title}</h5>
                                <span className="duration">{course.duration}</span>
                            </div>
                        </div>
                        <div className="action">:</div>
                    </div>
                ))}
            </div>
            : <span></span>
            }
        </div>
    </div>
  )
}

export default Profile