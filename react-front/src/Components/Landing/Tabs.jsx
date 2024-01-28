import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Course from './Course';
import axios from '../../api/axios';
import { useCoursesContext } from '../../context/courses_context';

const Tabs = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const { courses } = useCoursesContext();

  useEffect(() => {
    // Fetch categories from the endpoint
    axios.get('/formation/categories')
      .then(response => {
        setCategories(response.data);
        console.log(categories)
        setActiveCategory(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const tabHandler = (category) => {
    setActiveCategory(category);
  }

  return (
    <TabsWrapper>
      <div className='tabs'>
        <ul className='flex flex-wrap'>
          {categories.map(category => (
            <li key={category} className='tabs-head-item'>
              <button
                type="button"
                className={`tab-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => tabHandler(category)}
              >
                {category === null ? 'All' : category}
              </button>
            </li>
          ))}
        </ul>

        <div className='tabs-body'>
          {courses
            .filter(course => !activeCategory || course.categorie === activeCategory)
            .map(course => (
              <Course key={course.id} {...course} />
            ))}
        </div>
      </div>
    </TabsWrapper>
  );
}
const TabsWrapper = styled.div`
  .tabs{
    margin-top: 16px;
    .tabs-head-item button{
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;

      &:hover{
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .tabs-body{
      margin-top: 32px;
    }

    @media screen and (min-width: 600px){
      .tabs-body{
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px){
      .tabs-body{
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px){
      .tabs-body{
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;

export default Tabs