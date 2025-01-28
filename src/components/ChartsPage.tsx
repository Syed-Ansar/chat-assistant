import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

// Revenue data with year-over-year comparison
const revenueData = [
  { month: "Jan", current: 45000, previous: 38000 },
  { month: "Feb", current: 52000, previous: 42000 },
  { month: "Mar", current: 49000, previous: 40000 },
  { month: "Apr", current: 58000, previous: 45000 },
  { month: "May", current: 63000, previous: 48000 },
  { month: "Jun", current: 68000, previous: 52000 },
  { month: "Jul", current: 72000, previous: 55000 },
  { month: "Aug", current: 77000, previous: 58000 },
  { month: "Sep", current: 82000, previous: 61000 },
  { month: "Oct", current: 88000, previous: 65000 },
  { month: "Nov", current: 93000, previous: 69000 },
  { month: "Dec", current: 99000, previous: 73000 },
];

// Customer segmentation data
const customerData = [
  { age: 25, spending: 2100, transactions: 150 },
  { age: 28, spending: 2800, transactions: 180 },
  { age: 32, spending: 3500, transactions: 220 },
  { age: 35, spending: 4200, transactions: 280 },
  { age: 38, spending: 4800, transactions: 320 },
  { age: 42, spending: 5500, transactions: 380 },
  { age: 45, spending: 6200, transactions: 420 },
  { age: 48, spending: 6800, transactions: 460 },
  { age: 52, spending: 7500, transactions: 520 },
  { age: 55, spending: 8200, transactions: 580 },
  { age: 58, spending: 8800, transactions: 620 },
  { age: 62, spending: 9500, transactions: 680 },
].map((item) => ({
  ...item,
  size: Math.sqrt(item.transactions) * 3, // Dynamic bubble size based on transactions
}));

// Performance metrics data
const performanceData = [
  { name: "Customer Satisfaction", value: 92, fill: "#22c55e" },
  { name: "Employee Engagement", value: 88, fill: "#3b82f6" },
  { name: "Market Share", value: 75, fill: "#8b5cf6" },
  { name: "Revenue Growth", value: 85, fill: "#f59e0b" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
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

export const GaugeChart = ({
  value,
  title,
  color,
}: {
  value: number;
  title: string;
  color: string;
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

export const Charts = () => {
  return (
    <div className="space-y-8">
      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-gray-900">
          Revenue Overview
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis
                stroke="#6b7280"
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="previous"
                fill="#e0f2fe"
                stroke="#60a5fa"
                name="Previous Year"
              />
              <Line
                type="monotone"
                dataKey="current"
                stroke="#2563eb"
                strokeWidth={2}
                name="Current Year"
                dot={{ fill: "#2563eb" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customer Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-gray-900">
          Customer Analysis
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="age"
                name="Age"
                stroke="#6b7280"
                label={{ value: "Age", position: "bottom", offset: 0 }}
              />
              <YAxis
                dataKey="spending"
                name="Annual Spending"
                stroke="#6b7280"
                tickFormatter={(value) => `$${value / 1000}k`}
                label={{
                  value: "Annual Spending",
                  angle: -90,
                  position: "left",
                }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value: any) => `$${value.toLocaleString()}`}
              />
              <Scatter
                name="Customers"
                data={customerData}
                fill="#8b5cf6"
                fillOpacity={0.6}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics and System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-6 text-gray-900">
            Performance Metrics
          </h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="20%"
                outerRadius="90%"
                barSize={20}
                data={performanceData}
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
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health Gauges */}
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
