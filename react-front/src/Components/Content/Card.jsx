import React from 'react';
import { BiLogoApple } from "react-icons/bi";

const Card = ({ formations = [] }) => {
  return (
    <div className='card--container'>
      {formations.map((item) => (
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
