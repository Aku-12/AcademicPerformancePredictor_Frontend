import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { formatGPA } from '../../utils/formatters';

export const PredictionVisualization = ({ result }) => {
  if (!result || !result.feature_importance) return null;

  // Transform feature importance data
  const featureData = Object.entries(result.feature_importance)
    .map(([feature, importance]) => ({
      name: feature.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      importance: Math.abs(importance),
      originalValue: importance,
      fill: importance > 0 ? '#10B981' : '#F59E0B' // emerald-500 vs amber-500
    }))
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Feature Impact Analysis</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Factors most strongly influencing this prediction
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: '#64748B', width: 90 }} 
                  width={100}
                />
                <Tooltip
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value, name, props) => [
                     `${(value * 100).toFixed(1)}% influence`,
                     props.payload.originalValue > 0 ? 'Positive Impact' : 'Negative Impact'
                  ]}
                />
                <Bar dataKey="importance" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded bg-emerald-500"></div>
               <span>Positive Driver</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded bg-amber-500"></div>
               <span>Risk Factor</span>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
