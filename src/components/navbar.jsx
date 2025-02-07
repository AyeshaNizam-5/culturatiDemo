import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import culturatiLogo from '../assets/culturati-logo.png';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="flex justify-center mb6">
        <img src={culturatiLogo} alt="Culturati Logo"  className="navbar-logo" />
      </div>
      <div className="navbar-links">
        <Link to="/dashboard" className="dashboard-link">Dashboard</Link>
        <Link to="/institutions" className="dashboard-link">Institutions</Link>
        <Link to="/items" className="dashboard-link">Items</Link>
        <Link to="/levels" className="dashboard-link">Levels</Link>
        <Link to="/categories" className="dashboard-link">Categories</Link>
        <Link to="/settings"className="dashboard-link" >Settings</Link>
        <Link to="/logout" className="dashboard-link">Logout</Link>
      </div>
    </div>
  );
};

export default Navbar;
