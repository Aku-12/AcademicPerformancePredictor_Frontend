import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '../ui';
import { formatGPA } from '../../utils/formatters';
import { getGPACategoryByValue } from '../../constants';
import { PredictionVisualization } from './PredictionVisualization';

export const PredictionResult = ({ result, inputData }) => {
  const [activeTab, setActiveTab] = useState('details'); 
  const category = result ? getGPACategoryByValue(result.predicted_gpa) : null;

  if (!result) return null;

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Primary Result Card */}
      <Card className="bg-gradient-to-br from-indigo-600 to-violet-700 border-none text-white shadow-lg overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 rounded-full bg-white opacity-5"></div>
        
        <CardContent className="py-8 relative z-10 flex flex-col items-center justify-center text-center">
            <p className="text-indigo-100 uppercase tracking-widest text-xs font-semibold mb-2">
              Forecasted Semester GPA
            </p>
            <div className="relative inline-block">
              <span className="text-6xl font-bold tracking-tight text-white">
                {formatGPA(result.predicted_gpa)}
              </span>
              <span className="text-indigo-200 text-2xl font-medium ml-2">/ 4.0</span>
            </div>
            
            <div className="mt-4 flex items-center gap-2">
               <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/10">
                 {category?.label || result.category}
               </span>
               <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/10">
                 {((1 - result.risk_assessment.dropout_probability) * 100).toFixed(0)}% Success Probability
               </span>
            </div>
            
            <p className="mt-6 text-indigo-100 text-sm max-w-md mx-auto leading-relaxed">
              {category?.description || "Based on your current profile, you are on track for this performance level."}
            </p>

            <div className="mt-8 w-full max-w-xs">
              <Button 
                onClick={() => document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-white text-indigo-600 hover:bg-indigo-50 border-none shadow-none"
              >
                View Detailed Insights Dashboard
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>
        </CardContent>
      </Card>

      {/* Secondary Cards */}
      <div className="grid grid-cols-1 gap-4 flex-1">
        {/* Key Strengths */}
        <Card className="flex flex-col">
           <CardHeader className="py-4 border-b border-gray-50">
             <CardTitle className="text-sm font-semibold uppercase tracking-wide text-gray-500">
               Key Contributors
             </CardTitle>
           </CardHeader>
           <CardContent className="flex-1 py-4">
             {result.strengths && result.strengths.length > 0 ? (
               <ul className="space-y-3">
                 {result.strengths.slice(0, 3).map((strength, index) => (
                   <li key={index} className="flex items-start gap-3">
                     <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                       </svg>
                     </div>
                     <span className="text-sm text-gray-700 font-medium">{strength}</span>
                   </li>
                 ))}
               </ul>
             ) : (
                <p className="text-sm text-gray-500 italic">No specific strengths identified yet.</p>
             )}
           </CardContent>
        </Card>

        {/* Focus Areas */}
        <Card className="flex flex-col">
           <CardHeader className="py-4 border-b border-gray-50">
             <CardTitle className="text-sm font-semibold uppercase tracking-wide text-gray-500">
               Focus Areas
             </CardTitle>
           </CardHeader>
           <CardContent className="flex-1 py-4">
             {result.areas_for_improvement && result.areas_for_improvement.length > 0 ? (
               <ul className="space-y-3">
                 {result.areas_for_improvement.slice(0, 3).map((area, index) => (
                   <li key={index} className="flex items-start gap-3">
                     <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                       </svg>
                     </div>
                     <span className="text-sm text-gray-700 font-medium">{area}</span>
                   </li>
                 ))}
               </ul>
             ) : (
                <p className="text-sm text-gray-500 italic">Maintain current study habits.</p>
             )}
           </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictionResult;
