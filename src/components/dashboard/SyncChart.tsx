
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const initialData: ChartData[] = [
  { name: 'Synced', value: 8, color: '#2A9D8F' }, // Green
  { name: 'Out of Sync', value: 2, color: '#F4A261' }, // Yellow
  { name: 'Failed', value: 1, color: '#E63946' }, // Red
  { name: 'Progressing', value: 3, color: '#457B9D' }, // Blue
];

export const SyncChart = () => {
  const [data, setData] = useState<ChartData[]>(initialData);
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        return prevData.map(item => {
          // Random small fluctuations in the data
          const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          return {
            ...item,
            value: Math.max(0, item.value + change) // Ensure value is not negative
          };
        });
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-2 rounded shadow-md text-sm">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-[300px] transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>Application Sync Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center flex-wrap gap-4 mt-2 text-sm">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: entry.color }}
              />
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SyncChart;
