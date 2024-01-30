import axios from '../api/axios';

const RegisterService = {
  registerUser: async (userData) => {
    try {
      const response = await axios.post('/users/newFormaterExterne', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },
};

export default RegisterService;
