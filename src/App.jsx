import { useStudentStore } from './store/useStudentStore';
import UnifiedLayout from './layouts/UnifiedLayout';
import InputPanel from './components/dashboard/InputPanel';
import AnalyticsDashboard from './components/dashboard/AnalyticsDashboard';
import BatchAnalyticsDashboard from './components/dashboard/BatchAnalyticsDashboard';
import StatusWidget from './components/dashboard/StatusWidget';

const App = () => {
  const { predictionResult, studentProfile, isBatchMode, batchData, batchResults, resetProfile } = useStudentStore();

  return (
    <UnifiedLayout
      statusWidget={<StatusWidget />}
      inputPanel={<InputPanel />}
      analyticsPanel={
        isBatchMode ? (
          <BatchAnalyticsDashboard 
            batchData={batchData} 
            results={batchResults} 
            onReset={resetProfile} // Resets to single mode
          />
        ) : (
          <AnalyticsDashboard result={predictionResult} studentData={studentProfile} />
        )
      }
    />
  );
};

export default App;
