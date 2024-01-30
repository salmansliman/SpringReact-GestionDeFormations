import axios from "../api/axios";

const TeacherService = {
  getAllTeachers: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/users/getAllFormaters", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw error;
    }
  },

  addTeacher: async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const requestBody = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        competence: formData.competences,
      };
      const response = await axios.post(
        "/users/newFormaterInterne",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding teacher:", error);
      throw error;
    }
  },

  deleteTeacher: async (idFormateur) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const data = {
        id: idFormateur,
      };
      const response = await axios.delete("/users/deleteFormater", {
        headers,
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting teacher:", error);
      throw error;
    }
  },
};

export default TeacherService;