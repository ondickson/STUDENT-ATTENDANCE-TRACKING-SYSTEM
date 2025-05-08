// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create a Navbar.css file for styling

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/admin/dashboard">NVSU Admin Panel</Link> {/* Link to Dashboard */}
      </div>
      <div className="navbar-right">
        <button>Logout</button> {/* Add logout functionality later */}
      </div>
    </div>
  );
};

export default Navbar;
