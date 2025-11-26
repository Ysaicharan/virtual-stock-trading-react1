import { useState, useEffect } from "react";
import "./Portfolio.css";

const Portfolio = ({ updatePortfolio }) => {
  const [ownedStocks, setOwnedStocks] = useState([]);
  const [totalShares, setTotalShares] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = () => {
    const storedPortfolio = JSON.parse(localStorage.getItem("portfolio")) || [];

    // Group stocks to avoid duplicates
    const groupedStocks = storedPortfolio.reduce((acc, stock) => {
      const existingStock = acc.find((item) => item.id === stock.id);
      if (existingStock) {
        existingStock.count += stock.count || 1;
      } else {
        acc.push({ ...stock, count: stock.count || 1 });
      }
      return acc;
    }, []);

    setOwnedStocks(groupedStocks);
    updatePortfolioStats(groupedStocks);
  };

  const updatePortfolioStats = (portfolio) => {
    let totalSharesCount = 0;
    let totalPortfolioValue = 0;

    portfolio.forEach((stock) => {
      totalSharesCount += stock.count;
      totalPortfolioValue += stock.count * stock.price;
    });

    setTotalShares(totalSharesCount);
    setTotalValue(totalPortfolioValue);
  };

  const sellStock = (stock) => {
    const quantityToSell = parseInt(prompt(`Enter quantity to sell (You own: ${stock.count})`), 10);

    if (isNaN(quantityToSell) || quantityToSell <= 0) {
      alert("Invalid quantity.");
      return;
    }

    if (quantityToSell > stock.count) {
      alert("You don't have enough shares to sell.");
      return;
    }

    let updatedPortfolio = ownedStocks
      .map((item) =>
        item.id === stock.id ? { ...item, count: item.count - quantityToSell } : item
      )
      .filter((item) => item.count > 0); // Remove stocks with 0 quantity

    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
    setOwnedStocks(updatedPortfolio);
    updatePortfolio(updatedPortfolio);
    updatePortfolioStats(updatedPortfolio);
  };

  return (
    <div className="portfolio-container">
      <h2>Your Portfolio</h2>
      <p className="total-info">📊 Total Shares: {totalShares} | 💰 Portfolio Value: ₹{totalValue}</p>

      {ownedStocks.length === 0 ? (
        <p>No stocks purchased yet.</p>
      ) : (
        <div className="portfolio-list">
          {ownedStocks.map((stock) => (
            <div key={stock.id} className="portfolio-card">
              <img
                src={stock.logo}
                alt={stock.name}
                className="stock-logo"
                onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
              />
              <p className="stock-name">{stock.name}</p>
              <p className="stock-price">₹{stock.price}</p>
              <p className="stock-quantity">📦 Quantity: {stock.count}</p>
              <button className="sell-btn" onClick={() => sellStock(stock)}>Sell</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
