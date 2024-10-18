import React, { useState, useEffect } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchTrendData } from "../services/trendService"; 

interface TrendChartProps {
  feature: string;
  startDate: Date | null;
  endDate: Date | null;
  age: string;
  gender: string;
  token: string;
}

interface DataPoint {
  date: string;
  timeSpent: number;
}

const TrendChart: React.FC<TrendChartProps> = ({
  feature,
  startDate,
  endDate,
  age,
  gender,
  token,
}) => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonData = await fetchTrendData(feature, startDate, endDate, age, gender, token);
        setData(jsonData);
      } catch (error) {
        console.error('Error loading trend data:', error);
      }
    };

    getData();
  }, [feature, startDate, endDate, age, gender, token]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{feature} Usage Trend</CardTitle>
        <CardDescription>Time spent on {feature} over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            timeSpent: {
              label: "Time Spent",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="timeSpent"
                stroke="var(--color-timeSpent)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TrendChart;
