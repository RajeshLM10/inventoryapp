// src/components/ProductEntry.js
import React, { useState } from 'react';
import axios from 'axios';
import './ProductEntry.css';

const ProductEntry = ({ updateInventory }) => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that quantity and price are positive numbers
    const parsedQuantity = parseInt(quantity, 10);
    const parsedPrice = parseFloat(price);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0 || isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Please enter valid positive values for quantity and price.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/inventory',
        {
          name: productName,
          quantity: parsedQuantity,
          price: parsedPrice,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTgxNjMyYWJkNzhiZmQ3Njk2Y2VmZGYiLCJpYXQiOjE3MDMxMzk3MzJ9.OEHePaQIQC1Z8nk2spYUbpbAhHH4Z9T7lEIguugh1fo`, // Replace with your actual access token
          },
        }
      );

      updateInventory(response.data);

      setProductName('');
      setQuantity('');
      setPrice('');
      setError(null);
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Error creating product. Please try again.');
    }
  };

  return (
    <div className="product-entry-container">
      <h2>Product Entry</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Price:
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Product to Inventory</button>
      </form>
    </div>
  );
};

export default ProductEntry;
