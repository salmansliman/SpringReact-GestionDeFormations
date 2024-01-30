import React, { useContext, useReducer, useEffect } from "react";
import axios from "../api/axios";
import { GET_CATEGORIES, GET_COURSES, GET_SINGLE_COURSE } from "./actions";
import reducer from "../reducers/courses_reducer";

const initialState = {
  courses: [],
  single_course: {},
  categories: [],
};

const CoursesContext = React.createContext();

export const CoursesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/formation/all");
      dispatch({ type: GET_COURSES, payload: response.data });
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  
  const fetchSingleCourse = async (id) => {
    try {
      const response = await axios.get(`/formation/${id}`);
      dispatch({ type: GET_SINGLE_COURSE, payload: response.data });
    } catch (error) {
      console.error('Error fetching single course:', error);
    }
  };
  
  const fetchCategories = async () => {
    const response = await axios.get("/formation/categories");
    dispatch({ type: GET_CATEGORIES, payload: response.data });
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        ...state,
        fetchSingleCourse,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCoursesContext = () => {
  return useContext(CoursesContext);
};
