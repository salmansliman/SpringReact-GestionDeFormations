import React from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import CourseList from "./CourseList";
import CategoriesList from "./CategoriesList";
import Navbar from "./Navbar";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <CourseList />
    </div>
  );
};

export default Landing;
