import { useModelStatus } from '../../hooks';
import { Card, CardHeader, CardTitle, CardContent, Badge, Spinner, Alert } from '../ui';
import { formatNumber, formatPercentage } from '../../utils/formatters';

export const ModelStatus = () => {
  const { health, modelInfo, gpuStatus, loading, error, refresh, isModelReady } = useModelStatus();

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 flex justify-center">
          <Spinner size="lg" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="error" title="Connection Error">
        Unable to connect to the ML service. Please ensure the backend is running.
        <button
          onClick={refresh}
          className="ml-2 underline hover:no-underline"
        >
          Retry
        </button>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Health Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  health?.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="font-medium">
                {health?.status === 'healthy' ? 'System Healthy' : 'System Unhealthy'}
              </span>
            </div>
            <Badge variant={isModelReady ? 'success' : 'warning'}>
              {isModelReady ? 'Model Ready' : 'Model Not Loaded'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* GPU Status */}
      {gpuStatus && (
        <Card>
          <CardHeader>
            <CardTitle>GPU Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">CUDA Available</p>
                <p className="font-medium">
                  {gpuStatus.cuda_available ? 'Yes' : 'No'}
                </p>
              </div>
              {gpuStatus.cuda_available && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Device Count</p>
                    <p className="font-medium">{gpuStatus.device_count}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Device Name</p>
                    <p className="font-medium">{gpuStatus.device_name || 'N/A'}</p>
                  </div>
                  {gpuStatus.cuda_version && (
                    <div>
                      <p className="text-sm text-gray-500">CUDA Version</p>
                      <p className="font-medium">{gpuStatus.cuda_version}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Model Information */}
      {modelInfo && modelInfo.status === 'ready' && (
        <Card>
          <CardHeader>
            <CardTitle>Model Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Model Type</p>
                <p className="font-medium">{modelInfo.model_type || 'N/A'}</p>
              </div>
              {modelInfo.features && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Total Features</p>
                    <p className="font-medium">{modelInfo.features.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Numerical Features</p>
                    <p className="font-medium">
                      {modelInfo.features.numerical?.length || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Categorical Features</p>
                    <p className="font-medium">
                      {modelInfo.features.categorical?.length || 0}
                    </p>
                  </div>
                </>
              )}
              {modelInfo.metrics && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">R² Score</p>
                    <p className="font-medium">
                      {formatNumber(modelInfo.metrics.r2_score, 4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">RMSE</p>
                    <p className="font-medium">
                      {formatNumber(modelInfo.metrics.rmse, 4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">MAE</p>
                    <p className="font-medium">
                      {formatNumber(modelInfo.metrics.mae, 4)}
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModelStatus;
