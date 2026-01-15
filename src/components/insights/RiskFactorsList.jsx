import React from 'react';
import { Badge } from '../ui';

const RiskFactorsList = ({ riskFactors, protectiveFactors }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-amber-100 text-amber-800 border-amber-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Risk Factors */}
      {riskFactors && riskFactors.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Risk Factors
          </h3>
          <div className="space-y-2">
            {riskFactors.map((factor, index) => (
              <div
                key={index}
                className="flex items-start p-3 rounded-lg border bg-white"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{factor.factor}</span>
                    <Badge className={getSeverityColor(factor.severity)}>
                      {factor.severity} severity
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{factor.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Protective Factors */}
      {protectiveFactors && protectiveFactors.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Your Strengths
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {protectiveFactors.map((factor, index) => (
              <div
                key={index}
                className="flex items-center p-3 rounded-lg border border-green-200 bg-green-50"
              >
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-green-800 font-medium">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Factors */}
      {(!riskFactors || riskFactors.length === 0) && (!protectiveFactors || protectiveFactors.length === 0) && (
        <div className="text-center py-8 text-gray-500">
          <p>No risk or protective factors available.</p>
        </div>
      )}
    </div>
  );
};

export default RiskFactorsList;
