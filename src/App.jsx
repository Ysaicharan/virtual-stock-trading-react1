import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";
import Stocks from "./pages/Stocks";

function App() {
  return (
    <Router>
      <Navbar />  {/* Add Navbar at the top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/market" element={<Market />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
