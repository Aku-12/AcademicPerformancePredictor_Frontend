import { modelApi } from '../api';

export const modelService = {
  // Check if model is ready
  async checkModelStatus() {
    const health = await modelApi.getHealth();
    return {
      isHealthy: health.status === 'healthy',
      isModelReady: health.model_ready,
    };
  },

  // Get comprehensive model info
  async getFullModelInfo() {
    const [health, modelInfo, gpuStatus] = await Promise.all([
      modelApi.getHealth(),
      modelApi.getModelInfo(),
      modelApi.getGpuStatus(),
    ]);

    return {
      health,
      model: modelInfo,
      gpu: gpuStatus,
    };
  },

  // Get feature importance for visualization
  async getFeatureImportanceData(topN = 15) {
    const data = await modelApi.getFeatureImportance(topN);
    return data.feature_importance || [];
  },

  // Get required features for form building
  async getRequiredFeatures() {
    return await modelApi.getFeatures();
  },

  // Train new model
  async trainModel(options = {}) {
    const defaultOptions = {
      model_type: 'xgboost_gpu',
      use_gpu: true,
      sample_size: null,
    };

    return await modelApi.trainModel({ ...defaultOptions, ...options });
  },
};

export default modelService;
