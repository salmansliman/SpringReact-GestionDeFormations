import axios from '../api/axios';

const ProfileService = {
  getUserCourses: async (userEmail) => {
    try {
      const response = await axios.get('/formation/FormationEmail', {
        params: {
          email: userEmail
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching user courses:', error);
      throw error;
    }
  },
};

export default ProfileService;
