// src/components/Inventory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductEntry from './ProductEntry';
import './Inventory.css'; // Import the stylesheet

const Inventory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch inventory data from the backend
    axios.get('http://localhost:5000/api/inventory')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const updateInventory = (newProduct) => {
    // Update the inventory state with the new product
    setItems(prevItems => [...prevItems, newProduct]);
  };

  return (
    <div className="inventory-container">
      <ProductEntry updateInventory={updateInventory} />
    </div>
  );
};

export default Inventory;
