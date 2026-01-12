/**
 * Heatmap Chart for Factor Contributions
 */
export const HeatmapChart = ({
  data,
  title = 'Factor Contributions',
  showValues = true
}) => {
  // Get color based on value (0-100)
  const getColor = (value) => {
    if (value >= 80) return { bg: '#065F46', text: '#ECFDF5' };
    if (value >= 60) return { bg: '#10B981', text: '#FFFFFF' };
    if (value >= 40) return { bg: '#34D399', text: '#064E3B' };
    if (value >= 20) return { bg: '#6EE7B7', text: '#064E3B' };
    return { bg: '#D1FAE5', text: '#064E3B' };
  };

  // Get impact color (positive/negative)
  const getImpactColor = (impact) => {
    if (impact === 'positive') return { bg: '#10B981', border: '#059669' };
    if (impact === 'negative') return { bg: '#EF4444', border: '#DC2626' };
    return { bg: '#6B7280', border: '#4B5563' };
  };

  return (
    <div className="w-full">
      {title && (
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      )}
      <div className="space-y-2">
        {data.map((item, index) => {
          const colors = getColor(item.value);
          const impactColors = getImpactColor(item.impact);

          return (
            <div key={index} className="relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-600 w-32 truncate" title={item.label}>
                  {item.label}
                </span>
                <div className="flex-1 h-6 bg-gray-100 rounded-md overflow-hidden relative">
                  <div
                    className="h-full rounded-md transition-all duration-500 flex items-center justify-end pr-2"
                    style={{
                      width: `${Math.min(item.value, 100)}%`,
                      backgroundColor: colors.bg,
                    }}
                  >
                    {showValues && item.value >= 15 && (
                      <span className="text-xs font-medium" style={{ color: colors.text }}>
                        {item.value}%
                      </span>
                    )}
                  </div>
                  {showValues && item.value < 15 && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      {item.value}%
                    </span>
                  )}
                </div>
                {item.impact && (
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: impactColors.bg }}
                    title={`${item.impact} impact`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span>Positive</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span>Negative</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-gray-500" />
          <span>Neutral</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Grid Heatmap for correlation matrix
 */
export const GridHeatmap = ({
  data,
  labels,
  title = 'Correlation Matrix',
  size = 'md'
}) => {
  const cellSize = size === 'sm' ? 30 : size === 'lg' ? 50 : 40;

  // Get color based on correlation value (-1 to 1)
  const getCorrelationColor = (value) => {
    if (value >= 0.8) return '#065F46';
    if (value >= 0.6) return '#10B981';
    if (value >= 0.4) return '#34D399';
    if (value >= 0.2) return '#6EE7B7';
    if (value >= 0) return '#D1FAE5';
    if (value >= -0.2) return '#FEE2E2';
    if (value >= -0.4) return '#FECACA';
    if (value >= -0.6) return '#F87171';
    if (value >= -0.8) return '#EF4444';
    return '#DC2626';
  };

  const getTextColor = (value) => {
    return Math.abs(value) >= 0.6 ? '#FFFFFF' : '#374151';
  };

  return (
    <div className="w-full overflow-x-auto">
      {title && (
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      )}
      <div className="inline-block">
        {/* Header row */}
        <div className="flex">
          <div style={{ width: cellSize * 2 }} />
          {labels.map((label, i) => (
            <div
              key={i}
              style={{ width: cellSize, height: cellSize }}
              className="flex items-center justify-center"
            >
              <span
                className="text-xs text-gray-600 transform -rotate-45 origin-center truncate"
                style={{ maxWidth: cellSize * 1.4 }}
                title={label}
              >
                {label.slice(0, 6)}
              </span>
            </div>
          ))}
        </div>

        {/* Data rows */}
        {data.map((row, i) => (
          <div key={i} className="flex">
            <div
              style={{ width: cellSize * 2 }}
              className="flex items-center pr-2"
            >
              <span className="text-xs text-gray-600 truncate" title={labels[i]}>
                {labels[i]}
              </span>
            </div>
            {row.map((value, j) => (
              <div
                key={j}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: getCorrelationColor(value),
                }}
                className="flex items-center justify-center border border-white"
                title={`${labels[i]} vs ${labels[j]}: ${value.toFixed(2)}`}
              >
                <span
                  className="text-xs font-medium"
                  style={{ color: getTextColor(value) }}
                >
                  {value.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Color scale legend */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-gray-500">-1</span>
        <div className="flex h-4 rounded overflow-hidden">
          {['#DC2626', '#F87171', '#FECACA', '#FEE2E2', '#D1FAE5', '#6EE7B7', '#34D399', '#10B981', '#065F46'].map((color, i) => (
            <div key={i} style={{ backgroundColor: color, width: 20, height: '100%' }} />
          ))}
        </div>
        <span className="text-xs text-gray-500">+1</span>
      </div>
    </div>
  );
};

export default HeatmapChart;
