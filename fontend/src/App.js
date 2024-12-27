import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './components/registration';
import LoginPage from './components/login';
import Dashboard from './components/dashboard.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
