import React, { useState, useEffect } from 'react';
import { getStudentInsights, getCohortInsights } from '../api/endpoints/insightsApi';
import {
  GPAGauge,
  BehavioralRadar,
  GPADistributionChart,
  RiskDistributionChart,
  RiskFactorsList,
  ScholarshipFunnel
} from '../components/insights';
import { Card, Alert, Badge, Button } from '../components/ui';

export const InsightsSection = ({ studentData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [insights, setInsights] = useState(null);
  const [cohortData, setCohortData] = useState(null);
  const [cohortLoading, setCohortLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Cache key for cohort data
  const COHORT_CACHE_KEY = 'cohort_insights_cache';
  const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  useEffect(() => {
    const fetchInsights = async () => {
      if (!studentData) {
        const cachedData = getCachedCohortData();
        if (cachedData) {
          setCohortData(cachedData);
        } else {
          await fetchCohortData();
        }
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Scroll to insights section smoothly
        document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' });

        const studentInsights = await getStudentInsights(studentData);
        setInsights(studentInsights);

        const cachedData = getCachedCohortData();
        if (cachedData) {
          setCohortData(cachedData);
        } else {
          fetchCohortDataInBackground();
        }

      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to load insights');
        console.error('Error fetching insights:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [studentData]);

  const getCachedCohortData = () => {
    try {
      const cached = sessionStorage.getItem(COHORT_CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    } catch (e) {
      console.error('Error reading cache:', e);
    }
    return null;
  };

  const setCachedCohortData = (data) => {
    try {
      sessionStorage.setItem(COHORT_CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.error('Error setting cache:', e);
    }
  };

  const fetchCohortData = async () => {
    try {
      setCohortLoading(true);
      const cohort = await getCohortInsights();
      setCohortData(cohort);
      setCachedCohortData(cohort);
    } catch (err) {
      console.error('Error fetching cohort insights:', err);
    } finally {
      setCohortLoading(false);
    }
  };

  const fetchCohortDataInBackground = () => {
    setTimeout(() => {
      fetchCohortData();
    }, 100);
  };

  if (!studentData) {
    return (
      <section id="insights" className="py-8">
        <div className="flex flex-col items-start gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Student Insights</h2>
            <p className="text-gray-500 mt-1">
              Personalized academic analysis and improvement pathways
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Student Data Available</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Complete the prediction form above to generate your personalized academic insights dashboard.
          </p>
          <Button variant="outline" onClick={() => document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' })}>
            Go to Prediction Form
          </Button>

          {cohortData && (
            <div className="mt-12 text-left">
              <h4 className="text-sm font-semibold text-gray-900 mb-4 px-2">Cohort Overview</h4>
              <CohortInsights data={cohortData} />
            </div>
          )}
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="insights" className="py-8">
        <div className="bg-white rounded-xl border border-gray-100 p-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900">Generating Analysis</h3>
          <p className="text-gray-500 mt-1">Analyzing academic patterns and calculating predictions...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="insights" className="py-8">
        <Alert variant="error" title="Analysis Failed">
          {error}
        </Alert>
      </section>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'M4 6h16M4 12h16M4 18h7' },
    { id: 'performance', label: 'Performance', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'pathways', label: 'Success Pathways', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { id: 'scholarship', label: 'Scholarship', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'behavioral', label: 'Behaviors', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  ];

  return (
    <section id="insights" className="py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Student Insights Dashboard</h2>
        <p className="text-gray-500 mt-1">Comprehensive analysis of academic performance and predictions</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 p-1 mb-6 inline-flex flex-wrap gap-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {cohortLoading && !cohortData && (
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full">
            <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-medium text-indigo-700">Loading cohort data...</span>
          </div>
        )}

        {activeTab === 'overview' && <OverviewTab insights={insights} />}
        {activeTab === 'performance' && <PerformanceTab insights={insights} cohortData={cohortData} />}
        {activeTab === 'pathways' && <RiskTab insights={insights} />}
        {activeTab === 'scholarship' && <ScholarshipTab insights={insights} cohortData={cohortData} />}
        {activeTab === 'behavioral' && <BehavioralTab insights={insights} />}
      </div>
    </section>
  );
};

// Overview Tab Component
const OverviewTab = ({ insights }) => {
  const prediction = insights?.prediction;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* GPA Gauge */}
      <Card className="p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Predicted Performance</h3>
        <GPAGauge
          gpa={prediction?.predicted_gpa || 0}
          category={prediction?.category || 'Pass'}
          percentile={insights?.percentile_rank}
        />
      </Card>

      {/* Quick Stats */}
      <Card className="p-6 col-span-1 lg:col-span-2">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Support Level"
            value={getSupportLevelLabel(prediction?.risk_assessment?.risk_level)}
            color={getSupportLevelColor(prediction?.risk_assessment?.risk_level)}
          />
          <StatCard
            label="Success Probability"
            value={`${((1 - (prediction?.risk_assessment?.dropout_probability || 0)) * 100).toFixed(0)}%`}
            color="text-emerald-600"
          />
          <StatCard
            label="Scholarship"
            value={prediction?.scholarship?.eligible ? 'Elligible' : 'Not Yet Eligible'}
            color={prediction?.scholarship?.eligible ? 'text-emerald-600' : 'text-gray-500'}
          />
          <StatCard
            label="Percentile"
            value={`Top ${100 - (insights?.percentile_rank || 0)}%`}
            color="text-indigo-600"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-100">
            <h4 className="text-sm font-medium text-emerald-800 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Current Strengths
            </h4>
            <ul className="space-y-2">
              {prediction?.strengths?.length > 0 ? (
                prediction.strengths.slice(0, 3).map((strength, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {strength}
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500 italic">Continue building your academic profile</li>
              )}
            </ul>
          </div>

          <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-100">
            <h4 className="text-sm font-medium text-amber-800 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Focus Areas
            </h4>
            <ul className="space-y-2">
              {prediction?.areas_for_improvement?.length > 0 ? (
                prediction.areas_for_improvement.slice(0, 3).map((area, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {area}
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500 italic">Maintaining strong performance</li>
              )}
            </ul>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="col-span-1 lg:col-span-3 p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prediction?.recommendations?.slice(0, 3).map((rec, index) => (
            <div key={index} className="flex gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all cursor-default">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-medium text-sm">
                {index + 1}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Performance Tab
const PerformanceTab = ({ insights, cohortData }) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-6">Cohort Distribution</h3>
        {cohortData?.gpa_distribution ? (
          <GPADistributionChart
            data={cohortData.gpa_distribution}
            currentGPA={insights?.prediction?.predicted_gpa}
          />
        ) : (
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <span className="text-sm text-gray-400">Distribution data unavailable</span>
          </div>
        )}
      </Card>
    </div>
  );
};

// Pathway Tab (Renamed from Risk Tab)
const RiskTab = ({ insights }) => {
  const riskAssessment = insights?.prediction?.risk_assessment;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Success Pathway Analysis</h3>
            <p className="text-sm text-gray-500 mt-1">Factors influencing your academic trajectory</p>
          </div>
          <Badge
            variant={getRiskBadgeVariant(riskAssessment?.risk_level)}
            size="lg"
            className="px-4 py-1.5"
          >
            {getSupportLevelLabel(riskAssessment?.risk_level)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900 mb-1">
              {riskAssessment?.total_protective_factors || 0}
            </div>
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">Protective Factors</p>
          </div>
          <div className="text-center border-l border-r border-gray-100">
            <div className="text-3xl font-semibold text-gray-900 mb-1">
              {riskAssessment?.risk_score}/100
            </div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Stability Score</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900 mb-1">
              {riskAssessment?.total_risk_factors || 0}
            </div>
            <p className="text-xs font-medium uppercase tracking-wide text-amber-600">Growth Areas</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-0 overflow-hidden">
           <div className="p-4 border-b border-gray-100 bg-gray-50/50">
             <h4 className="font-medium text-gray-900">Detailed Factor Analysis</h4>
           </div>
           <div className="p-4">
            <RiskFactorsList
              riskFactors={riskAssessment?.risk_factors}
              protectiveFactors={riskAssessment?.protective_factors}
            />
           </div>
        </Card>

        {insights?.prediction?.interventions && (
          <Card className="p-0 overflow-hidden">
             <div className="p-4 border-b border-gray-100 bg-gray-50/50">
               <h4 className="font-medium text-gray-900">Recommended Steps</h4>
             </div>
             <div className="p-4">
               <InterventionsList interventions={insights.prediction.interventions} />
             </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// Scholarship Tab
const ScholarshipTab = ({ insights, cohortData }) => {
  const scholarship = insights?.prediction?.scholarship;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Scholarship Eligibility</h3>
            <p className="text-sm text-gray-500 mt-1">Track your progress toward financial awards</p>
          </div>
          <Badge
            variant={scholarship?.eligible ? 'success' : 'default'}
            size="lg"
          >
            {scholarship?.eligible ? 'Eligible' : 'In Progress'}
          </Badge>
        </div>

        <div className="mb-8">
           <div className="flex justify-between text-sm mb-2">
             <span className="font-medium text-gray-700">Eligibility Score</span>
             <span className="font-semibold text-indigo-600">{scholarship?.eligibility_score}/100</span>
           </div>
           <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
             <div 
               className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
               style={{ width: `${scholarship?.eligibility_score || 0}%` }}
             />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <h4 className="text-sm font-medium text-emerald-800 mb-3">Criteria Met</h4>
            <ul className="space-y-2">
              {scholarship?.criteria_met?.map((criteria, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {criteria}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
            <h4 className="text-sm font-medium text-amber-800 mb-3">Requirements Remaining</h4>
            <ul className="space-y-2">
              {scholarship?.criteria_not_met?.map((criteria, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {criteria}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Behavioral Tab
const BehavioralTab = ({ insights }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-6">Behavioral Profile</h3>
        {insights?.behavioral_profile ? (
          <div className="h-[300px]">
            <BehavioralRadar
              studentProfile={insights.behavioral_profile}
              idealProfile={{
                Study_Habits: 85,
                Attendance: 90,
                Motivation: 90,
                Stress_Management: 80,
                Engagement: 85,
                Assignment_Quality: 90
              }}
            />
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
            Not available
          </div>
        )}
      </Card>
      
      <Card className="p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-6">Behavioral Insights</h3>
        <div className="space-y-4">
           {/* Placeholder for automated text insights */}
           <p className="text-gray-600 text-sm leading-relaxed">
             Based on your profile, your study habits and attendance are strong indicators of success.
             Maintaining high motivation and consistent assignment quality will further improve your academic standing.
           </p>
        </div>
      </Card>
    </div>
  );
};

// Helper Components
const StatCard = ({ label, value, color }) => (
  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
    <p className={`text-xl font-bold ${color} mb-1`}>{value}</p>
    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
  </div>
);

const InterventionsList = ({ interventions }) => {
  const priorities = [
    { key: 'immediate', label: 'Priority Actions', color: 'rose' },
    { key: 'short_term', label: 'Short-term Goals', color: 'amber' },
    { key: 'long_term', label: 'Long-term Plans', color: 'emerald' }
  ];

  return (
    <div className="space-y-6">
      {priorities.map(({ key, label, color }) => {
        const actions = interventions[key];
        if (!actions?.length) return null;

        return (
          <div key={key}>
            <h5 className={`text-xs font-semibold uppercase tracking-wide text-${color}-600 mb-3`}>{label}</h5>
            <ul className="space-y-2">
              {actions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className={`w-1.5 h-1.5 rounded-full bg-${color}-500 mt-1.5 shrink-0`} />
                  <span className="text-sm text-gray-700">{action.action}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

const CohortInsights = ({ data }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
     <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
       <p className="text-2xl font-semibold text-gray-900">{data?.sample_size || 0}</p>
       <p className="text-xs text-gray-500">Students Analyzed</p>
     </div>
     <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
       <p className="text-2xl font-semibold text-gray-900">{data?.statistics?.mean_gpa?.toFixed(2) || '0.00'}</p>
       <p className="text-xs text-gray-500">Cohort Average GPA</p>
     </div>
  </div>
);

// Asset-based language helpers
const getSupportLevelLabel = (riskLevel) => {
  const map = {
    'No_Risk': 'Thriving',
    'Low_Risk': 'Stable',
    'Medium_Risk': 'Support Recommended',
    'High_Risk': 'Priority Support Needed'
  };
  return map[riskLevel] || 'Unknown';
};

const getSupportLevelColor = (riskLevel) => {
  const map = {
    'No_Risk': 'text-emerald-600',
    'Low_Risk': 'text-indigo-600',
    'Medium_Risk': 'text-amber-600',
    'High_Risk': 'text-rose-600'
  };
  return map[riskLevel] || 'text-gray-600';
};

const getRiskBadgeVariant = (riskLevel) => {
  const map = {
    'No_Risk': 'success',
    'Low_Risk': 'info',
    'Medium_Risk': 'warning',
    'High_Risk': 'danger'
  };
  return map[riskLevel] || 'default';
};

export default InsightsSection;
