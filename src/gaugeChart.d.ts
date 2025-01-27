// In a new file: gaugeChart.d.ts
declare module "react-gauge-chart" {
  export interface GaugeChartProps {
    id: string;
    nrOfLevels: number;
    colors: string[];
    arcWidth: number;
    percent: number;
  }

  const GaugeChart: React.FC<GaugeChartProps>;
  export default GaugeChart;
}
