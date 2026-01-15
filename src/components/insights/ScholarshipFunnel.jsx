import React from 'react';

const ScholarshipFunnel = ({ funnelData }) => {
  const {
    total_students,
    eligible,
    eligible_percentage,
    near_eligible,
    near_eligible_percentage,
    not_eligible,
    scholarship_types
  } = funnelData;

  const stages = [
    {
      label: 'Total Students',
      count: total_students,
      percentage: 100,
      color: 'bg-gray-500'
    },
    {
      label: 'Eligible for Scholarship',
      count: eligible,
      percentage: eligible_percentage,
      color: 'bg-green-500'
    },
    {
      label: 'Near Eligible',
      count: near_eligible,
      percentage: near_eligible_percentage,
      color: 'bg-amber-500'
    },
    {
      label: 'Not Eligible',
      count: not_eligible,
      percentage: ((not_eligible / total_students) * 100).toFixed(1),
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Funnel Visualization */}
      <div className="space-y-2">
        {stages.map((stage, index) => {
          const width = stage.percentage;

          return (
            <div key={index} className="flex items-center gap-4">
              <div className="w-40 text-right text-sm font-medium text-gray-700">
                {stage.label}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`${stage.color} h-12 rounded-r-lg transition-all duration-500 flex items-center justify-between px-4 text-white font-semibold`}
                    style={{ width: `${width}%`, minWidth: '120px' }}
                  >
                    <span>{stage.count}</span>
                    <span className="text-sm">{stage.percentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scholarship Types Breakdown */}
      {scholarship_types && Object.keys(scholarship_types).length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3">Scholarship Types Distribution</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(scholarship_types).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between p-2 bg-white rounded border border-blue-100">
                <span className="text-sm text-gray-700">{type.replace('_', ' ')}</span>
                <span className="font-semibold text-blue-700">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{eligible_percentage}%</p>
          <p className="text-xs text-gray-600">Eligible</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-600">{near_eligible_percentage}%</p>
          <p className="text-xs text-gray-600">Near Eligible</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-600">
            {((not_eligible / total_students) * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600">Not Eligible</p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipFunnel;
