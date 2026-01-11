import axiosInstance from '../axiosConfig';

export const predictionApi = {
  // Predict GPA for single student
  predict: async (studentData) => {
    const response = await axiosInstance.post('/predict', studentData);
    return response.data;
  },

  // Predict GPA for multiple students
  predictBatch: async (studentsData) => {
    const response = await axiosInstance.post('/predict/batch', studentsData);
    return response.data;
  },

  // Get prediction with comprehensive summary
  predictWithSummary: async (studentData) => {
    const response = await axiosInstance.post('/predict/summary', studentData);
    return response.data;
  },
};

export default predictionApi;
