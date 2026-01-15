import React from 'react';

const GPAGauge = ({ gpa, category, percentile }) => {
  // Calculate rotation for gauge needle
  const rotation = (gpa / 4.0) * 180 - 90;

  // Category color mapping
  const categoryColors = {
    'Distinction': '#10B981',
    'First_Division': '#3B82F6',
    'Second_Division': '#F59E0B',
    'Third_Division': '#EF4444',
    'Pass': '#6B7280',
    'Fail': '#DC2626'
  };

  const color = categoryColors[category] || '#6B7280';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-32">
        {/* SVG Gauge */}
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 10 95 A 90 90 0 0 1 190 95"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Colored progress arc */}
          <path
            d="M 10 95 A 90 90 0 0 1 190 95"
            fill="none"
            stroke={color}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={`${(gpa / 4.0) * 283} 283`}
          />

          {/* Center dot */}
          <circle cx="100" cy="95" r="8" fill="#374151" />

          {/* Needle */}
          <line
            x1="100"
            y1="95"
            x2="100"
            y2="20"
            stroke="#374151"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${rotation} 100 95)`}
          />

          {/* GPA markers */}
          <text x="10" y="110" fontSize="12" fill="#6B7280" textAnchor="middle">0.0</text>
          <text x="100" y="15" fontSize="12" fill="#6B7280" textAnchor="middle">2.0</text>
          <text x="190" y="110" fontSize="12" fill="#6B7280" textAnchor="middle">4.0</text>
        </svg>
      </div>

      {/* GPA Value */}
      <div className="mt-4 text-center">
        <div className="text-4xl font-bold" style={{ color }}>
          {gpa.toFixed(2)}
        </div>
        <div className="text-sm text-gray-600 mt-1">{category.replace('_', ' ')}</div>
        {percentile !== undefined && (
          <div className="text-xs text-gray-500 mt-2">
            {percentile}th Percentile
          </div>
        )}
      </div>
    </div>
  );
};

export default GPAGauge;
