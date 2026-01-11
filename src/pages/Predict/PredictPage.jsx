import { useState } from 'react';
import { PredictionForm, PredictionResult } from '../../components/prediction';
import { Alert } from '../../components/ui';
import { useModelStatus } from '../../hooks';

export const PredictPage = () => {
  const [result, setResult] = useState(null);
  const [inputData, setInputData] = useState(null);
  const { isModelReady, loading } = useModelStatus();

  const handlePredictionComplete = (predictionResult, formData) => {
    setResult(predictionResult);
    setInputData(formData);
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isModelReady) {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert variant="warning" title="Model Not Ready">
          The prediction model is not loaded. Please ensure the backend service is running
          and the model has been trained. Visit the{' '}
          <a href="/model-status" className="underline font-medium">
            Model Status
          </a>{' '}
          page for more information.
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center py-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">GPA Prediction</h1>
        <p className="text-gray-600 text-sm">
          Enter your academic information to predict your semester GPA
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Form Section */}
        <div>
          <PredictionForm onPredictionComplete={handlePredictionComplete} />
        </div>

        {/* Results Section */}
        <div id="results">
          {result ? (
            <PredictionResult result={result} inputData={inputData} />
          ) : (
            <div className="bg-white rounded-lg border border-dashed border-gray-300 p-6 text-center h-full min-h-[300px] flex items-center justify-center">
              <div>
                <svg
                  className="w-12 h-12 text-gray-300 mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="text-gray-400 text-sm">
                  Fill in the form and click "Predict GPA" to see your results
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictPage;
