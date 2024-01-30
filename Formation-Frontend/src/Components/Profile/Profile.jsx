import ProfileHeader from "./ProfileHeader";
import "./Profile.css";
import { BiBook } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import axios, { getRole } from "../../api/axios";
import ProfileService from "../../services/ProfileService";

const Profile = () => {
  const userRole = getRole();
  const hasCourses = getRole() == "Formateur";
  const userEmail = localStorage.getItem("user");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    ProfileService.getUserCourses(userEmail)
      .then((courses) => {
        setCourses(courses);
      })
      .catch((error) => {
        console.error("Error fetching user courses:", error);
      });
  }, []);

  return (
    <div className="profile">
      <ProfileHeader />

      <div className="user--profile">
        <div className="user--detail">
          <h3 className="username">{userEmail}</h3>
          <span className="role">{userRole}</span>
        </div>
        {hasCourses ? (
          <div className="user-courses">
            <h5 className="mycourses">My Courses</h5>
            {courses.map((course) => (
              <div className="course">
                <div className="course-detail">
                  <div className="course-cover">
                    <BiBook />
                  </div>
                  <div className="course-name">
                    <h5 className="title">{course.nomFormation}</h5>
                    <span className="duration">{course.nbrHeures} Hours</span>
                  </div>
                </div>
                <div className="action">:</div>
              </div>
            ))}
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default Profile;
