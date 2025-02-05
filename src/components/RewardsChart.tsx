import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";

const generateDummyData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      day: `Day ${i + 1}`,
      returns: Math.min(100 + (i * 3.33), 200),
    });
  }
  return data;
};

export const RewardsChart = () => {
  const data = generateDummyData();

  return (
    <Card className="p-6 bg-white border-green-200 border-2">
      <h3 className="text-lg font-semibold mb-4 text-green-800">Returns Projection</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#047857" />
            <YAxis stroke="#047857" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff',
                border: '1px solid #047857'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="returns" 
              stroke="#059669"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};