import axios from '../api/axios';

const StudentEnrollmentService = {
  enrollStudent: (enrollmentData) => {
    return axios.post('/student/new', enrollmentData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error enrolling student:', error);

        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error('Error enrolling student');
        }
      });
  },
};

export default StudentEnrollmentService;
