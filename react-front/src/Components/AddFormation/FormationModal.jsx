import React, { useEffect } from 'react';
import { BiLogoApple } from 'react-icons/bi';
import { FaLaptop, FaCalculator, FaFlask, FaTools, FaBriefcase, FaMedkit, FaBook, FaUsers, FaPalette, FaLeaf, FaHistory, FaMusic, FaChalkboardTeacher, FaMicrochip, FaLightbulb, FaGraduationCap } from 'react-icons/fa';

const getIconByCategory = (category) => {
  switch (category) {
    case 'Computer Science':
      return <FaLaptop />;
    case 'Mathematics':
      return <FaCalculator />;
    case 'Physics':
      return <FaFlask />;
    case 'Engineering':
      return <FaTools />;
    case 'Business and Finance':
      return <FaBriefcase />;
    case 'Health and Medicine':
      return <FaMedkit />;
    case 'Language and Literature':
      return <FaBook />;
    case 'Social Sciences':
      return <FaUsers />;
    case 'Art and Design':
      return <FaPalette />;
    case 'Environmental Science':
      return <FaLeaf />;
    case 'History':
      return <FaHistory />;
    case 'Music and Performing Arts':
      return <FaMusic />;
    case 'Personal Development':
      return <FaChalkboardTeacher />;
    case 'Technology and Innovation':
      return <FaMicrochip />;
    case 'Education and Teaching':
      return <FaGraduationCap />;
    default:
      return <BiLogoApple />;
  }
};

const Card = ({ formations = [] }) => {

  useEffect(() => {
    console.log("HHH",formations)
  }, [])

  return (
    <div className='card--container'>
      {formations.length === 0 ? (
        <div className="empty-state">
          <p>Nothing to show...</p>
        </div>
      ) : (
        formations.map((item) => (
          <div className="card" key={item.id}>
            <div className="card--cover">
              {getIconByCategory(item.categorie)}
            </div>
            <div className="card--title">
              <h2>{item.nomFormation}</h2>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Card;
