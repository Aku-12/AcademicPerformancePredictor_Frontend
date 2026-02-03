import { useState } from 'react';
import { PredictionForm, PredictionResult } from '../components/prediction';
import { Alert, Button } from '../components/ui';
import { useModelStatus } from '../hooks';

export const PredictSection = ({ onPredictionComplete, onViewInsights }) => {
  const [result, setResult] = useState(null);
  const [inputData, setInputData] = useState(null);
  const { isModelReady, loading } = useModelStatus();

  const handlePredictionComplete = (predictionResult, formData) => {
    setResult(predictionResult);
    setInputData(formData);
    if (onPredictionComplete) {
      onPredictionComplete(predictionResult, formData);
    }
    // Smooth scroll to results on mobile/small screens if needed
    if (window.innerWidth < 1024) {
       setTimeout(() => {
         document.getElementById('prediction-results')?.scrollIntoView({ behavior: 'smooth' });
       }, 100);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Initializing Prediction Engine...</p>
      </div>
    );
  }

  if (!isModelReady) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Alert variant="warning" title="Model Unavailable">
          The prediction model service is not reachable. Please ensure the backend is running.
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header handled by MainLayout, but we can add specific context if needed */}
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className={`xl:col-span-12 transition-all duration-500 ease-in-out ${result ? 'xl:col-span-5' : 'xl:col-span-7 xl:col-start-3'}`}>
          <PredictionForm onPredictionComplete={handlePredictionComplete} />
        </div>

        {/* Results Column - Only appears when result exists */}
        {result && (
          <div id="prediction-results" className="xl:col-span-7 animate-fadeIn">
             <div className="sticky top-24">
               <PredictionResult result={result} inputData={inputData} />
               
               {/* Insight Action */}
               <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={() => onViewInsights && onViewInsights(inputData)} 
                    variant="ghost"
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    View Full Analysis Dashboard &rarr;
                  </Button>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictSection;
