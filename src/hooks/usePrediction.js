import { useState, useCallback } from 'react';
import { predictionApi } from '../api';

export const usePrediction = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = useCallback(async (studentData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictionApi.predict(studentData);
      setPrediction(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const predictWithSummary = useCallback(async (studentData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictionApi.predictWithSummary(studentData);
      setPrediction(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPrediction(null);
    setError(null);
  }, []);

  return {
    prediction,
    loading,
    error,
    predict,
    predictWithSummary,
    reset,
  };
};

export default usePrediction;
