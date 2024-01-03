// src/components/InventoryList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryList.css'; // Import the stylesheet
import ExportImport from './ExportImport';

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editedItemName, setEditedItemName] = useState('');
  const [editedItemQuantity, setEditedItemQuantity] = useState('');
  const [editedItemPrice, setEditedItemPrice] = useState('');

  useEffect(() => {
    // Fetch inventory data from the backend
    axios.get('http://localhost:5000/api/inventory')
      .then(response => setItems(response.data)) // Check if the 'price' field is present in the response.data
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (itemId, itemName, itemQuantity, itemPrice) => {
    setSelectedItemId(itemId);
    setEditedItemName(itemName);
    setEditedItemQuantity(itemQuantity);
    setEditedItemPrice(itemPrice);
  };

  const handleSave = async () => {
    try {
      // Send a PUT request to update the item on the backend
      await axios.put(`http://localhost:5000/api/inventory/${selectedItemId}`, {
        name: editedItemName,
        quantity: editedItemQuantity,
        price: editedItemPrice,
      });

      // Fetch the updated inventory data after successful save
      const response = await axios.get('http://localhost:5000/api/inventory');
      setItems(response.data);

      // Clear the editing state
      setSelectedItemId(null);
      setEditedItemName('');
      setEditedItemQuantity('');
      setEditedItemPrice('');
    } catch (error) {
      console.error(`Error updating item with ID ${selectedItemId}:`, error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      // Send a DELETE request to the server endpoint
      await axios.delete(`http://localhost:5000/api/inventory/${itemId}`);

      // Update the state after successful deletion
      setItems(prevItems => prevItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error(`Error deleting item with ID ${itemId}:`, error);
    }
  };

  return (
    <div className="inventory-list-container">
      <ExportImport></ExportImport>
      <h2>Inventory List Page</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{selectedItemId === item._id ? <input type="text" value={editedItemName} onChange={(e) => setEditedItemName(e.target.value)} /> : item.name}</td>
              <td>{selectedItemId === item._id ? <input type="text" value={editedItemQuantity} onChange={(e) => setEditedItemQuantity(e.target.value)} /> : item.quantity}</td>
              <td>{selectedItemId === item._id ? <input type="text" value={editedItemPrice} onChange={(e) => setEditedItemPrice(e.target.value)} /> : item.price}</td>
              <td>
                {selectedItemId === item._id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button className="cancel-button" onClick={() => setSelectedItemId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="edit-button" onClick={() => handleEdit(item._id, item.name, item.quantity, item.price)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
