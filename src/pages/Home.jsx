import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/stocks");
  };

  return (
    <div className="home-container">
      <h1>Welcome to Virtual Stock Trading!</h1>
      <p>Practice trading stocks risk-free.</p>
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default Home;
