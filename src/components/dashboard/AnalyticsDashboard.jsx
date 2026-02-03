import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { formatGPA } from '../../utils/formatters';
import { getGPACategoryByValue } from '../../constants';
import GPAGauge from '../insights/GPAGauge';
import BehavioralRadar from '../insights/BehavioralRadar';
import { PredictionVisualization } from '../prediction/PredictionVisualization';
import { motion } from 'framer-motion';

export const AnalyticsDashboard = ({ result, studentData }) => {
  if (!result) {
    return <WelcomeState />;
  }

  const category = getGPACategoryByValue(result.predicted_gpa);
  const successProb = result.risk_assessment ? ((1 - result.risk_assessment.dropout_probability) * 100).toFixed(0) : 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-8 pb-12"
    >
      {/* Top Value Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          { 
            label: "Forecasted GPA", value: formatGPA(result.predicted_gpa), sub: category?.label, col: category?.color, 
            icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", bg: "bg-emerald-50/50", iconCol: "text-emerald-600" 
          },
          { 
            label: "Success Probability", value: `${successProb}%`, sub: "Completion Likelihood", col: successProb > 80 ? '#10B981' : successProb > 50 ? '#F59E0B' : '#EF4444', 
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", bg: "bg-blue-50/50", iconCol: "text-blue-600" 
          },
          { 
            label: "Risk Assessment", value: result.risk_assessment?.risk_score || 0, sub: "Stability Score (0-100)", col: "#6366F1", 
            icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", bg: "bg-indigo-50/50", iconCol: "text-indigo-600" 
          },
          { 
            label: "Scholarship Status", value: result.scholarship?.eligible ? 'Elligible' : 'Check Criteria', sub: `${result.scholarship?.eligibility_score || 0}% Requirement Met`, col: result.scholarship?.eligible ? '#10B981' : '#64748B', 
            icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", bg: "bg-amber-50/50", iconCol: "text-amber-600" 
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <MetricCard 
              label={item.label} 
              value={item.value} 
              subValue={item.sub}
              color={item.col}
              icon={item.icon}
              bgClass={item.bg}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GPA Visual */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="lg:col-span-1">
          <Card className="shadow-lg shadow-gray-100 border-none ring-1 ring-gray-100 h-full">
            <CardHeader className="pb-0 pt-6 px-6">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Performance Band
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-6">
              <div className="scale-110 transform transition-transform hover:scale-115 duration-500">
                  <GPAGauge gpa={result.predicted_gpa} category={result.category || category.value} percentile={99} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Behavioral Radar */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="lg:col-span-1">
          <Card className="shadow-lg shadow-gray-100 border-none ring-1 ring-gray-100 h-full">
            <CardHeader className="pb-0 pt-6 px-6">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Behavioral Dimensions
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[320px] p-4">
              <BehavioralRadar 
                studentProfile={{
                  Attendance: studentData?.attendance_percentage || 0,
                  Study_Habits: (studentData?.daily_study_hours / 10) * 100 || 0, 
                  Internal_Marks: studentData?.internal_marks || 0,
                  Motivation: convertLevelToScore(studentData?.motivation_level),
                  Engagement: convertLevelToScore(studentData?.class_participation)
                }} 
                idealProfile={{ Attendance: 90, Study_Habits: 60, Internal_Marks: 80, Motivation: 90, Engagement: 85 }}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Impact */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="lg:col-span-1">
           <PredictionVisualization result={result} />
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-3">
          <span className="h-px bg-gray-200 flex-1"></span>
          Strategic Roadmap
          <span className="h-px bg-gray-200 flex-1"></span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {result.recommendations?.map((rec, i) => (
            <motion.div 
               key={i} 
               whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
               transition={{ type: "spring", stiffness: 300 }}
               className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm cursor-default relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gray-50 to-white -mr-8 -mt-8 rounded-full transition-transform group-hover:scale-150 group-hover:bg-indigo-50/50"></div>
               <div className="relative z-10 flex gap-4">
                 <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-indigo-200 shadow-sm group-hover:scale-110 transition-transform">{i+1}</div>
                 <p className="text-sm text-gray-600 leading-relaxed font-medium pt-1">{rec}</p>
               </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const MetricCard = ({ label, value, subValue, color, icon, bgClass }) => (
  <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group relative overflow-hidden h-full`}>
    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110 ${bgClass} opacity-50`}></div>
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        <div className={`p-2 rounded-lg bg-gray-50 text-gray-400 group-hover:text-white group-hover:bg-indigo-600 transition-colors duration-300`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} /></svg>
        </div>
      </div>
      
      <div>
        <span className="text-3xl font-extrabold text-gray-900 tracking-tight" style={{ color }}>{value}</span>
        <p className="text-xs font-medium text-gray-500 mt-1 flex items-center gap-1">
          {subValue}
        </p>
      </div>
    </div>
  </div>
);

const WelcomeState = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-[calc(100vh-140px)] text-center max-w-lg mx-auto"
    >
        <div className="relative mb-8 group cursor-pointer">
          <div className="absolute inset-0 bg-indigo-200 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative w-24 h-24 bg-white text-indigo-600 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-100 border border-indigo-50 group-hover:-translate-y-2 transition-transform duration-500">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Ready to Analyze</h2>
        <p className="text-gray-500 leading-relaxed text-base">
            Configure the student profile in the left panel and click 
            <span className="inline-block px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold mx-1 text-sm border border-indigo-100">Calculate</span> 
            to generate real-time predictive insights.
        </p>
    </motion.div>
);

const convertLevelToScore = (level) => {
  const map = { 'Low': 40, 'Medium': 75, 'High': 95 };
  return map[level] || 50;
};

export default AnalyticsDashboard;
