import { predictionApi } from '../api';
import { validateStudentData } from '../utils/validation';
import { formatPredictionResult } from '../utils/formatters';

export const predictionService = {
  // Get prediction with validation
  async getPrediction(studentData) {
    const validation = validateStudentData(studentData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const result = await predictionApi.predict(studentData);
    return formatPredictionResult(result);
  },

  // Get prediction with summary
  async getPredictionWithSummary(studentData) {
    const validation = validateStudentData(studentData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    return await predictionApi.predictWithSummary(studentData);
  },

  // Batch prediction
  async getBatchPredictions(studentsData) {
    if (!Array.isArray(studentsData) || studentsData.length === 0) {
      throw new Error('Please provide an array of student data');
    }

    const result = await predictionApi.predictBatch(studentsData);
    return {
      ...result,
      predictions: result.predictions.map(formatPredictionResult),
    };
  },
};

export default predictionService;
