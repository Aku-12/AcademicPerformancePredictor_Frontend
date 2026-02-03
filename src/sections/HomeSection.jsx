import { Button } from '../components/ui';
import { useModelStatus } from '../hooks';

export const HomeSection = ({ onNavigate }) => {
  const { isModelReady, loading } = useModelStatus();

  const scrollToSection = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="py-8">
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">
              Academic Performance Predictor
            </h1>
            <p className="text-gray-500 max-w-xl">
              Predict your semester GPA using machine learning and get personalized recommendations to improve your academic performance.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Model Status Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              loading ? 'bg-gray-100 text-gray-600' :
              isModelReady ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                loading ? 'bg-gray-400 animate-pulse' :
                isModelReady ? 'bg-emerald-500' : 'bg-amber-500'
              }`} />
              {loading ? 'Checking model...' :
               isModelReady ? 'Model Ready' : 'Model Not Available'}
            </div>
            
            <Button size="lg" onClick={() => scrollToSection('predict')}>
              Start Prediction
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
