/**
 * Donut/Pie Chart for Distribution Visualization
 */
export const DonutChart = ({
  data,
  size = 200,
  strokeWidth = 40,
  title,
  centerLabel,
  centerValue
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Calculate total
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate stroke dash arrays and offsets
  let cumulativePercent = 0;
  const segments = data.map((item, index) => {
    const percent = (item.value / total) * 100;
    const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativePercent / 100) * circumference);
    cumulativePercent += percent;

    return {
      ...item,
      percent,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="flex flex-col items-center">
      {title && (
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      )}
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />

          {/* Data segments */}
          {segments.map((segment, index) => (
            <circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={segment.strokeDasharray}
              strokeDashoffset={segment.strokeDashoffset}
              className="transition-all duration-700"
              style={{ transformOrigin: 'center' }}
            />
          ))}
        </svg>

        {/* Center content */}
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerValue && (
              <span className="text-2xl font-bold text-gray-800">{centerValue}</span>
            )}
            {centerLabel && (
              <span className="text-xs text-gray-500">{centerLabel}</span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-xs text-gray-600">
              {segment.label}: {segment.percent.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Progress Ring - Simple circular progress indicator
 */
export const ProgressRing = ({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 10,
  color = '#3B82F6',
  label,
  showPercent = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = (value / maxValue) * 100;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const center = size / 2;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />

          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showPercent ? (
            <span className="text-xl font-bold" style={{ color }}>
              {percent.toFixed(0)}%
            </span>
          ) : (
            <span className="text-xl font-bold" style={{ color }}>
              {value}
            </span>
          )}
        </div>
      </div>

      {label && (
        <span className="text-xs text-gray-600 mt-2 text-center">{label}</span>
      )}
    </div>
  );
};

/**
 * Multi Progress Rings - Show multiple metrics side by side
 */
export const MultiProgressRings = ({
  data,
  size = 100,
  strokeWidth = 8,
  title
}) => {
  return (
    <div className="w-full">
      {title && (
        <h4 className="text-sm font-semibold text-gray-700 mb-4">{title}</h4>
      )}
      <div className="flex flex-wrap justify-center gap-6">
        {data.map((item, index) => (
          <ProgressRing
            key={index}
            value={item.value}
            maxValue={item.maxValue || 100}
            size={size}
            strokeWidth={strokeWidth}
            color={item.color}
            label={item.label}
            showPercent={item.showPercent !== false}
          />
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
