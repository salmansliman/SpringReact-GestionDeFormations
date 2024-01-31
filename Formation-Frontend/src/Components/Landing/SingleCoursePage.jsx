import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useCoursesContext } from "../../context/courses_context";
import { BiCheck } from "react-icons/bi";
import { IoTime, IoLocation } from "react-icons/io5";
import Navbar from "./Navbar";
import StudentEnrollmentModal from "./StudentEnrollmentModal";
import axios from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentEnrollmentService from "../../services/StudentEnrollmentService";

const SingleCoursePage = () => {
  const { idFormation } = useParams();
  const { fetchSingleCourse, single_course } = useCoursesContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnrollClick = () => {
    setIsModalOpen(true);
  };
  const {
    idFormation: id,
    nomFormation,
    nbrHeures,
    cout,
    objectifs,
    progammeDetails,
    ville,
    categorie,
    formater,
  } = single_course;

  useEffect(() => {
    if (idFormation) {
      fetchSingleCourse(idFormation);
    }
  }, [idFormation, fetchSingleCourse]);

  const handleSubmitEnrollForm = (formData) => {
    const enrollmentData = {
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      dob: formData.dob,
      tel: formData.tel,
      formation: {
        id: parseInt(idFormation, 10),
      },
    };

    StudentEnrollmentService.enrollStudent(enrollmentData)
      .then((response) => {
        setIsModalOpen(false);
        toast.success("Enrollment successful");
      })
      .catch((error) => {
        console.error("Error enrolling student:", error);
        toast.error(error.message);
      });
  };

  return (
    <SingleCourseWrapper>
      <Navbar />
      <div className="course-intro mx-auto grid">
        <div className="course-details">
          <div className="course-category bg-white text-dark text-capitalize fw-6 fs-12 d-inline-block">
            {categorie || "Not Assigned"}
          </div>
          <div className="course-head">
            <h5>{nomFormation}</h5>
          </div>
          <div className="course-body">
            <p className="course-para fs-18">{progammeDetails}</p>
            <ul className="course-info">
              <li>
                <span className="fs-14">
                  Teached by{" "}
                  <span className="fw-6 opacity-08">
                    {formater ? formater.name : "Not Assigned"}
                  </span>
                </span>
              </li>
              <li className="flex">
                <span>
                  <IoTime />
                </span>
                <span className="fs-14 course-info-txt fw-5">
                  {nbrHeures} Hours
                </span>
              </li>
              <li className="flex">
                <span>
                  <IoLocation />
                </span>
                <span className="fs-14 course-info-txt fw-5">
                  {" "}
                  {ville || "Not Assigned"}{" "}
                </span>
              </li>
            </ul>
          </div>

          <div className="course-foot">
            <div className="course-price">
              <span className="new-price fs-26 fw-8">{cout} DH</span>
            </div>
          </div>
          <button className="enroll-btn flex" onClick={handleEnrollClick}>
            Enroll
          </button>
        </div>
      </div>

      <div className="course-full bg-white text-dark">
        <div className="course-learn mx-auto">
          <div className="course-sc-title">What you'll learn</div>
          <ul className="course-learn-list grid">
            <li>
              <span>
                <BiCheck />
              </span>
              <span className="fs-14 fw-5 opacity-09">{objectifs}</span>
            </li>
          </ul>
        </div>
      </div>

      {isModalOpen && (
        <StudentEnrollmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitEnrollForm}
        />
      )}
      <ToastContainer />
    </SingleCourseWrapper>
  );
};

const SingleCourseWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);
  .enroll-btn {
    display: inline-block;
    padding: 10px 15px;
    margin-top: 20px;
    margin-right: 10px;
    font-size: 16px;
    font-weight: bold;
    color: var(--clr-white);
    text-decoration: none;
    border: 2px solid var(--clr-white);
    background-color: transparent;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: var(--clr-white);
      color: var(--clr-black);
    }
  }

  .course-intro {
    padding: 40px 16px;
    max-width: 992px;

    .course-details {
      padding-top: 20px;
    }

    .course-category {
      padding: 0px 8px;
      border-radius: 6px;
    }

    .course-head {
      font-size: 38px;
      line-height: 1.2;
      padding: 12px 0 0 0;
    }
    .course-para {
      padding: 12px 0;
    }
    .rating-star-val {
      margin-right: 7px;
      padding-bottom: 5px;
      color: var(--clr-orange);
    }
    .students-count {
      margin-left: 8px;
    }
    .rating-count {
      margin-left: 6px;
      color: #d097f6;
    }
    .course-info {
      li {
        margin-bottom: 2px;
        &:nth-child(2) {
          margin-top: 10px;
        }
      }
      .course-info-txt {
        text-transform: capitalize;
        margin-left: 8px;
        margin-bottom: 4px;
      }
    }
    .course-price {
      margin-top: 12px;
      .old-price {
        color: #eceb98;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
    .course-btn {
      margin-top: 16px;
      .add-to-cart-btn {
        padding: 12px 28px;
        span {
          margin-left: 12px;
        }
      }
    }

    @media screen and (min-width: 880px) {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 40px;
      .course-details {
        padding-top: 0;
      }
      .course-img {
        order: 2;
      }
    }

    @media screen and (min-width: 1400px) {
      grid-template-columns: 60% 40%;
    }
  }

  .course-full {
    padding: 40px 16px;
    .course-sc-title {
      font-size: 22px;
      font-weight: 700;
      margin: 12px 0;
    }
    .course-learn {
      max-width: 992px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-learn-list {
        li {
          margin: 5px 0;
          display: flex;
          span {
            &:nth-child(1) {
              opacity: 0.95;
              margin-right: 12px;
            }
          }
        }

        @media screen and (min-width: 992px) {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    .course-content {
      max-width: 992px;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-content-list {
        li {
          background-color: #f7f9fa;
          padding: 12px 18px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 15px;
        }
      }
    }
  }
`;

export default SingleCoursePage;
