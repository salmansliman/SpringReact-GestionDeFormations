import React from 'react';
import { BiLogoAndroid, BiLogoApple, BiLogoHtml5 } from "react-icons/bi";

const Card = ({ allFormations = [] }) => {
  return (
    <div className='card--container'>
      {allFormations.map((item) => (
        <div className="card" key={item.id}>
          <div className="card--cover">
            <BiLogoApple />
          </div>
          <div className="card--title">
            <h2>{item.nomFormation}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
