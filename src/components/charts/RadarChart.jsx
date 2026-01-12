/**
 * Radar/Spider Chart for Performance Metrics
 */
export const RadarChart = ({
  data,
  size = 300,
  levels = 5,
  color = '#3B82F6'
}) => {
  const center = size / 2;
  const radius = (size - 60) / 2;
  const angleSlice = (2 * Math.PI) / data.length;

  // Generate points for each level
  const generateLevelPoints = (level) => {
    const levelRadius = (radius / levels) * level;
    return data.map((_, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      return {
        x: center + levelRadius * Math.cos(angle),
        y: center + levelRadius * Math.sin(angle)
      };
    });
  };

  // Generate polygon points for data
  const generateDataPoints = () => {
    return data.map((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const pointRadius = (d.value / 100) * radius;
      return {
        x: center + pointRadius * Math.cos(angle),
        y: center + pointRadius * Math.sin(angle)
      };
    });
  };

  const dataPoints = generateDataPoints();
  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Generate axis lines
  const axisLines = data.map((_, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    return {
      x2: center + radius * Math.cos(angle),
      y2: center + radius * Math.sin(angle)
    };
  });

  // Generate label positions
  const labelPositions = data.map((d, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const labelRadius = radius + 25;
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
      label: d.label,
      value: d.value
    };
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background levels */}
        {[...Array(levels)].map((_, level) => {
          const points = generateLevelPoints(level + 1);
          const polygon = points.map(p => `${p.x},${p.y}`).join(' ');
          return (
            <polygon
              key={level}
              points={polygon}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {axisLines.map((line, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={line.x2}
            y2={line.y2}
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon */}
        <polygon
          points={dataPolygon}
          fill={color}
          fillOpacity="0.3"
          stroke={color}
          strokeWidth="2"
          style={{ transition: 'all 0.5s ease-in-out' }}
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="5"
            fill={color}
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {labelPositions.map((pos, i) => (
          <g key={i}>
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium"
              fill="#374151"
            >
              {pos.label}
            </text>
            <text
              x={pos.x}
              y={pos.y + 14}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs"
              fill="#6B7280"
            >
              {pos.value}%
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default RadarChart;
