import { useState, useEffect } from "react";
import "./Market.css";

const stockData = [
  { id: 1, name: "Reliance Industries", price: 2700, logo: "https://logo.clearbit.com/ril.com" },
  { id: 2, name: "TCS", price: 3800, logo: "https://logo.clearbit.com/tcs.com" },
  { id: 3, name: "Infosys", price: 1600, logo: "https://logo.clearbit.com/infosys.com" },
  { id: 4, name: "HDFC Bank", price: 1500, logo: "https://logo.clearbit.com/hdfcbank.com" },
  { id: 5, name: "ICICI Bank", price: 950, logo: "https://logo.clearbit.com/icicibank.com" },
];

const Market = ({ updatePortfolio }) => {
  const [stocks] = useState(stockData);
  const [balance, setBalance] = useState(() => {
    return parseInt(localStorage.getItem("balance")) || 50000;
  });
  const [quantities, setQuantities] = useState({});
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Function to handle quantity change
  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value < 1 ? 1 : value,
    }));
  };

  // Function to show a popup message
  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2500); // Pop-up disappears after 2.5 seconds
  };

  // Function to buy stocks
  const buyStock = (stock) => {
    const quantity = quantities[stock.id] || 1;
    const totalCost = stock.price * quantity;

    if (totalCost > balance) {
      showPopupMessage("❌ Insufficient balance!");
      return;
    }

    let portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
    let existingStock = portfolio.find((item) => item.id === stock.id);

    if (existingStock) {
      existingStock.count += quantity;
    } else {
      portfolio.push({ ...stock, count: quantity });
    }

    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    updatePortfolio(portfolio);

    const newBalance = balance - totalCost;
    setBalance(newBalance);
    localStorage.setItem("balance", newBalance.toString()); // Ensure it's a string in localStorage

    showPopupMessage(`✅ Purchased ${quantity} shares of ${stock.name}`);
  };

  return (
    <div className="market-container">
      <h2>Stock Market</h2>
      <p className="balance">💰 Available Balance: ₹{balance}</p>
      <div className="stock-list">
        {stocks.map((stock) => (
          <div key={stock.id} className="stock-card">
            <img 
              src={stock.logo} 
              alt={stock.name} 
              className="stock-logo" 
              onError={(e) => (e.target.src = "https://via.placeholder.com/50")} 
            />
            <p className="stock-name">{stock.name}</p>
            <p className="stock-price">₹{stock.price}</p>
            <input 
              type="number" 
              min="1" 
              value={quantities[stock.id] || 1} 
              onChange={(e) => handleQuantityChange(stock.id, parseInt(e.target.value))}
              className="quantity-input"
            />
            <button className="buy-btn" onClick={() => buyStock(stock)}>Buy</button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Market;
