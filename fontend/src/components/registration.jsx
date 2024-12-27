import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      alert(response.data.message);
      // Redirect to Login page
      window.location.href = '/login';
    } catch (error) {
      console.error(error);
      alert('Error during registration. Please try again.');
    }
  };

  return (
    <div className="registration-container" style={{ padding: '30px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            className="form-control"
            placeholder="Enter your mobile number"
            value={formData.mobileNumber}
            onChange={handleChange}
            pattern="\d{10}" // Ensures only 10 digits
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
