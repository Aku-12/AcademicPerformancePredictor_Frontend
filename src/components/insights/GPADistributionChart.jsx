import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const GPADistributionChart = ({ data, currentGPA }) => {
  // Transform bins data for recharts
  const chartData = data.bins.map(bin => ({
    range: `${bin.min.toFixed(1)}-${bin.max.toFixed(1)}`,
    count: bin.count,
    midpoint: (bin.min + bin.max) / 2
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="range"
            tick={{ fill: '#6B7280', fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            tick={{ fill: '#6B7280', fontSize: 12 }}
            label={{ value: 'Number of Students', angle: -90, position: 'insideLeft', style: { fill: '#6B7280' } }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '0.375rem' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => {
              // Highlight bar containing current GPA
              const isCurrentRange = currentGPA &&
                currentGPA >= data.bins[index].min &&
                currentGPA < data.bins[index].max;

              return (
                <Cell
                  key={`cell-${index}`}
                  fill={isCurrentRange ? '#3B82F6' : '#93C5FD'}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GPADistributionChart;
