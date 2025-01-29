import React from "react";
import {
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  Legend,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface RadialChartProps {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
  title: string;
}

export const RadialChart: React.FC<RadialChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-gray-900">{title}</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            barSize={20}
            data={data}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background
              dataKey="value"
              cornerRadius={30 / 2}
              label={{
                position: "insideStart",
                fill: "#fff",
                formatter: (value: number) => `${value}%`,
              }}
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontSize: "12px" }}
            />
          </RechartsRadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
