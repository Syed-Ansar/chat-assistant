import { ResponsiveRadialBar } from "@nivo/radial-bar";

const data = [
  {
    id: "Supermarket",
    data: [
      {
        x: "Vegetables",
        y: 128,
      },
      {
        x: "Fruits",
        y: 151,
      },
      {
        x: "Meat",
        y: 268,
      },
    ],
  },
  {
    id: "Combini",
    data: [
      {
        x: "Vegetables",
        y: 231,
      },
      {
        x: "Fruits",
        y: 128,
      },
      {
        x: "Meat",
        y: 99,
      },
    ],
  },
  {
    id: "Online",
    data: [
      {
        x: "Vegetables",
        y: 57,
      },
      {
        x: "Fruits",
        y: 177,
      },
      {
        x: "Meat",
        y: 189,
      },
    ],
  },
];

const RadialChart = () => (
  <div className="h-64 block">
    <h1 className="text-center">Radial Plot</h1>
    <ResponsiveRadialBar
      data={data}
      valueFormat=">-.2f"
      cornerRadius={2}
      radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
      circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 80,
          translateY: 0,
          itemsSpacing: 6,
          itemDirection: "left-to-right",
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          symbolSize: 18,
          symbolShape: "square",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  </div>
);

export default RadialChart;
