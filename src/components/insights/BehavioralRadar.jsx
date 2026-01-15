import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const BehavioralRadar = ({ studentProfile, idealProfile }) => {
  // Transform data for recharts
  const data = Object.keys(studentProfile).map(key => ({
    dimension: key.replace('_', ' '),
    student: studentProfile[key],
    ideal: idealProfile?.[key] || 90
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#6B7280', fontSize: 10 }}
          />
          <Radar
            name="Your Profile"
            dataKey="student"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.5}
          />
          {idealProfile && (
            <Radar
              name="Ideal Profile"
              dataKey="ideal"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.2}
            />
          )}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BehavioralRadar;
