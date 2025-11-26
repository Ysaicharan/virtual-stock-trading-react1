import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend, BarElement, CandlestickController, CandlestickElement } from "chart.js";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns"; // For time-based axis
import "./StockGraph.css"; // Add custom styles if needed

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend, BarElement, CandlestickController, CandlestickElement);

// Dummy stock data (Replace with API data later)
const stockData = [
  { time: "2025-02-10T10:00:00", open: 150, high: 155, low: 148, close: 153 },
  { time: "2025-02-10T11:00:00", open: 153, high: 158, low: 150, close: 156 },
  { time: "2025-02-10T12:00:00", open: 156, high: 160, low: 154, close: 157 },
  { time: "2025-02-10T13:00:00", open: 157, high: 162, low: 156, close: 161 },
];

const StockGraph = () => {
  const chartData = {
    labels: stockData.map((d) => d.time),
    datasets: [
      {
        label: "Stock Prices",
        data: stockData.map((d) => ({
          x: d.time,
          o: d.open,
          h: d.high,
          l: d.low,
          c: d.close,
        })),
        borderColor: "blue",
        backgroundColor: "rgba(0, 123, 255, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { type: "time", time: { unit: "hour" } },
      y: { beginAtZero: false },
    },
  };

  return (
    <div className="chart-container">
      <h2>Live Stock Graph</h2>
      <Chart type="candlestick" data={chartData} options={options} />
    </div>
  );
};

export default StockGraph;
