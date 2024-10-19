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
        <CardTitle className="text-lg sm:text-xl md:text-2xl">{feature} Usage Trend</CardTitle>
        <CardDescription className="text-sm sm:text-base">Time spent on {feature} over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            timeSpent: {
              label: "Time Spent",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="w-full aspect-[4/3] sm:aspect-[16/9]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
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
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}h`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
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
