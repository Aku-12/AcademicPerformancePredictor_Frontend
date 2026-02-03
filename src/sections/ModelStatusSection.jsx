import { ModelStatus } from '../components/model';
import { Button } from '../components/ui';
import { useModelStatus } from '../hooks';

export const ModelStatusSection = () => {
  const { refresh, loading } = useModelStatus();

  return (
    <section id="model-status" className="py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Model Status</h2>
          <p className="text-gray-500 mt-1">
            View the status of the ML prediction model and system health
          </p>
        </div>
        <Button onClick={refresh} loading={loading} variant="outline" size="md">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </Button>
      </div>

      <div className="max-w-3xl">
        <ModelStatus />
      </div>
    </section>
  );
};

export default ModelStatusSection;
