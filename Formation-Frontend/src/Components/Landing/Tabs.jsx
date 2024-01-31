import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Course from "./Course";
import axios from "../../api/axios";
import { useCoursesContext } from "../../context/courses_context";
import CourseService from "../../services/CourseService";

const Tabs = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { courses } = useCoursesContext();
  const [dateFilter, setDateFilter] = useState(null);

  const handleDateFilterChange = (event) => {
    const selectedDate = event.target.value;
    setDateFilter(selectedDate);
  };

  useEffect(() => {
    CourseService.fetchCategories()
      .then((categoriesData) => {
        setCategories(categoriesData);
        setActiveCategory(categoriesData[0]);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const tabHandler = (category) => {
    setActiveCategory(category);
  };

  const filterCourses = () => {
    return courses.filter(
      (course) =>
        ((activeCategory === null || activeCategory === "All") ||
          course.categorie === activeCategory) &&
        (!cityFilter || course.ville === cityFilter) &&
        (!dateFilter ||
          (course.dateDebut <= dateFilter && course.dateEnd >= dateFilter)) &&
        (!searchTerm ||
          (course.nomFormation &&
            course.nomFormation
              .toLowerCase()
              .includes(searchTerm.toLowerCase())))
    );
  };

  return (
    <TabsWrapper>
      <div className="tabs">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
  <label htmlFor="dateFilter">Filter by Date: </label>
  <input
    type="date"
    id="dateFilter"
    name="dateFilter"
    value={dateFilter || ''}
    onChange={handleDateFilterChange}
  />
</div>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="">All Cities</option>
            {/* Map through unique cities and render options */}
            {[...new Set(courses.map((course) => course.ville))].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <ul className="flex flex-wrap">
          <li className="tabs-head-item">
            <button
              type="button"
              className={`tab-btn ${activeCategory === "All" ? "active" : ""}`}
              onClick={() => tabHandler("All")}
            >
              All Categories
            </button>
          </li>

          {categories.map((category) => (
            <li key={category} className="tabs-head-item">
              <button
                type="button"
                className={`tab-btn ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => tabHandler(category)}
              >
                {category === null ? "Unspecified" : category}
              </button>
            </li>
          ))}
        </ul>

        <div className="tabs-body">
          {filterCourses().map((course) => (
            <Course key={course.id} {...course} />
          ))}
        </div>
      </div>
    </TabsWrapper>
  );
};

const TabsWrapper = styled.div`
  .tabs {
    margin-top: 16px;
    .tabs-head-item button {
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;

      &:hover {
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .tabs-body {
      margin-top: 32px;
    }

    @media screen and (min-width: 600px) {
      .tabs-body {
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px) {
      .tabs-body {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px) {
      .tabs-body {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
  .search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    select {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
`;

export default Tabs;
