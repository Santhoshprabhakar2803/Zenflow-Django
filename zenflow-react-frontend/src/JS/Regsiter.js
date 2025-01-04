import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Register.css';  // Importing the CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'client',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/register/', formData);
      alert(response.data.message);
    } catch (error) {
      // Check if error.response exists
      if (error.response) {
        // Handle the error when response is available
        console.error("Error response:", error.response.data);
        alert(`Error: ${error.response.data.message || 'Something went wrong'}`);
      } else if (error.request) {
        // Handle errors where no response was received
        console.error("Error request:", error.request);
        alert("Network error or server did not respond");
      } else {
        // Handle other types of errors (e.g., setup errors)
        console.error("Error message:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
  

  return (
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
          <option value="client">Client</option>
          <option value="project_manager">Project Manager</option>
          <option value="freelancer">Freelancer</option>
        </select>

        <button className="form-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
