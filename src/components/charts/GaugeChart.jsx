/**
 * GPA Gauge Chart - A radial gauge showing GPA value
 */
export const GaugeChart = ({
  value,
  maxValue = 4.0,
  label = 'GPA',
  size = 200,
  strokeWidth = 20
}) => {
  const percentage = (value / maxValue) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const halfCircumference = circumference / 2;
  const strokeDashoffset = halfCircumference - (percentage / 100) * halfCircumference;

  // Color based on GPA
  const getColor = (gpa) => {
    if (gpa >= 3.6) return '#10B981'; // Green - Distinction
    if (gpa >= 3.2) return '#3B82F6'; // Blue - First Division
    if (gpa >= 2.8) return '#8B5CF6'; // Purple - Second Division
    if (gpa >= 2.4) return '#F59E0B'; // Amber - Third Division
    if (gpa >= 2.0) return '#F97316'; // Orange - Pass
    return '#DC2626'; // Red - Fail
  };

  const color = getColor(value);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 30} className="overflow-visible">
        {/* Background arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Value arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={halfCircumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />

        {/* Center value */}
        <text
          x={size / 2}
          y={size / 2 - 10}
          textAnchor="middle"
          className="text-4xl font-bold"
          fill={color}
        >
          {value.toFixed(2)}
        </text>

        {/* Label */}
        <text
          x={size / 2}
          y={size / 2 + 20}
          textAnchor="middle"
          className="text-sm"
          fill="#6B7280"
        >
          {label}
        </text>

        {/* Min/Max labels */}
        <text x={strokeWidth / 2} y={size / 2 + 25} textAnchor="start" className="text-xs" fill="#9CA3AF">
          0.0
        </text>
        <text x={size - strokeWidth / 2} y={size / 2 + 25} textAnchor="end" className="text-xs" fill="#9CA3AF">
          {maxValue}
        </text>
      </svg>
    </div>
  );
};

export default GaugeChart;
