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
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Returns Projection</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="returns" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};