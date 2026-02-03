import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../ui';
import { usePrediction } from '../../hooks';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

export const BatchAnalyticsDashboard = ({ batchData, results, onReset }) => {
  const { predictWithSummary } = usePrediction();
  const [analyzing, setAnalyzing] = useState(false);
  const [batchResults, setBatchResults] = useState(results || null);

  const startAnalysis = async () => {
    setAnalyzing(true);
    try {
      const promises = batchData.map(student => {
        const data = { ...student }; 
        return predictWithSummary(data).catch(e => null); 
      });
      
      const res = await Promise.all(promises);
      const validResults = res.filter(r => r !== null);
      setBatchResults(validResults);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  if (!batchResults) {
    return (
      <div className="flex flex-col items-center justify-center h-[50dvh] text-center">
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="relative mb-6 group"
        >
          <div className="absolute inset-0 bg-indigo-200 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative w-24 h-24 bg-white text-indigo-600 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-100 border border-indigo-50 group-hover:-translate-y-2 transition-transform duration-500">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Class Data Ready</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">{batchData.length} students loaded. Generate comprehensive analytics for the entire group.</p>
          <Button onClick={startAnalysis} loading={analyzing} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 shadow-lg px-8 py-3 h-auto text-base rounded-xl font-bold transition-transform hover:-translate-y-0.5">
            Run Batch Analysis
          </Button>
        </motion.div>
      </div>
    );
  }

  // Aggregation
  const avgGPA = (batchResults.reduce((acc, r) => acc + r.predicted_gpa, 0) / batchResults.length).toFixed(2);
  const atRiskCount = batchResults.filter(r => r.risk_assessment.dropout_probability > 0.5).length;
  const distinctionCount = batchResults.filter(r => r.predicted_gpa >= 3.6).length;

  const riskData = [
    { name: 'Low Risk', value: batchResults.length - atRiskCount, color: '#10B981' },
    { name: 'High Risk', value: atRiskCount, color: '#EF4444' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="space-y-8 pb-12"
    >
       {/* Header */}
       <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
             Group Analysis Results
          </h2>
          <Button onClick={onReset} variant="outline" size="sm" className="text-xs border-gray-200 hover:bg-gray-50 text-gray-500">
            Exit Batch Mode
          </Button>
       </div>

      {/* KPI Cards - Staggered Entry */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[
          { label: "Total Students", value: batchResults.length, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", bg: "bg-gray-50/50", col: "#1F2937" },
          { label: "Class Average GPA", value: avgGPA, icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", bg: "bg-indigo-50/50", col: "#4F46E5" },
          { label: "Students At Risk", value: atRiskCount, icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", bg: "bg-red-50/50", col: "#EF4444" },
          { label: "Distinction Count", value: distinctionCount, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", bg: "bg-emerald-50/50", col: "#10B981" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <MetricCard 
              label={item.label} value={item.value} 
              icon={item.icon} bgClass={item.bg} color={item.col}
            />
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card className="shadow-lg shadow-gray-100 border-none ring-1 ring-gray-100/50 h-full">
            <CardHeader className="pb-0 pt-6 px-6">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Risk Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex justify-center">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie 
                      data={riskData} 
                      cx="50%" cy="50%" 
                      innerRadius={60} outerRadius={80} 
                      paddingAngle={5} 
                      dataKey="value"
                      stroke="none"
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '8px 12px' }} 
                      itemStyle={{ color: '#374151', fontSize: '12px', fontWeight: 600 }}
                    />
                 </PieChart>
               </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Student Table */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <Card className="shadow-lg shadow-gray-100 border-none ring-1 ring-gray-100/50 overflow-hidden h-full">
            <CardHeader className="pb-0 pt-6 px-6 border-b border-gray-50 bg-gray-50/30">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Priority Attention List
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                   <thead className="text-xs text-gray-400 uppercase bg-white border-b border-gray-100">
                     <tr>
                       <th className="px-6 py-4 font-semibold tracking-wide">ID</th>
                       <th className="px-6 py-4 font-semibold tracking-wide">Predicted GPA</th>
                       <th className="px-6 py-4 font-semibold tracking-wide">Risk Probability</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                     {batchResults
                       .map((r, i) => ({ ...r, id: i+1 })) 
                       .sort((a, b) => b.risk_assessment.dropout_probability - a.risk_assessment.dropout_probability)
                       .slice(0, 5)
                       .map((student, i) => (
                         <motion.tr 
                           key={student.id} 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.6 + (i * 0.05) }}
                           className="hover:bg-gray-50/50 transition-colors"
                         >
                           <td className="px-6 py-4 font-medium text-gray-700">Student #{student.id}</td>
                           <td className="px-6 py-4 font-bold text-gray-900">{formatGPA(student.predicted_gpa)}</td>
                           <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                student.risk_assessment.dropout_probability > 0.7 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'bg-amber-100 text-amber-700'
                              }`}>
                                {(student.risk_assessment.dropout_probability * 100).toFixed(0)}%
                              </span>
                           </td>
                         </motion.tr>
                       ))}
                   </tbody>
                 </table>
               </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

const MetricCard = ({ label, value, color, icon, bgClass }) => (
  <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group relative overflow-hidden h-full flex flex-col justify-between`}>
    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110 ${bgClass} opacity-50`}></div>
    
    <div className="relative z-10 w-full">
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        <div className={`p-2 rounded-lg bg-gray-50 text-gray-400 group-hover:text-white group-hover:bg-indigo-600 transition-colors duration-300`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} /></svg>
        </div>
      </div>
      
      <div>
        <span className="text-3xl font-extrabold text-gray-900 tracking-tight" style={{ color }}>{value}</span>
      </div>
    </div>
  </div>
);

const formatGPA = (n) => typeof n === 'number' ? n.toFixed(2) : '-';

export default BatchAnalyticsDashboard;
