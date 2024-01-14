import React from 'react'
import ProfileHeader from './ProfileHeader'
import'./Profile.css'
import { BiBook } from "react-icons/bi"

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
  return (
    <div className='profile'>
        <ProfileHeader />

        <div className="user--profile">
            <div className="user--detail">
                <h3 className="username">Username</h3>
                <span className="role">Admin</span>
            </div>
            <div className="user-courses">
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
        </div>
    </div>
  )
}

export default Profile