import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FeatureImportanceChart = ({ featureImportance, topN = 15 }) => {
  // Transform feature importance object to array
  const data = Object.entries(featureImportance || {})
    .slice(0, topN)
    .map(([feature, importance]) => ({
      feature: feature.replace(/_/g, ' '),
      importance: importance * 100 // Convert to percentage
    }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            type="number"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            label={{ value: 'Importance (%)', position: 'insideBottom', offset: -5, style: { fill: '#6B7280' } }}
          />
          <YAxis
            dataKey="feature"
            type="category"
            tick={{ fill: '#6B7280', fontSize: 11 }}
            width={140}
          />
          <Tooltip
            formatter={(value) => `${value.toFixed(2)}%`}
            contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '0.375rem' }}
          />
          <Bar
            dataKey="importance"
            fill="#3B82F6"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportanceChart;
