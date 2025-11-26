import React from "react";
import StockChart from "../components/StockChart";

const Stocks = () => {
  return (
    <div>
      <h1>Live Stock Market</h1>
      <StockChart stockName="Apple" />
      <StockChart stockName="Google" />
      <StockChart stockName="Tesla" />
    </div>
  );
};

export default Stocks;
