import axios from '../api/axios';

const PlanificationModalService = {
  getAllFormations: async (token) => {
    try {
      const response = await axios.get("/formation/all", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Formations', error);
      throw error;
    }
  },

  getAllFormateurs: async (token) => {
    try {
      const response = await axios.get('/users/getAllFormaters', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching formateurs:', error);
      throw error;
    }
  },

  getAllEntreprises: async (token) => {
    try {
      const response = await axios.get('/entreprise/all', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching entreprises:', error);
      throw error;
    }
  },

  createFormation: async (token, formData) => {
    try {
      const response = await axios.get('/formation/null', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching formations:', error);
      throw error;
    }
  },

  updateFormation: async (token, formattedData) => {
    try {
      const response = await axios.put('/formation/updateFormation', formattedData, {
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

export default PlanificationModalService;
