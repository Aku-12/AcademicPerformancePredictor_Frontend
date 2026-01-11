import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '../ui';
import { formatGPA, formatCategoryValue } from '../../utils/formatters';
import { getGPACategoryByValue } from '../../constants';
import { PredictionVisualization } from './PredictionVisualization';

export const PredictionResult = ({ result, inputData }) => {
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'visualizations'
  const navigate = useNavigate();

  if (!result) return null;

  const category = getGPACategoryByValue(result.predicted_gpa);

  // Helper function to get urgency badge color
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical':
        return { bg: '#FEE2E2', color: '#DC2626' };
      case 'high':
        return { bg: '#FEF3C7', color: '#D97706' };
      case 'medium':
        return { bg: '#DBEAFE', color: '#2563EB' };
      case 'low':
        return { bg: '#D1FAE5', color: '#059669' };
      default:
        return { bg: '#F3F4F6', color: '#6B7280' };
    }
  };

  // Helper function to get priority level display
  const getPriorityDisplay = (level) => {
    switch (level) {
      case 'critical':
        return { label: 'Critical Priority', color: '#DC2626', bg: '#FEE2E2' };
      case 'elevated':
        return { label: 'Elevated Priority', color: '#D97706', bg: '#FEF3C7' };
      case 'monitor':
        return { label: 'Monitor', color: '#2563EB', bg: '#DBEAFE' };
      case 'enhancement':
        return { label: 'Enhancement', color: '#059669', bg: '#D1FAE5' };
      default:
        return { label: 'Normal', color: '#6B7280', bg: '#F3F4F6' };
    }
  };

  const handleViewInsights = () => {
    navigate('/insights', { state: { studentData: inputData } });
  };

  return (
    <div className="space-y-3">
      {/* Main Result Card */}
      <Card>
        <CardContent className="py-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Predicted GPA
            </p>
            <p
              className="text-5xl font-bold mb-2"
              style={{ color: category?.color }}
            >
              {formatGPA(result.predicted_gpa)}
            </p>
            <Badge
              className="text-sm px-3 py-1"
              style={{
                backgroundColor: category?.bgColor,
                color: category?.color,
              }}
            >
              {category?.label || result.category}
            </Badge>
            <p className="mt-2 text-gray-600 text-sm">{category?.description}</p>

            {/* View Insights Button */}
            <button
              onClick={handleViewInsights}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Detailed Insights
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-lg">
        <button
          onClick={() => setActiveTab('details')}
          className={`flex-1 px-4 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'details'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Details
          </span>
        </button>
        <button
          onClick={() => setActiveTab('visualizations')}
          className={`flex-1 px-4 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'visualizations'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Charts
          </span>
        </button>
      </div>

      {/* Visualizations Tab Content */}
      {activeTab === 'visualizations' && (
        <PredictionVisualization result={result} inputData={inputData} />
      )}

      {/* Details Tab Content */}
      {activeTab === 'details' && (
        <div className="space-y-3">

      {/* Risk Assessment Card */}
      {result.risk_assessment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Risk Assessment</span>
              <Badge
                style={{
                  backgroundColor: result.risk_assessment.risk_color + '20',
                  color: result.risk_assessment.risk_color,
                }}
              >
                {result.risk_assessment.risk_level.replace('_', ' ')}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Risk Score Bar */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">Risk Score</span>
                  <span className="font-medium">{result.risk_assessment.risk_score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${result.risk_assessment.risk_score}%`,
                      backgroundColor: result.risk_assessment.risk_color,
                    }}
                  />
                </div>
              </div>

              {/* Dropout Probability */}
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                <span className="text-gray-600 text-xs">Dropout Probability</span>
                <span
                  className="text-base font-bold"
                  style={{ color: result.risk_assessment.risk_color }}
                >
                  {(result.risk_assessment.dropout_probability * 100).toFixed(0)}%
                </span>
              </div>

              {/* Risk Factors */}
              {result.risk_assessment.risk_factors && result.risk_assessment.risk_factors.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Risk Factors</h4>
                  <div className="space-y-2">
                    {result.risk_assessment.risk_factors.map((factor, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-2 rounded-lg"
                        style={{
                          backgroundColor:
                            factor.severity === 'high'
                              ? '#FEE2E2'
                              : factor.severity === 'medium'
                              ? '#FEF3C7'
                              : '#F3F4F6',
                        }}
                      >
                        <svg
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{
                            color:
                              factor.severity === 'high'
                                ? '#DC2626'
                                : factor.severity === 'medium'
                                ? '#D97706'
                                : '#6B7280',
                          }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="font-medium text-sm">{factor.factor}</p>
                          <p className="text-xs text-gray-600">{factor.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Protective Factors */}
              {result.risk_assessment.protective_factors && result.risk_assessment.protective_factors.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Protective Factors</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.risk_assessment.protective_factors.map((factor, index) => (
                      <Badge key={index} variant="success" size="sm">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scholarship Eligibility Card */}
      {result.scholarship && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Scholarship Eligibility</span>
              <Badge variant={result.scholarship.eligible ? 'success' : 'secondary'}>
                {result.scholarship.eligible ? 'Eligible' : 'Not Eligible'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Scholarship Type */}
              {result.scholarship.scholarship_type && (
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Scholarship Type</p>
                  <p className="text-xl font-bold text-blue-700">
                    {result.scholarship.scholarship_type}
                  </p>
                </div>
              )}

              {/* Eligibility Score */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Eligibility Score</span>
                  <span className="font-medium">{result.scholarship.eligibility_score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${result.scholarship.eligibility_score}%` }}
                  />
                </div>
              </div>

              {/* Criteria Met */}
              {result.scholarship.criteria_met && result.scholarship.criteria_met.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-green-700 mb-2">Criteria Met</h4>
                  <ul className="space-y-1">
                    {result.scholarship.criteria_met.map((criteria, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Criteria Not Met */}
              {result.scholarship.criteria_not_met && result.scholarship.criteria_not_met.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-amber-700 mb-2">Areas to Improve</h4>
                  <ul className="space-y-1">
                    {result.scholarship.criteria_not_met.map((criteria, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvement Tips */}
              {result.scholarship.improvement_tips && result.scholarship.improvement_tips.length > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-700 mb-2">Tips to Qualify</h4>
                  <ul className="space-y-1">
                    {result.scholarship.improvement_tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                        <span className="text-blue-500">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interventions Card */}
      {result.interventions && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recommended Interventions</span>
              {result.interventions.priority_level && (
                <Badge
                  style={{
                    backgroundColor: getPriorityDisplay(result.interventions.priority_level).bg,
                    color: getPriorityDisplay(result.interventions.priority_level).color,
                  }}
                >
                  {getPriorityDisplay(result.interventions.priority_level).label}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Immediate Actions */}
              {result.interventions.immediate && result.interventions.immediate.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Immediate Actions Required
                  </h4>
                  <div className="space-y-2">
                    {result.interventions.immediate.map((item, index) => {
                      const urgencyStyle = getUrgencyColor(item.urgency);
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg border-l-4"
                          style={{
                            backgroundColor: urgencyStyle.bg,
                            borderLeftColor: urgencyStyle.color,
                          }}
                        >
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ backgroundColor: urgencyStyle.color }}
                          >
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.action}</p>
                            <Badge
                              size="sm"
                              className="mt-1"
                              style={{ backgroundColor: urgencyStyle.color, color: 'white' }}
                            >
                              {item.urgency}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Short-term Actions */}
              {result.interventions.short_term && result.interventions.short_term.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                    This Semester
                  </h4>
                  <div className="space-y-2">
                    {result.interventions.short_term.map((item, index) => {
                      const urgencyStyle = getUrgencyColor(item.urgency);
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg"
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm">{item.action}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Long-term Actions */}
              {result.interventions.long_term && result.interventions.long_term.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Long-term Goals
                  </h4>
                  <div className="space-y-2">
                    {result.interventions.long_term.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                      >
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        <p className="text-sm">{item.action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Support Services */}
              {result.interventions.support_services && result.interventions.support_services.length > 0 && (
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    Recommended Support Services
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.interventions.support_services.map((service, index) => (
                      <Badge
                        key={index}
                        className="bg-purple-100 text-purple-700 px-3 py-1"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status */}
      {result.status && (
        <Card>
          <CardHeader>
            <CardTitle>Overall Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant={result.status === 'passed' ? 'success' : 'danger'}
              size="lg"
            >
              {result.status === 'passed' ? 'Likely to Pass' : 'At Risk'}
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* Strengths */}
      {result.strengths && result.strengths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Areas for Improvement */}
      {result.areas_for_improvement && result.areas_for_improvement.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-700">Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.areas_for_improvement.map((area, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-amber-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-700">General Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
        </div>
      )}
    </div>
  );
};

export default PredictionResult;
