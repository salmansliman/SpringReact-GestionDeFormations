import React from "react";
import styled from "styled-components";
import Tabs from "./Tabs";

const CourseList = () => {
  const { courses } = [];

  return (
    <CoursesListWrapper>
      <div className="container">
        <div className="courses-list-top">
          <h2>A broad selection of courses</h2>
          <p>
            Choose from a wide variety of courses with new additions updated
            every month
          </p>
        </div>

        <Tabs courses={courses} />
      </div>
    </CoursesListWrapper>
  );
};

const CoursesListWrapper = styled.div`
  padding: 40px 0;
  .courses-list-top p {
    font-size: 1.8rem;
  }
`;

export default CourseList;
