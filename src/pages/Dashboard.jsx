import { useState, useEffect } from "react";
import "./Portfolio.css"; // Ensure this CSS file exists

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const storedPortfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
    setPortfolio(storedPortfolio);
  }, []);

  return (
    <div className="portfolio-container">
      <h2>My Portfolio</h2>
      {portfolio.length > 0 ? (
        <ul>
          {portfolio.map((stock, index) => (
            <li key={index}>
              {stock.name} - ${stock.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No stocks purchased yet.</p>
      )}
    </div>
  );
};

export default Portfolio;
