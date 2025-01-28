import { RadialChart } from "./charts/RadialCharts";
import { ScatterChart } from "./charts/ScattarChart";
import { LineChart } from "./charts/LineChart";
import {
  customerData,
  performanceData,
  revenueData,
} from "../constants/charts-data";
import { GaugeChart } from "./charts/GaugeChart";

export const Charts = () => {
  return (
    <div className="space-y-8">
      {/* Revenue Chart */}
      <LineChart
        data={revenueData}
        xAxisKey="month"
        title="Revenue Overview"
        yAxisFormatter={(value) => `$${value / 1000}k`}
        lines={[
          {
            color: "#60a5fa",
            key: "previous",
            name: "Previous Year",
            type: "area",
          },
          {
            color: "#2563eb",
            key: "current",
            name: "Current Year",
            type: "line",
          },
        ]}
      />

      {/* Scatter Plot */}
      <ScatterChart
        data={customerData}
        title="Customer Analysis"
        xAxisKey="age"
        xAxisLabel="age"
        yAxisKey="spending"
        yAxisLabel="Annual Spending"
      />

      {/* Gauge Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RadialChart data={performanceData} title="Performance Metrics" />

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-6 text-gray-900">
            System Health
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <GaugeChart value={98} title="Server Uptime" color="#22c55e" />
            <GaugeChart value={85} title="CPU Usage" color="#f59e0b" />
            <GaugeChart value={92} title="Memory" color="#3b82f6" />
            <GaugeChart value={78} title="Storage" color="#8b5cf6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
