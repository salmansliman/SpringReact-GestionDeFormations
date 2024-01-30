import axios from "../api/axios";

const StudentService = {
  getAllStudents: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/student/false", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },

  acceptStudent: async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/student/accepte", studentId, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error accepting student:", error);
      throw error;
    }
  },

  deleteStudent: async (idStudent) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete("/student/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          id: idStudent,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    }
  },
};

export default StudentService;
