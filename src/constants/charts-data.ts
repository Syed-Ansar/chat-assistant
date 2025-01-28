export const revenueData = [
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

export const customerData = [
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
  size: Math.sqrt(item.transactions) * 3,
}));

export const performanceData = [
  { name: "Customer Satisfaction", value: 92, fill: "#22c55e" },
  { name: "Employee Engagement", value: 88, fill: "#3b82f6" },
  { name: "Market Share", value: 75, fill: "#8b5cf6" },
  { name: "Revenue Growth", value: 85, fill: "#f59e0b" },
];
