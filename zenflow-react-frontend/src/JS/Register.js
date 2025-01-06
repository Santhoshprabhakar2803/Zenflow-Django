import React, { useState } from "react";
import axios from "axios";
import "../CSS/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });

  const [users, setUsers] = useState([]); // State to store all users

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        formData
      );
      alert(response.data.message);

      // Fetch all users after successful registration
      const usersResponse = await axios.get("http://127.0.0.1:8000/api/users/");
      setUsers(usersResponse.data); // Store all users in state
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Error: ${error.response.data.message || "Something went wrong"}`);
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Network error or server did not respond");
      } else {
        console.error("Error message:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1 className="site-title">ZenFlow</h1>
        <p className="site-description">
          Simplifying collaboration between clients, project managers, and freelancers for
          seamless project delivery.
        </p>
      </header>

      <div className="content">
        <div className="about">
          <h2>About ZenFlow</h2>
          <p>
            ZenFlow is a platform designed to create a role-based system for managing clients,
            project managers, and freelancers. It includes workflows for task management,
            milestone-based payments, and real-world API integrations to ensure a seamless
            experience.
          </p>
          <ul>
            <li>Role-based access for clients, managers, and freelancers</li>
            <li>Task assignment and status tracking</li>
            <li>Communication tools and milestone-based payments</li>
          </ul>
        </div>

        <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h1 className="form-title">Register</h1>

            <label className="form-label">Username:</label>
            <input
              className="form-input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

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

            <label className="form-label">Role:</label>
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select a role</option>
              <option value="client">Client</option>
              <option value="project_manager">Project Manager</option>
              <option value="freelancer">Freelancer</option>
            </select>

            <button className="form-button" type="submit">
              Register
            </button>
          </form>

          {/* Display all users */}
          {users.length > 0 && (
            <div className="users-list">
              <h2>All Users</h2>
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 ZenFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Register;
