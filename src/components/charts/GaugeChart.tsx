import GaugePlot from "react-gauge-chart";

const GaugeChart = () => {
  return (
    <div className="">
      <h1 className="text-center">Gauge Chart</h1>
      <GaugePlot
        id="gauge-chart6"
        animate={true}
        nrOfLevels={15}
        percent={0.56}
        needleColor="#345243"
      />
    </div>
  );
};

export default GaugeChart;
