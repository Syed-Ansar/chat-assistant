import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

interface GaugeChartProps {
  value: number;
  title: string;
  color: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  title,
  color,
}) => {
  const data = [{ value: Math.min(100, Math.max(0, value)) }];

  return (
    <div className="relative">
      <RadialBarChart
        width={200}
        height={200}
        cx={100}
        cy={100}
        innerRadius={60}
        outerRadius={80}
        barSize={10}
        data={data}
        startAngle={180}
        endAngle={0}
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
          fill={color}
        />
        <text
          x={100}
          y={85}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold"
          fill={color}
        >
          {value}%
        </text>
        <text
          x={100}
          y={115}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm font-medium text-gray-600"
        >
          {title}
        </text>
      </RadialBarChart>
    </div>
  );
};
