// Dashboard.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../authSlice'; // Adjust the import path based on your file structure

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear the authentication state
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <h1>This is the dashboard</h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
