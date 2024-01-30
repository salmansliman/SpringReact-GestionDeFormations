import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Course = (props) => {
  const {
    id,
    nomFormation,
    nbrHeures,
    cout,
    objectifs,
    progammeDetails,
    ville,
    categorie,
    formater,
  } = props;

  return (
    <CourseCard>
      <div className="item-body">
        <h5 className="item-name">{nomFormation}</h5>
        <p className="item-details">
          <strong>Teacher:</strong> {formater ? formater.name : "Not Assigned"}
        </p>
        <p className="item-details">
          <strong>Duration:</strong> {nbrHeures} hours
        </p>
        <p className="item-details">
          <strong>Cost:</strong> {cout} DH
        </p>
        <p className="item-details">
          <strong>Objectives:</strong> {objectifs}
        </p>
        <p className="item-details">
          <strong>Programme Details:</strong> {progammeDetails}
        </p>
        <p className="item-details">
          <strong>City:</strong> {ville || "Not specified"}
        </p>
        <p className="item-details">
          <strong>Category:</strong> {categorie || "Not specified"}
        </p>
      </div>
      <div className="item-btns flex">
        <Link to={`/courses/${id}`} className="item-btn see-details-btn">
          See details
        </Link>
      </div>
    </CourseCard>
  );
};

const CourseCard = styled.div`
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  display: flex;
  flex-direction: column;

  .item-body {
    margin: 14px 0;
    padding: 4px 18px;

    .item-name {
      font-size: 24px;
      line-height: 1.4;
      font-weight: 800;
    }

    .item-details {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 8px;
    }
  }

  .item-btns {
    justify-self: flex-start;
    padding: 4px 18px 30px 18px;
    margin-top: auto;

    .item-btn {
      font-size: 15px;
      display: inline-block;
      padding: 6px 16px;
      font-weight: 700;
      transition: var(--transition);
      white-space: nowrap;

      &.see-details-btn {
        background-color: transparent;
        border: 1px solid var(--clr-black);

        &:hover {
          background-color: rgba(0, 0, 0, 0.9);
          color: var(--clr-white);
        }
      }
    }
  }
`;

export default Course;
