
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface DataPoint {
  time: string;
  cpu: number;
  memory: number;
  pods: number;
}

// Generate initial sample data
const generateData = () => {
  const data: DataPoint[] = [];
  const now = new Date();
  
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cpu: Math.floor(60 + Math.random() * 30),
      memory: Math.floor(70 + Math.random() * 20),
      pods: Math.floor(80 + Math.random() * 15)
    });
  }
  
  return data;
};

export const ClusterStatusChart = () => {
  const [data, setData] = useState<DataPoint[]>(generateData());
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const now = new Date();
        
        // Add a new data point
        newData.push({
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cpu: Math.floor(60 + Math.random() * 30),
          memory: Math.floor(70 + Math.random() * 20),
          pods: Math.floor(80 + Math.random() * 15)
        });
        
        // Remove the oldest data point
        if (newData.length > 11) {
          newData.shift();
        }
        
        return newData;
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-2 rounded shadow-md">
          <p className="font-medium">{`Time: ${label}`}</p>
          <p className="text-sm text-gitops-teal">{`CPU: ${payload[0].value}%`}</p>
          <p className="text-sm text-gitops-purple">{`Memory: ${payload[1].value}%`}</p>
          <p className="text-sm text-gitops-blue">{`Pods: ${payload[2].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cluster Resource Utilization</CardTitle>
        <CardDescription>Real-time resource usage across all clusters</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="#888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="#888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="cpu" 
              stroke="#06D6A0" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={true}
            />
            <Line 
              type="monotone" 
              dataKey="memory" 
              stroke="#6A4C93" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={true}
            />
            <Line 
              type="monotone" 
              dataKey="pods" 
              stroke="#457B9D" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="flex justify-center mt-2 gap-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gitops-teal mr-1" />
            <span>CPU</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gitops-purple mr-1" />
            <span>Memory</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gitops-lightBlue mr-1" />
            <span>Pods</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClusterStatusChart;
