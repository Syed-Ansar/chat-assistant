import React from "react";
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ScatterChartProps {
  data: any[];
  xAxisKey: string;
  yAxisKey: string;
  xAxisLabel: string;
  yAxisLabel: string;
  title: string;
  color?: string;
  tooltipFormatter?: (value: any) => string;
}

export const ScatterChart: React.FC<ScatterChartProps> = ({
  data,
  xAxisKey,
  yAxisKey,
  xAxisLabel,
  yAxisLabel,
  title,
  color = "#8b5cf6",
  tooltipFormatter = (value) => `$${value.toLocaleString()}`,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-gray-900">{title}</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey={xAxisKey}
              name={xAxisLabel}
              stroke="#6b7280"
              label={{ value: xAxisLabel, position: "bottom", offset: 0 }}
            />
            <YAxis
              dataKey={yAxisKey}
              name={yAxisLabel}
              stroke="#6b7280"
              tickFormatter={tooltipFormatter}
              label={{ value: yAxisLabel, angle: -90, position: "left" }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={tooltipFormatter}
            />
            <Scatter
              name="Data Points"
              data={data}
              fill={color}
              fillOpacity={0.6}
            />
          </RechartsScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
