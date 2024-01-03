// src/components/ProductList.js
import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>{product.name} - {product.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
