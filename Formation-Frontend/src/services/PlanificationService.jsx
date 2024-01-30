import axios from '../api/axios';

const PlanificationService = {
  getAllFormations: async () => {
    try {
      const response = await axios.get("/formation/all", {});
      return response.data;
    } catch (error) {
      console.error('Error fetching Formations', error);
      throw error;
    }
  },

  updateFormation: async (token, formData) => {
    try {
      const requestBody = {
        "id": parseInt(formData.idFormation, 10),
        "dateDebut": formData.dateDebut,
        "dateEnd": formData.dateEnd,
        "ville":formData.ville,
        "formater": {
            "id": parseInt(formData.formaterId, 10)
        },
        "entreprise": {
            "idEntreprise": parseInt(formData.entrepriseId, 10)
        }
      };

      const response = await axios.put('/formation/updateFormation', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error updating formation:', error);
      throw error;
    }
  },
};

export default PlanificationService;
