import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const CandlestickChart = ({ stockData }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
      layout: {
        backgroundColor: "#1e1e1e",
        textColor: "#ffffff",
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
    });

    const candlestickSeries = chart.addCandlestickSeries();

    // Ensure stockData is in the correct format
    if (stockData && stockData.length > 0) {
      candlestickSeries.setData(stockData);
    }

    return () => chart.remove();
  }, [stockData]);

  return <div ref={chartContainerRef} />;
};

export default CandlestickChart;
