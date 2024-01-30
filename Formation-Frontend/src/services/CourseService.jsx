import axios from "../api/axios";

const CourseService = {
  fetchCategories: () => {
    return axios
      .get("/formation/categories")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching categories:", error);
        throw error;
      });
  },

  getAllCourses: () => {
    return axios
      .get("/formation/all")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching all courses:", error);
        throw error;
      });
  },

  addCourse: (token, formData) => {
    const requestBody = {
      nomFormation: formData.title,
      nbrHeures: parseInt(formData.duration),
      cout: parseFloat(formData.cost),
      objectifs: formData.goals,
      progammeDetails: formData.details,
      categorie: formData.categorie,
    };

    return axios
      .post("/formation/newFormation", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error adding course:", error);
        throw error;
      });
  },
};

export default CourseService;
