import React, { useState, useEffect, Fragment } from "react";
import Chart from "react-apexcharts";


interface Props {
  currency: string;
  onError: Function;
}

const Graph: React.FC<Props> = ({ currency, onError }) => {
  const [series, setSeries] = useState<number[]>([20,30,40,40,50]);
  const [options, setOptions] = useState<any>({
    chart: {
      foreColor: "red",
      id: "apexchart-example",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      show: false,
    },
    fill: {
      colors: ["#8bd0b1"],
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.4,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.6,
        stops: [0, 90, 100],
        colorStops: [],
      },
    },
    tooltip: {
      enabled: false,
    },
    yaxis: {
      show: false,
      showAlways: false,
      showForNullSeries: false,
      min: 0.5,
      max: 100,
    },
  });
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
  }, [currency]);
  return (
    <Fragment>
      {!loading && (
        <Chart
          options={options}
          series={[{ data: series }]}
          height={"100%"}
          type="area"
        />
      )}
    </Fragment>
  );
};

export default Graph;
