import React from 'react';

const Dashboard = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    window.location.href = '/login';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{getGreeting()}, User!</h1>
      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    </div>
  );
};

export default Dashboard;
