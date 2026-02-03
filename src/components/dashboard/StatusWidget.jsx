import { useModelStatus } from '../../hooks';

export const StatusWidget = () => {
  const { isModelReady, loading } = useModelStatus();

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
      <div className={`w-2 h-2 rounded-full ${
        loading ? 'bg-gray-400 animate-pulse' :
        isModelReady ? 'bg-emerald-500' : 'bg-red-500'
      }`} />
      <span className="text-xs font-medium text-gray-600">
        {loading ? 'Connecting...' : isModelReady ? 'Model Online' : 'System Offline'}
      </span>
    </div>
  );
};

export default StatusWidget;
