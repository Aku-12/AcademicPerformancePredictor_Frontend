import { Button, Card, CardContent } from '../components/ui';

export const DashboardSection = ({ onViewChange }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to Academic AI</h1>
          <p className="text-indigo-100 max-w-xl mb-6 text-lg">
            Leverage advanced machine learning to predict your semester performance and receive personalized strategies for academic success.
          </p>
          <Button 
            className="bg-white text-indigo-600 hover:bg-indigo-50 border-none font-semibold px-6 py-2.5 h-auto text-base"
            onClick={() => onViewChange('predict')}
          >
            Start New Prediction
          </Button>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-20 -mb-20 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* Quick Stats / Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-all duration-300 cursor-pointer border-gray-100 group" onClick={() => onViewChange('predict')}>
           <CardContent className="p-8 flex flex-col items-center text-center">
             <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
               </svg>
             </div>
             <h3 className="text-lg font-semibold text-gray-900 mb-1">Predict GPA</h3>
             <p className="text-sm text-gray-500">
               Input your details to generate a forecast
             </p>
           </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-300 cursor-pointer border-gray-100 group" onClick={() => onViewChange('insights')}>
           <CardContent className="p-8 flex flex-col items-center text-center">
             <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
               </svg>
             </div>
             <h3 className="text-lg font-semibold text-gray-900 mb-1">View Insights</h3>
             <p className="text-sm text-gray-500">
               Analyze behavioral patterns & risks
             </p>
           </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-300 cursor-pointer border-gray-100 group" onClick={() => onViewChange('status')}>
           <CardContent className="p-8 flex flex-col items-center text-center">
             <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
             </div>
             <h3 className="text-lg font-semibold text-gray-900 mb-1">System Status</h3>
             <p className="text-sm text-gray-500">
               Check model training & health
             </p>
           </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="border-gray-100">
           <CardContent className="p-6">
             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
               <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               About the System
             </h3>
             <p className="text-sm text-gray-600 leading-relaxed">
               This prediction system uses ensemble machine learning models (XGBoost, LightGBM) trained on student data to identify performance patterns. It considers academic history, study habits, and psychological factors to provide holistic support.
             </p>
           </CardContent>
         </Card>
         
         <Card className="border-gray-100">
           <CardContent className="p-6">
             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
               <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
               </svg>
               Privacy & Data
             </h3>
             <p className="text-sm text-gray-600 leading-relaxed">
               Your data is processed securely and used solely for generating your academic prediction. No personally identifiable information is stored permanently without your explicit consent.
             </p>
           </CardContent>
         </Card>
      </div>
    </div>
  );
};

export default DashboardSection;
