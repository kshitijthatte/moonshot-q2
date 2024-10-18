// import React, { useState, useEffect } from "react";
// import {
//   Bar,
//   BarChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { fetchFeatureData } from "../services/featureService"; 

// interface FeatureChartProps {
//   startDate: Date | null;
//   endDate: Date | null;
//   age: string;
//   gender: string;
//   onFeatureSelect: (feature: string) => void;
//   token: string;
// }

// interface DataPoint {
//   feature: string;
//   timeSpent: number;
// }

// const FeatureChart: React.FC<FeatureChartProps> = ({
//   startDate,
//   endDate,
//   age,
//   gender,
//   onFeatureSelect,
//   token,
// }) => {
//   const [data, setData] = useState<DataPoint[]>([]);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const jsonData = await fetchFeatureData(
//           startDate,
//           endDate,
//           age,
//           gender,
//           token
//         );
//         setData(jsonData);
//       } catch (error) {
//         console.error("Error loading feature data:", error);
//       }
//     };

//     getData();
//   }, [startDate, endDate, age, gender, token]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Feature Usage</CardTitle>
//         <CardDescription>Total time spent on each feature</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer
//           config={{
//             timeSpent: {
//               label: "Time Spent",
//               color: "hsl(var(--chart-1))",
//             },
//           }}
//           className="h-[300px]"
//         >
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={data}
//               layout="vertical"
//               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis type="number" />
//               <YAxis dataKey="feature" type="category" width={40} />
//               <ChartTooltip content={<ChartTooltipContent />} />
//               <Bar
//                 dataKey="timeSpent"
//                 fill="var(--color-timeSpent)"
//                 onClick={data => onFeatureSelect(data.feature)}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default FeatureChart;

import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
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
import { fetchFeatureData } from "../services/featureService";

interface FeatureChartProps {
  startDate: Date | null;
  endDate: Date | null;
  age: string;
  gender: string;
  onFeatureSelect: (feature: string) => void;
  token: string;
}

interface DataPoint {
  feature: string;
  timeSpent: number;
}

const FeatureChart: React.FC<FeatureChartProps> = ({
  startDate,
  endDate,
  age,
  gender,
  onFeatureSelect,
  token,
}) => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonData = await fetchFeatureData(
          startDate,
          endDate,
          age,
          gender,
          token
        );
        setData(jsonData);
      } catch (error) {
        console.error("Error loading feature data:", error);
      }
    };

    getData();
  }, [startDate, endDate, age, gender, token]);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Feature Usage</CardTitle>
        <CardDescription className="text-sm sm:text-base">Total time spent on each feature</CardDescription>
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
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 20, left: -40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}h`}
              />
              <YAxis
                dataKey="feature"
                type="category"
                width={80}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="timeSpent"
                fill="var(--color-timeSpent)"
                onClick={(data) => onFeatureSelect(data.feature)}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FeatureChart;