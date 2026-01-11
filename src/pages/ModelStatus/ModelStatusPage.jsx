import { ModelStatus } from '../../components/model';
import { Button } from '../../components/ui';
import { useModelStatus } from '../../hooks';

export const ModelStatusPage = () => {
  const { refresh, loading } = useModelStatus();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Model Status</h1>
          <p className="text-gray-600 mt-1">
            View the status of the ML prediction model and system health
          </p>
        </div>
        <Button onClick={refresh} loading={loading} variant="outline">
          Refresh
        </Button>
      </div>

      <ModelStatus />
    </div>
  );
};

export default ModelStatusPage;
