import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

interface DataPoint {
  [key: string]: any;
}

interface LineChartProps {
  data: DataPoint[];
  lines: {
    key: string;
    color: string;
    name: string;
    type?: "line" | "area";
  }[];
  xAxisKey: string;
  yAxisFormatter?: (value: number) => string;
  title: string;
}

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const LineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  xAxisKey,
  yAxisFormatter = (value) => `$${value}`,
  title,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-gray-900">{title}</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xAxisKey} stroke="#6b7280" />
            <YAxis stroke="#6b7280" tickFormatter={yAxisFormatter} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {lines.map((line) =>
              line.type === "area" ? (
                <Area
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  fill={`${line.color}20`}
                  stroke={line.color}
                  name={line.name}
                />
              ) : (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  stroke={line.color}
                  strokeWidth={2}
                  name={line.name}
                  dot={{ fill: line.color }}
                />
              )
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
