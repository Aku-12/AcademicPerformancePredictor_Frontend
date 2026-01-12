import { Button, Card, CardContent } from '../../components/ui';
import { useModelStatus } from '../../hooks';

export const HomePage = () => {
  const { isModelReady, loading } = useModelStatus();

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning model trained on extensive academic data to predict GPA with high accuracy.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'GPU Accelerated',
      description: 'Leverages GPU acceleration for fast predictions and model training with XGBoost and LightGBM.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Personalized Recommendations',
      description: 'Get actionable recommendations based on your academic profile to improve performance.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'CS Student Focused',
      description: 'Specifically designed for Computer Science students in Nepal with relevant academic factors.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Academic Performance Predictor
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Predict your semester GPA using advanced machine learning. Get personalized
          recommendations to improve your academic performance.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={() => window.location.href = '/predict'}>
            Start Prediction
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.location.href = '/model-status'}>
            View Model Status
          </Button>
        </div>

        {/* Model Status Badge */}
        <div className="mt-8 flex justify-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            loading ? 'bg-gray-100 text-gray-600' :
            isModelReady ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              loading ? 'bg-gray-400 animate-pulse' :
              isModelReady ? 'bg-green-500' : 'bg-yellow-500'
            }`} />
            {loading ? 'Checking model status...' :
             isModelReady ? 'Model Ready for Predictions' : 'Model Not Loaded'}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Enter Your Data</h3>
            <p className="text-gray-600 text-sm">
              Fill in your academic information including attendance, study hours, and other factors.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get Prediction</h3>
            <p className="text-gray-600 text-sm">
              Our ML model analyzes your data and predicts your expected semester GPA.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Improve</h3>
            <p className="text-gray-600 text-sm">
              Review personalized recommendations and take action to improve your performance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
