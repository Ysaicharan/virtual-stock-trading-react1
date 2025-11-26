import { useState } from "react";
import "../styles/StocksList.css";

const mockStocks = [
  { id: 1, name: "Apple Inc.", price: 150 },
  { id: 2, name: "Tesla", price: 800 },
  { id: 3, name: "Amazon", price: 3200 },
  { id: 4, name: "Google", price: 2800 },
];

const StocksList = ({ onBuyStock }) => {
  return (
    <div className="stocks-container">
      <h2>Available Stocks</h2>
      <ul>
        {mockStocks.map((stock) => (
          <li key={stock.id} className="stock-item">
            <span>{stock.name} - ${stock.price}</span>
            <button onClick={() => onBuyStock(stock)}>Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StocksList;
