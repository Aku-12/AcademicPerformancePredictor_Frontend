import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import { Badge } from '../ui';

export const RiskFactorsList = ({ riskFactors = [], protectiveFactors = [] }) => {
  return (
    <div className="space-y-6">
      {/* Protective Factors (Strengths) */}
      {protectiveFactors.length > 0 && (
        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-emerald-700 mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Protective Factors
          </h4>
          <div className="space-y-2">
            {protectiveFactors.map((factor, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-emerald-50/50 border border-emerald-100"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {formatFactorName(factor.factor)}
                  </span>
                  <span className="text-xs text-gray-500">
                    Strong contributor to success
                  </span>
                </div>
                <Badge variant="success" size="sm" className="bg-white">
                  +{Math.abs(factor.impact).toFixed(2)} Impact
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risk Factors (Areas for Growth) */}
      {riskFactors.length > 0 && (
        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-amber-700 mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Growth Opportunities
          </h4>
          <div className="space-y-2">
            {riskFactors.map((factor, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-amber-50/50 border border-amber-100"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {formatFactorName(factor.factor)}
                  </span>
                  <span className="text-xs text-gray-500">
                    Area impacting performance
                  </span>
                </div>
                <Badge variant="warning" size="sm" className="bg-white">
                  {Math.abs(factor.impact).toFixed(2)} Impact
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {riskFactors.length === 0 && protectiveFactors.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          No specific factors identified for this profile.
        </div>
      )}
    </div>
  );
};

// Helper to format snake_case to Title Case
const formatFactorName = (name) => {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default RiskFactorsList;
