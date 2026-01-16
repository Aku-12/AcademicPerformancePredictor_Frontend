import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getStudentInsights, getCohortInsights } from '../../api/endpoints/insightsApi';
import {
  GPAGauge,
  BehavioralRadar,
  GPADistributionChart,
  RiskDistributionChart,
  FeatureImportanceChart,
  RiskFactorsList,
  ScholarshipFunnel
} from '../../components/insights';
import { Card, Spinner, Alert, Badge } from '../../components/ui';

const InsightsPage = () => {
  const location = useLocation();
  const studentData = location.state?.studentData;

  const [loading, setLoading] = useState(true);
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
      try {
        setLoading(true);
        setError(null);

        if (studentData) {
          // Fetch student-specific insights
          const studentInsights = await getStudentInsights(studentData);
          setInsights(studentInsights);
        }

        // Load cohort data from cache first
        const cachedData = getCachedCohortData();
        if (cachedData) {
          setCohortData(cachedData);
          setLoading(false);
          // Optionally refresh in background if cache is old
          return;
        }

        // If no cache and viewing cohort-only page, load cohort data
        if (!studentData) {
          await fetchCohortData();
        } else {
          // For student insights, load cohort data in background
          setLoading(false);
          fetchCohortDataInBackground();
        }

      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to load insights');
        console.error('Error fetching insights:', err);
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
    // Load cohort data in background without blocking UI
    setTimeout(() => {
      fetchCohortData();
    }, 100);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-xs text-gray-500">Loading insights...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert type="error" title="Error Loading Insights">
          {error}
        </Alert>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert type="info" title="No Student Data">
          Please make a prediction first to view personalized insights.
        </Alert>
        {cohortData && <CohortInsights data={cohortData} />}
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'performance', label: 'Performance Analysis', icon: '🎓' },
    { id: 'risk', label: 'Risk Assessment', icon: '⚠️' },
    { id: 'scholarship', label: 'Scholarship', icon: '💰' },
    { id: 'behavioral', label: 'Behavioral Profile', icon: '🧠' },
    { id: 'comparison', label: 'Peer Comparison', icon: '👥' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Insights Dashboard</h1>
          <p className="text-gray-600">Comprehensive analysis of academic performance and predictions</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Background loading indicator */}
        {cohortLoading && !cohortData && (
          <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded flex items-center">
            <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-blue-600 text-xs">Loading cohort data...</span>
          </div>
        )}

        {activeTab === 'overview' && <OverviewTab insights={insights} cohortData={cohortData} />}
        {activeTab === 'performance' && <PerformanceTab insights={insights} cohortData={cohortData} cohortLoading={cohortLoading} />}
        {activeTab === 'risk' && <RiskTab insights={insights} />}
        {activeTab === 'scholarship' && <ScholarshipTab insights={insights} cohortData={cohortData} cohortLoading={cohortLoading} />}

        {activeTab === 'behavioral' && <BehavioralTab insights={insights} />}
        {activeTab === 'comparison' && <ComparisonTab insights={insights} cohortData={cohortData} cohortLoading={cohortLoading} />}
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ insights, cohortData }) => {
  const prediction = insights?.prediction;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GPA Gauge */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Your Predicted GPA</h2>
          <GPAGauge
            gpa={prediction?.predicted_gpa || 0}
            category={prediction?.category || 'Pass'}
            percentile={insights?.percentile_rank}
          />
        </Card>

        {/* Quick Stats */}
        <Card className="p-6 col-span-2">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="Risk Level"
              value={prediction?.risk_assessment?.risk_level?.replace('_', ' ')}
              color={getRiskColor(prediction?.risk_assessment?.risk_level)}
            />
            <StatCard
              label="Dropout Probability"
              value={`${(prediction?.risk_assessment?.dropout_probability * 100).toFixed(0)}%`}
              color={getDropoutColor(prediction?.risk_assessment?.dropout_probability)}
            />
            <StatCard
              label="Scholarship Status"
              value={prediction?.scholarship?.eligible ? 'Eligible' : 'Not Eligible'}
              color={prediction?.scholarship?.eligible ? 'text-green-600' : 'text-gray-600'}
            />
            <StatCard
              label="Percentile Rank"
              value={`${insights?.percentile_rank}th`}
              color="text-blue-600"
            />
          </div>
        </Card>
      </div>

      {/* Strengths and Areas for Improvement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-green-700 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Your Strengths
          </h2>
          <ul className="space-y-2">
            {prediction?.strengths?.length > 0 ? (
              prediction.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">Keep building your strengths</li>
            )}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-amber-700 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Areas for Improvement
          </h2>
          <ul className="space-y-2">
            {prediction?.areas_for_improvement?.length > 0 ? (
              prediction.areas_for_improvement.map((area, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 mr-2">⚠</span>
                  <span className="text-gray-700">{area}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No major concerns identified</li>
            )}
          </ul>
        </Card>
      </div>

      {/* Top Recommendations */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Top Recommendations</h2>
        <div className="space-y-2">
          {prediction?.recommendations?.slice(0, 5).map((rec, index) => (
            <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-600 font-bold mr-3">{index + 1}.</span>
              <span className="text-gray-800">{rec}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Performance Tab Component
const PerformanceTab = ({ insights, cohortData, cohortLoading }) => {
  return (
    <div className="space-y-6">
      {cohortLoading && !cohortData ? (
        <Card className="p-6">
          <div className="flex items-center justify-center py-6">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-xs text-gray-500">Loading data...</span>
          </div>
        </Card>
      ) : cohortData?.gpa_distribution ? (
        <>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">GPA Distribution (Cohort)</h2>
            <p className="text-sm text-gray-600 mb-4">
              See where you stand compared to {cohortData.sample_size} students
            </p>
            <GPADistributionChart
              data={cohortData.gpa_distribution}
              currentGPA={insights?.prediction?.predicted_gpa}
            />
          </Card>

          {cohortData?.statistics?.category_distribution && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Performance Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {Object.entries(cohortData.statistics.category_distribution).map(([category, count]) => (
                  <div key={category} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                    <p className="text-xs text-gray-600 mt-1">{category.replace('_', ' ')}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      ) : (
        <Card className="p-6">
          <Alert type="info" title="No Cohort Data">
            Cohort performance data is not available.
          </Alert>
        </Card>
      )}
    </div>
  );
};

// Risk Tab Component
const RiskTab = ({ insights }) => {
  const riskAssessment = insights?.prediction?.risk_assessment;

  return (
    <div className="space-y-6">
      {/* Risk Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Risk Assessment</h2>
            <p className="text-gray-600 mt-1">Comprehensive analysis of academic risk factors</p>
          </div>
          <div className="text-right">
            <div
              className="inline-block px-6 py-3 rounded-lg font-bold text-white text-lg"
              style={{ backgroundColor: riskAssessment?.risk_color }}
            >
              {riskAssessment?.risk_level?.replace('_', ' ')}
            </div>
            <p className="text-sm text-gray-600 mt-2">Risk Score: {riskAssessment?.risk_score}/100</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-3xl font-bold text-red-600">
              {riskAssessment?.dropout_probability ? `${(riskAssessment.dropout_probability * 100).toFixed(0)}%` : 'N/A'}
            </p>
            <p className="text-sm text-gray-700 mt-1">Dropout Probability</p>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-3xl font-bold text-amber-600">{riskAssessment?.total_risk_factors || 0}</p>
            <p className="text-sm text-gray-700 mt-1">Risk Factors</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-3xl font-bold text-green-600">{riskAssessment?.total_protective_factors || 0}</p>
            <p className="text-sm text-gray-700 mt-1">Protective Factors</p>
          </div>
        </div>
      </Card>

      {/* Risk Factors List */}
      <Card className="p-6">
        <RiskFactorsList
          riskFactors={riskAssessment?.risk_factors}
          protectiveFactors={riskAssessment?.protective_factors}
        />
      </Card>

      {/* Interventions */}
      {insights?.prediction?.interventions && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Recommended Interventions</h2>
          <InterventionsList interventions={insights.prediction.interventions} />
        </Card>
      )}
    </div>
  );
};

// Scholarship Tab Component
const ScholarshipTab = ({ insights, cohortData, cohortLoading }) => {
  const scholarship = insights?.prediction?.scholarship;

  return (
    <div className="space-y-6">
      {/* Scholarship Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Scholarship Eligibility</h2>
            <p className="text-gray-600 mt-1">Your scholarship potential and improvement path</p>
          </div>
          <div className={`text-right px-6 py-3 rounded-lg ${scholarship?.eligible ? 'bg-green-100' : 'bg-gray-100'}`}>
            <p className="font-bold text-lg">
              {scholarship?.eligible ? '✓ Eligible' : '✗ Not Eligible'}
            </p>
            <p className="text-sm text-gray-600 mt-1">{scholarship?.scholarship_type}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Eligibility Score</span>
            <span className="text-sm font-bold text-gray-900">{scholarship?.eligibility_score}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${scholarship?.eligibility_score || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Criteria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold text-green-700 mb-2">Criteria Met</h3>
            <ul className="space-y-1">
              {scholarship?.criteria_met?.map((criteria, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {criteria}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-700 mb-2">Criteria Not Met</h3>
            <ul className="space-y-1">
              {scholarship?.criteria_not_met?.map((criteria, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  {criteria}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Improvement Tips */}
        {scholarship?.improvement_tips?.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">How to Improve</h3>
            <ul className="space-y-1">
              {scholarship.improvement_tips.map((tip, index) => (
                <li key={index} className="text-sm text-blue-800 flex items-start">
                  <span className="mr-2">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Cohort Scholarship Funnel */}
      {cohortLoading && !cohortData ? (
        <Card className="p-6">
          <div className="flex items-center justify-center py-4">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-xs text-gray-500">Loading...</span>
          </div>
        </Card>
      ) : cohortData?.scholarship_funnel ? (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Scholarship Funnel (Cohort)</h2>
          <ScholarshipFunnel funnelData={cohortData.scholarship_funnel} />
        </Card>
      ) : null}
    </div>
  );
};



// Behavioral Tab Component
const BehavioralTab = ({ insights }) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Behavioral Profile</h2>
        <p className="text-gray-600 mb-6">
          Multi-dimensional view of your behavioral factors compared to ideal profile
        </p>

        {insights?.behavioral_profile ? (
          <BehavioralRadar
            studentProfile={insights.behavioral_profile}
            idealProfile={insights.behavioral_profile && {
              Study_Habits: 85,
              Attendance: 90,
              Motivation: 90,
              Stress_Management: 80,
              Engagement: 85,
              Assignment_Quality: 90
            }}
          />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Behavioral profile not available</p>
          </div>
        )}
      </Card>
    </div>
  );
};

// Comparison Tab Component
const ComparisonTab = ({ insights, cohortData, cohortLoading }) => {
  const similarStudents = insights?.similar_students;

  return (
    <div className="space-y-6">
      {/* Similar Students Comparison */}
      {similarStudents && !similarStudents.error && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Similar Students Comparison</h2>
          <p className="text-gray-600 mb-6">
            Compared to {similarStudents.count} students with similar profile
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-3xl font-bold text-blue-600">{similarStudents.mean_gpa?.toFixed(2)}</p>
              <p className="text-sm text-gray-700 mt-1">Average GPA</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
              <p className="text-3xl font-bold text-green-600">{similarStudents.top_performers?.percentage}%</p>
              <p className="text-sm text-gray-700 mt-1">Top Performers (3.6+)</p>
            </div>
            <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
              <p className="text-3xl font-bold text-red-600">{similarStudents.at_risk?.percentage}%</p>
              <p className="text-sm text-gray-700 mt-1">At Risk (&lt;2.4)</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Similarity based on:</strong> {similarStudents.similarity_criteria?.join(', ')}
            </p>
          </div>
        </Card>
      )}

      {/* Cohort Risk Distribution */}
      {cohortLoading && !cohortData ? (
        <Card className="p-6">
          <div className="flex items-center justify-center py-4">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-xs text-gray-500">Loading...</span>
          </div>
        </Card>
      ) : cohortData?.statistics?.risk_distribution ? (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Risk Distribution (Cohort)</h2>
          <RiskDistributionChart riskDistribution={cohortData.statistics.risk_distribution} />
        </Card>
      ) : null}
    </div>
  );
};

// Helper Components
const StatCard = ({ label, value, color = 'text-gray-900' }) => (
  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

const InterventionsList = ({ interventions }) => {
  const priorities = ['immediate', 'short_term', 'long_term'];
  const priorityLabels = {
    immediate: { label: 'Immediate Actions', icon: '🔴', color: 'red' },
    short_term: { label: 'Short-term Goals', icon: '🟡', color: 'amber' },
    long_term: { label: 'Long-term Planning', icon: '🟢', color: 'green' }
  };

  return (
    <div className="space-y-6">
      {priorities.map(priority => {
        const actions = interventions[priority];
        if (!actions || actions.length === 0) return null;

        const config = priorityLabels[priority];

        return (
          <div key={priority}>
            <h3 className={`font-semibold text-${config.color}-700 mb-3 flex items-center`}>
              <span className="mr-2">{config.icon}</span>
              {config.label}
            </h3>
            <ul className="space-y-2">
              {actions.map((action, index) => (
                <li key={index} className={`p-3 rounded-lg border border-${config.color}-200 bg-${config.color}-50`}>
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-gray-800">{action.action}</span>
                    <Badge className={`ml-2 text-xs bg-${config.color}-200 text-${config.color}-800`}>
                      {action.urgency}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {interventions.support_services?.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">Recommended Support Services</h3>
          <div className="flex flex-wrap gap-2">
            {interventions.support_services.map((service, index) => (
              <Badge key={index} className="bg-blue-200 text-blue-800">
                {service}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Cohort Insights Component (when no student data)
const CohortInsights = ({ data }) => (
  <div className="mt-8 space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Cohort Insights</h2>

    {data.gpa_distribution && (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">GPA Distribution</h3>
        <GPADistributionChart data={data.gpa_distribution} />
      </Card>
    )}

    {data.statistics?.risk_distribution && (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
        <RiskDistributionChart riskDistribution={data.statistics.risk_distribution} />
      </Card>
    )}
  </div>
);

// Helper Functions
const getRiskColor = (riskLevel) => {
  const colors = {
    'No_Risk': 'text-green-600',
    'Low_Risk': 'text-blue-600',
    'Medium_Risk': 'text-amber-600',
    'High_Risk': 'text-red-600'
  };
  return colors[riskLevel] || 'text-gray-600';
};

const getDropoutColor = (probability) => {
  if (probability >= 0.5) return 'text-red-600';
  if (probability >= 0.3) return 'text-amber-600';
  if (probability >= 0.1) return 'text-blue-600';
  return 'text-green-600';
};

export default InsightsPage;
