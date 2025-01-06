import React, { useState } from "react";
import axios from "axios";
import "../CSS/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        formData
      );
      alert(response.data.message);
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        // Redirect to the dashboard or another page
        window.location.href = "/dashboard";
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Error: ${error.response.data.message || "Invalid credentials"}`);
      } else {
        console.error("Error message:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1 className="site-title">ZenFlow Login</h1>
      </header>

      <div className="content">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="form-title">Login</h1>

            <label className="form-label">Email:</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label className="form-label">Password:</label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button className="form-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 ZenFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
