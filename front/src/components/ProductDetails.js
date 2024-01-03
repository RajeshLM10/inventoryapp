// src/components/ProductDetails.js
import React from 'react';

const ProductDetails = ({ product }) => {
  return (
    <div>
      <h2>Product Details</h2>
      <p>Name: {product.name}</p>
      <p>Quantity: {product.quantity}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductDetails;
