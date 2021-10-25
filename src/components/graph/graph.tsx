import React, { useState, useEffect, Fragment } from "react";
import Chart from "react-apexcharts";
import { getHistoricData } from "../../services/dataService";
import { HistoricPrice } from "../../models/historicdata";

interface Props {
  currency: string;
  onError: Function;
}

const Graph: React.FC<Props> = ({ currency, onError }) => {
  const [series, setSeries] = useState<number[]>([]); // Data array for graph
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
  }); //Custom options to set on graph
  const [loading, setloading] = useState<boolean>(false); //for tracking wether api response

  const transformObjectToArray = (historicData: HistoricPrice): number[] => {
    //To transform object keys int array for graph data
    const copyHistoricData: HistoricPrice = { ...historicData };
    const historicDataArray: number[] = Object.keys(copyHistoricData).map(
      (key: string) => {
        return copyHistoricData[key];
      }
    );
    return historicDataArray;
  };

  const fetchHistoricData = (): void => {
    // method to fetch data from api
    try {
      setloading(true);
      getHistoricData(currency) //returns promise
        .then((response) => {
          const historicData: number[] = transformObjectToArray(response.bpi);
          setSeries(historicData);
          setOptions((prevState: any) => ({
            ...prevState,
            yaxis: { ...prevState.yaxis, max: Math.max(...historicData) },
          }));
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          onError(err.message);
        });
    } catch (e) {
      onError("An unknown error ocured");
    }
  };
  useEffect(() => {
    fetchHistoricData();
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
