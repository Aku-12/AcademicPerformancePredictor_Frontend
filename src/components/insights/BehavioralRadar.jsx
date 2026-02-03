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
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#F1F5F9" strokeWidth={1.5} />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#64748B', fontSize: 10, fontWeight: 600, dy: 3 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#CBD5E1', fontSize: 9 }}
            axisLine={false}
          />
          <Radar
            name="Your Profile"
            dataKey="student"
            stroke="#4F46E5" // indigo-600
            strokeWidth={2}
            fill="#4F46E5"
            fillOpacity={0.4}
          />
          {idealProfile && (
            <Radar
              name="Ideal Goal"
              dataKey="ideal"
              stroke="#10B981" // emerald-500
              strokeWidth={1.5}
              fill="#10B981"
              fillOpacity={0.05}
              strokeDasharray="4 4"
            />
          )}
          <Legend 
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => <span className="text-xs text-gray-500 font-semibold ml-1">{value}</span>}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BehavioralRadar;
