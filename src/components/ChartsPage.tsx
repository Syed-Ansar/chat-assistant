import GaugeChart from "./charts/GaugeChart";
import LineChart from "./charts/LineChart";
import RadialChart from "./charts/RadialCharts";
import { ScatterChart } from "./charts/ScattarChart";

const ChartsPage = () => {
  return (
    <div className="w-full space-y-10 flex flex-wrap py-20">
      <div className="w-full flex justify-around">
        <GaugeChart />
        <LineChart />
        <ScatterChart />
      </div>
      <div className="w-96 space-y-5 mx-auto">
        <RadialChart />
      </div>
    </div>
  );
};

export default ChartsPage;
