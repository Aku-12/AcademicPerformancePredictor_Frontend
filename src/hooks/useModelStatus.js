import { useState, useEffect, useCallback } from 'react';
import { modelApi } from '../api';

export const useModelStatus = () => {
  const [health, setHealth] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);
  const [gpuStatus, setGpuStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [healthData, modelData, gpuData] = await Promise.all([
        modelApi.getHealth(),
        modelApi.getModelInfo(),
        modelApi.getGpuStatus(),
      ]);
      setHealth(healthData);
      setModelInfo(modelData);
      setGpuStatus(gpuData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    health,
    modelInfo,
    gpuStatus,
    loading,
    error,
    refresh: fetchStatus,
    isModelReady: health?.model_ready ?? false,
  };
};

export default useModelStatus;
