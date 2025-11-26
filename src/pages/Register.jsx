import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // You can use the same styles as login

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    if (users.some((user) => user.username === username)) {
      alert("Username already exists! Try another.");
      return;
    }

    // Add new user
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit">Register</button>
        </form>
        <div className="login-links">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
