import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    mobileNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      alert(response.data.message);
      // Store the token in local storage
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="login-container" style={{ padding: '30px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            className="form-control"
            placeholder="Enter your mobile number"
            value={credentials.mobileNumber}
            onChange={handleChange}
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
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
