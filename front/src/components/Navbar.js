// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="app-header">
      <h1>Welcome to the Inventory App</h1>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/inventorylist">Inventory List</Link></li>
          {/* Add more navigation links */}
          {isAuthenticated ? (
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          ) : (
            <li><Link to="/login">Logout</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
