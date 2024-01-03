// src/components/Home.js
import React from 'react';
import './Home.css';


const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Your Inventory Management System</h2>
      
      {/* Box 1: Electronics Inventory */}
      <div className="inventory-box">
        <h3>Electronics Inventory</h3>
        <p>Total Items: 50</p>
        <p>Featured Product: Smartphone X</p>
      </div>

      {/* Box 2: Clothing Inventory */}
      <div className="inventory-box">
        <h3>Clothing Inventory</h3>
        <p>Total Items: 100</p>
        <p>Featured Product: Summer Collection</p>
      </div>

      {/* Box 3: Office Supplies Inventory */}
      <div className="inventory-box">
        <h3>Office Supplies Inventory</h3>
        <p>Total Items: 75</p>
        <p>Featured Product: Executive Desk Organizer</p>
      </div>
      </div>
  );
};

export default Home;
