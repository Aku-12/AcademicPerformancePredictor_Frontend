import axiosInstance from '../axiosConfig';

export const modelApi = {
  // Health check
  getHealth: async () => {
    const response = await axiosInstance.get('/health');
    return response.data;
  },

  // Get GPU status
  getGpuStatus: async () => {
    const response = await axiosInstance.get('/gpu/status');
    return response.data;
  },

  // Get model information
  getModelInfo: async () => {
    const response = await axiosInstance.get('/model/info');
    return response.data;
  },

  // Get required features for prediction
  getFeatures: async () => {
    const response = await axiosInstance.get('/model/features');
    return response.data;
  },

  // Get feature importance
  getFeatureImportance: async (topN = 10) => {
    const response = await axiosInstance.get('/features/importance', {
      params: { top: topN },
    });
    return response.data;
  },

  // Train model
  trainModel: async (options = {}) => {
    const response = await axiosInstance.post('/train', options);
    return response.data;
  },

  // Reload model
  reloadModel: async () => {
    const response = await axiosInstance.post('/reload');
    return response.data;
  },
};

export default modelApi;
