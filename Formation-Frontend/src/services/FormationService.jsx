import axios from "../api/axios";

const FormationService = {
  getAllFormations: () => {
    return axios
      .get("/formation/all")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching all formations:", error);
        throw error;
      });
  },

  addFormation: (token, formData) => {
    const requestBody = {
      nomFormation: formData.nomFormation,
      nbrHeures: formData.nbrHeurs,
      cout: formData.cout,
      objectifs: formData.objectifs,
      progammeDetails: formData.programmeDetails,
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
        console.error("Error adding formation:", error);
        throw error;
      });
  },

  deleteFormationById: (token, idFormation) => {
    return axios
      .delete("/formation/DeleteById", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: idFormation,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error deleting formation:", error);
        throw error;
      });
  },
};

export default FormationService;
