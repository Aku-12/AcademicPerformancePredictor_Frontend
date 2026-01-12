/**
 * Horizontal Bar Chart for Comparisons
 */
export const BarChart = ({
  data,
  title,
  maxValue = 100,
  showValues = true,
  barHeight = 24,
  animated = true
}) => {
  return (
    <div className="w-full">
      {title && (
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      )}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">{item.label}</span>
              {showValues && (
                <span className="text-xs font-medium text-gray-700">
                  {item.value}{item.unit || ''}
                </span>
              )}
            </div>
            <div
              className="w-full bg-gray-100 rounded-full overflow-hidden"
              style={{ height: barHeight }}
            >
              <div
                className={`h-full rounded-full ${animated ? 'transition-all duration-700 ease-out' : ''}`}
                style={{
                  width: `${Math.min((item.value / maxValue) * 100, 100)}%`,
                  backgroundColor: item.color || '#3B82F6',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Grouped Bar Chart for Side-by-Side Comparisons
 */
export const GroupedBarChart = ({
  data,
  groups,
  title,
  maxValue = 100,
  barHeight = 20
}) => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="w-full">
      {title && (
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      )}
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <span className="text-xs text-gray-600 mb-2 block">{item.label}</span>
            <div className="space-y-1">
              {groups.map((group, gIndex) => (
                <div key={gIndex} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-16 truncate">{group}</span>
                  <div
                    className="flex-1 bg-gray-100 rounded-full overflow-hidden"
                    style={{ height: barHeight }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((item.values[gIndex] / maxValue) * 100, 100)}%`,
                        backgroundColor: colors[gIndex % colors.length],
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 w-10 text-right">
                    {item.values[gIndex]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4">
        {groups.map((group, index) => (
          <div key={index} className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-xs text-gray-600">{group}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Stacked Bar Chart
 */
export const StackedBarChart = ({
  data,
  categories,
  title,
  orientation = 'horizontal'
}) => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  if (orientation === 'horizontal') {
    return (
      <div className="w-full">
        {title && (
          <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
        )}
        <div className="space-y-3">
          {data.map((item, index) => {
            const total = item.values.reduce((a, b) => a + b, 0);
            return (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">{item.label}</span>
                  <span className="text-xs text-gray-500">Total: {total}</span>
                </div>
                <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden flex">
                  {item.values.map((value, vIndex) => (
                    <div
                      key={vIndex}
                      className="h-full transition-all duration-500 relative group"
                      style={{
                        width: `${(value / total) * 100}%`,
                        backgroundColor: colors[vIndex % colors.length],
                      }}
                      title={`${categories[vIndex]}: ${value}`}
                    >
                      {(value / total) * 100 > 10 && (
                        <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                          {value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4">
          {categories.map((cat, index) => (
            <div key={index} className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-xs text-gray-600">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vertical orientation
  const maxTotal = Math.max(...data.map(item => item.values.reduce((a, b) => a + b, 0)));

  return (
    <div className="w-full">
      {title && (
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      )}
      <div className="flex items-end gap-2 h-48">
        {data.map((item, index) => {
          const total = item.values.reduce((a, b) => a + b, 0);
          const heightPercent = (total / maxTotal) * 100;

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t overflow-hidden flex flex-col-reverse"
                style={{ height: `${heightPercent}%` }}
              >
                {item.values.map((value, vIndex) => (
                  <div
                    key={vIndex}
                    className="w-full transition-all duration-500"
                    style={{
                      height: `${(value / total) * 100}%`,
                      backgroundColor: colors[vIndex % colors.length],
                    }}
                    title={`${categories[vIndex]}: ${value}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 mt-2 text-center truncate w-full">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {categories.map((cat, index) => (
          <div key={index} className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-xs text-gray-600">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
