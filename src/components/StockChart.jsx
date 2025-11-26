import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const StockChart = ({ stockName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Generate initial stock data
    const generateInitialData = () => {
      return new Array(10).fill(0).map((_, index) => ({
        time: `Day ${index + 1}`,
        price: 100 + Math.floor(Math.random() * 50),
      }));
    };

    setData(generateInitialData());

    // Simulate live stock price updates
    const interval = setInterval(() => {
      setData((prevData) => {
        const lastPrice = prevData[prevData.length - 1]?.price || 100;
        const newPrice = lastPrice + (Math.random() > 0.5 ? 5 : -5); // More realistic changes

        return [...prevData.slice(1), { time: `Day ${prevData.length + 1}`, price: newPrice }];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stock-chart-container">
      <h3>{stockName} Stock Price</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="price" stroke="#4CAF50" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
