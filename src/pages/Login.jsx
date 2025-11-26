import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Debug: Check if users exist in localStorage
    console.log("Stored users:", localStorage.getItem("users"));

    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const user = storedUsers.find((u) => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", username);
      console.log("Login successful for:", username);
      navigate("/"); // Redirect to home
    } else {
      alert("Invalid credentials! Please try again.");
      console.log("Login failed: User not found.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="login-links">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
