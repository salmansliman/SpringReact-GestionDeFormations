import axios from "../api/axios";

const AcceptedService = {
  getAllStudents: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/student/true", {
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

export default AcceptedService;
