import apiClient from '../axiosConfig';

/**
 * Insights API endpoints
 */

// Get comprehensive student insights
export const getStudentInsights = async (studentData) => {
  const response = await apiClient.post('/insights/student', studentData);
  return response.data;
};

// Get cohort-level insights
export const getCohortInsights = async () => {
  const response = await apiClient.get('/insights/cohort', {
    timeout: 180000 // 3 minutes timeout for cohort insights (heavy computation)
  });
  return response.data;
};

// Get feature correlations
export const getFeatureCorrelations = async () => {
  const response = await apiClient.get('/insights/correlations');
  return response.data;
};

// Get demographic insights
export const getDemographicInsights = async (demographicType) => {
  const response = await apiClient.get(`/insights/demographics/${demographicType}`);
  return response.data;
};

// Get what-if scenario analysis
export const getWhatIfAnalysis = async (studentData, scenarios) => {
  const response = await apiClient.post('/insights/what-if', {
    student_data: studentData,
    scenarios: scenarios
  });
  return response.data;
};

// Get behavioral profile
export const getBehavioralProfile = async (studentData) => {
  const response = await apiClient.post('/insights/behavioral-profile', studentData);
  return response.data;
};

export default {
  getStudentInsights,
  getCohortInsights,
  getFeatureCorrelations,
  getDemographicInsights,
  getWhatIfAnalysis,
  getBehavioralProfile
};
