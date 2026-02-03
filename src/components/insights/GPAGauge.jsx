import React from 'react';

const GPAGauge = ({ gpa, category, percentile }) => {
  // Calculate rotation for gauge needle
  const rotation = (gpa / 4.0) * 180 - 90;

  // Category color mapping - using new palette
  const categoryColors = {
    'Distinction': '#10B981', // emerald-500
    'First_Division': '#4F46E5', // indigo-600
    'Second_Division': '#F59E0B', // amber-500
    'Third_Division': '#F97316', // orange-500
    'Pass': '#64748B', // slate-500
    'Fail': '#E11D48' // rose-600
  };

  const color = categoryColors[category] || '#64748B';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-32">
        {/* SVG Gauge */}
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 10 95 A 90 90 0 0 1 190 95"
            fill="none"
            stroke="#F1F5F9" // slate-100
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
            className="transition-all duration-1000 ease-out"
          />

          {/* Center dot */}
          <circle cx="100" cy="95" r="8" fill="#1E293B" /> {/* slate-800 */}

          {/* Needle */}
          <line
            x1="100"
            y1="95"
            x2="100"
            y2="20"
            stroke="#1E293B" // slate-800
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${rotation} 100 95)`}
            className="transition-transform duration-1000 ease-out origin-[100px_95px]"
          />

          {/* GPA markers */}
          <text x="10" y="115" fontSize="10" fill="#94A3B8" textAnchor="middle" fontWeight="500">0.0</text>
          <text x="100" y="15" fontSize="10" fill="#94A3B8" textAnchor="middle" fontWeight="500">2.0</text>
          <text x="190" y="115" fontSize="10" fill="#94A3B8" textAnchor="middle" fontWeight="500">4.0</text>
        </svg>
      </div>

      {/* GPA Value */}
      <div className="mt-6 text-center">
        <div className="text-4xl font-bold transition-colors duration-500" style={{ color }}>
          {gpa.toFixed(2)}
        </div>
        <div className="text-sm font-medium text-gray-500 mt-1">{category.replace('_', ' ')}</div>
        {percentile !== undefined && (
          <div className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-2 inline-block">
            Top {100 - percentile}%
          </div>
        )}
      </div>
    </div>
  );
};

export default GPAGauge;
