import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import {
  GaugeChart,
  RadarChart,
  HeatmapChart,
  BarChart,
  DonutChart,
  ProgressRing,
  MultiProgressRings
} from '../charts';

/**
 * Comprehensive visualization component for prediction results
 */
export const PredictionVisualization = ({ result, inputData }) => {
  if (!result) return null;

  // Prepare data for radar chart (performance metrics)
  const getRadarData = () => {
    const attendance = inputData?.attendance_percentage || 75;
    const studyHours = ((inputData?.daily_study_hours || 3) / 10) * 100; // Normalize to 100
    const gpaPercent = (result.predicted_gpa / 4) * 100;

    // Map motivation to percentage
    const motivationMap = {
      'Very_Low': 20,
      'Low_Motivation': 40,
      'Moderately_Motivated': 60,
      'Motivated': 80,
      'Highly_Motivated': 100
    };
    const motivation = motivationMap[inputData?.motivation_level] || 60;

    // Map participation to percentage
    const participationMap = {
      'Inactive': 20,
      'Passive': 40,
      'Moderate': 60,
      'Active': 80,
      'Very_Active': 100
    };
    const participation = participationMap[inputData?.class_participation] || 60;

    // Map assignment submission to percentage
    const assignmentMap = {
      'Rarely_Submits': 20,
      'Often_Late': 40,
      'Sometimes_Late': 60,
      'Usually_On_Time': 80,
      'Always_On_Time': 100
    };
    const assignment = assignmentMap[inputData?.assignment_submission] || 80;

    return [
      { label: 'GPA', value: Math.round(gpaPercent) },
      { label: 'Attendance', value: Math.round(attendance) },
      { label: 'Study', value: Math.round(studyHours) },
      { label: 'Motivation', value: motivation },
      { label: 'Participation', value: participation },
      { label: 'Assignments', value: assignment }
    ];
  };

  // Prepare data for factor contribution heatmap
  const getFactorData = () => {
    const factors = [];

    // GPA factor
    const gpaImpact = result.predicted_gpa >= 3.0 ? 'positive' : result.predicted_gpa >= 2.0 ? 'neutral' : 'negative';
    factors.push({
      label: 'Academic Performance',
      value: Math.round((result.predicted_gpa / 4) * 100),
      impact: gpaImpact
    });

    // Attendance factor
    const attendance = inputData?.attendance_percentage || 75;
    factors.push({
      label: 'Attendance',
      value: Math.round(attendance),
      impact: attendance >= 75 ? 'positive' : attendance >= 60 ? 'neutral' : 'negative'
    });

    // Study hours factor
    const studyHours = inputData?.daily_study_hours || 3;
    const studyScore = Math.min((studyHours / 6) * 100, 100);
    factors.push({
      label: 'Study Hours',
      value: Math.round(studyScore),
      impact: studyHours >= 4 ? 'positive' : studyHours >= 2 ? 'neutral' : 'negative'
    });

    // Motivation factor
    const motivationScores = {
      'Very_Low': 20,
      'Low_Motivation': 40,
      'Moderately_Motivated': 60,
      'Motivated': 80,
      'Highly_Motivated': 100
    };
    const motivationScore = motivationScores[inputData?.motivation_level] || 60;
    factors.push({
      label: 'Motivation',
      value: motivationScore,
      impact: motivationScore >= 60 ? 'positive' : 'negative'
    });

    // Stress factor (inverted - lower is better)
    const stressScores = {
      'Very_Low': 100,
      'Low': 80,
      'Moderate': 60,
      'High': 40,
      'Very_High': 20
    };
    const stressScore = stressScores[inputData?.stress_level] || 60;
    factors.push({
      label: 'Stress Management',
      value: stressScore,
      impact: stressScore >= 60 ? 'positive' : 'negative'
    });

    // Assignment submission factor
    const assignmentScores = {
      'Rarely_Submits': 20,
      'Often_Late': 40,
      'Sometimes_Late': 60,
      'Usually_On_Time': 80,
      'Always_On_Time': 100
    };
    const assignmentScore = assignmentScores[inputData?.assignment_submission] || 80;
    factors.push({
      label: 'Assignment Submission',
      value: assignmentScore,
      impact: assignmentScore >= 60 ? 'positive' : 'negative'
    });

    return factors.sort((a, b) => b.value - a.value);
  };

  // Prepare data for risk breakdown donut chart
  const getRiskDonutData = () => {
    if (!result.risk_assessment) return null;

    const riskScore = result.risk_assessment.risk_score;
    const protectiveScore = 100 - riskScore;

    return [
      { label: 'Risk Score', value: riskScore, color: result.risk_assessment.risk_color },
      { label: 'Protective Score', value: protectiveScore, color: '#10B981' }
    ];
  };

  // Prepare data for scholarship progress
  const getScholarshipData = () => {
    if (!result.scholarship) return null;

    return [
      {
        label: 'Eligibility Score',
        value: result.scholarship.eligibility_score,
        maxValue: 100,
        color: result.scholarship.eligible ? '#10B981' : '#F59E0B'
      }
    ];
  };

  // Prepare multi-metric progress rings
  const getMetricsData = () => {
    const data = [
      {
        label: 'GPA',
        value: Math.round((result.predicted_gpa / 4) * 100),
        color: result.predicted_gpa >= 3.0 ? '#10B981' : result.predicted_gpa >= 2.0 ? '#F59E0B' : '#EF4444'
      }
    ];

    if (result.risk_assessment) {
      data.push({
        label: 'Safety Score',
        value: 100 - result.risk_assessment.risk_score,
        color: result.risk_assessment.risk_score < 30 ? '#10B981' : result.risk_assessment.risk_score < 50 ? '#F59E0B' : '#EF4444'
      });
    }

    if (result.scholarship) {
      data.push({
        label: 'Scholarship',
        value: result.scholarship.eligibility_score,
        color: result.scholarship.eligible ? '#8B5CF6' : '#6B7280'
      });
    }

    return data;
  };

  // GPA comparison data for bar chart
  const getGPAComparisonData = () => {
    return [
      { label: 'Your GPA', value: result.predicted_gpa, color: '#3B82F6' },
      { label: 'Pass Threshold', value: 2.0, color: '#F59E0B' },
      { label: 'Distinction', value: 3.6, color: '#10B981' },
      { label: 'Maximum', value: 4.0, color: '#8B5CF6' }
    ];
  };

  return (
    <div className="space-y-3">
      {/* Key Metrics Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-4">
            {/* GPA Gauge */}
            <div className="flex flex-col items-center">
              <GaugeChart
                value={result.predicted_gpa}
                maxValue={4.0}
                label="Predicted GPA"
                size={150}
              />
            </div>

            {/* Multi Metrics */}
            <div className="flex-1 min-w-[180px]">
              <MultiProgressRings
                data={getMetricsData()}
                size={70}
                strokeWidth={6}
                title="Key Metrics"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <RadarChart
              data={getRadarData()}
              size={220}
              color="#3B82F6"
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Larger area = better overall performance
          </p>
        </CardContent>
      </Card>

      {/* Factor Contributions */}
      <Card>
        <CardHeader>
          <CardTitle>Factor Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <HeatmapChart
            data={getFactorData()}
            title=""
            showValues={true}
          />
          <p className="text-xs text-gray-400 mt-2">
            Green = positive impact, Red = negative impact
          </p>
        </CardContent>
      </Card>

      {/* Risk vs Protection Breakdown */}
      {result.risk_assessment && (
        <Card>
          <CardHeader>
            <CardTitle>Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-center">
                <DonutChart
                  data={getRiskDonutData()}
                  size={140}
                  strokeWidth={25}
                  centerValue={`${100 - result.risk_assessment.risk_score}%`}
                  centerLabel="Safe"
                />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Risk Breakdown</h4>
                <BarChart
                  data={[
                    {
                      label: 'GPA Risk',
                      value: result.predicted_gpa < 2.0 ? 40 : result.predicted_gpa < 2.4 ? 30 : result.predicted_gpa < 2.8 ? 15 : 0,
                      color: '#EF4444'
                    },
                    {
                      label: 'Attendance',
                      value: (inputData?.attendance_percentage || 75) < 60 ? 25 : (inputData?.attendance_percentage || 75) < 75 ? 15 : 0,
                      color: '#F59E0B'
                    },
                    {
                      label: 'Behavioral',
                      value: result.risk_assessment.risk_score > 30 ? 20 : 10,
                      color: '#8B5CF6'
                    }
                  ]}
                  maxValue={50}
                  barHeight={16}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* GPA Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>GPA Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={getGPAComparisonData()}
            title=""
            maxValue={4.0}
            showValues={true}
            barHeight={20}
          />
          <div className="mt-3 p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              Your GPA of <span className="font-bold text-blue-600">{result.predicted_gpa.toFixed(2)}</span> is{' '}
              {result.predicted_gpa >= 3.6 ? (
                <span className="text-green-600 font-medium">Distinction!</span>
              ) : result.predicted_gpa >= 3.2 ? (
                <span className="text-blue-600 font-medium">First Division</span>
              ) : result.predicted_gpa >= 2.8 ? (
                <span className="text-purple-600 font-medium">Second Division</span>
              ) : result.predicted_gpa >= 2.0 ? (
                <span className="text-amber-600 font-medium">above passing</span>
              ) : (
                <span className="text-red-600 font-medium">below passing - action needed</span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Scholarship Eligibility Progress */}
      {result.scholarship && (
        <Card>
          <CardHeader>
            <CardTitle>Scholarship Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4">
              <ProgressRing
                value={result.scholarship.eligibility_score}
                maxValue={100}
                size={100}
                strokeWidth={10}
                color={result.scholarship.eligible ? '#10B981' : '#F59E0B'}
                label="Eligibility"
              />
              <div className="flex-1 max-w-[200px]">
                <BarChart
                  data={[
                    {
                      label: 'GPA (50)',
                      value: result.predicted_gpa >= 3.6 ? 50 : result.predicted_gpa >= 3.2 ? 40 : result.predicted_gpa >= 2.8 ? 25 : 10,
                      color: '#3B82F6'
                    },
                    {
                      label: 'Attend (25)',
                      value: (inputData?.attendance_percentage || 0) >= 90 ? 25 : (inputData?.attendance_percentage || 0) >= 80 ? 20 : 10,
                      color: '#10B981'
                    },
                    {
                      label: 'Assign (15)',
                      value: inputData?.assignment_submission === 'Always_On_Time' ? 15 : inputData?.assignment_submission === 'Usually_On_Time' ? 12 : 8,
                      color: '#8B5CF6'
                    }
                  ]}
                  title=""
                  maxValue={50}
                  barHeight={14}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">{result.predicted_gpa.toFixed(2)}</p>
              <p className="text-xs text-gray-500">GPA</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xl font-bold text-green-600">{inputData?.attendance_percentage || 'N/A'}%</p>
              <p className="text-xs text-gray-500">Attendance</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-xl font-bold text-purple-600">{inputData?.daily_study_hours || 'N/A'}h</p>
              <p className="text-xs text-gray-500">Study</p>
            </div>
            <div className="text-center p-3 rounded-lg" style={{ backgroundColor: result.risk_assessment?.risk_color + '20' }}>
              <p className="text-xl font-bold" style={{ color: result.risk_assessment?.risk_color }}>
                {result.risk_assessment ? `${100 - result.risk_assessment.risk_score}%` : 'N/A'}
              </p>
              <p className="text-xs text-gray-500">Safe</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionVisualization;
