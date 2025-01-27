import ChartsPage from "../components/ChartsPage";
import { ScatterChart } from "../components/charts/ScattarChart";

const Analytics = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <ChartsPage />
      <ScatterChart />
    </div>
  );
};

export default Analytics;
