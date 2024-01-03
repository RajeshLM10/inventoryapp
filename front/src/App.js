// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inventory from './components/Inventory';
import InventoryList from './components/InventoryList';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Alert from './components/Alert'; // Import the Alert component

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for authentication status on page load
  useEffect(() => {
    const storedAuthToken = localStorage.getItem('authToken');
    setAuthenticated(Boolean(storedAuthToken));
    setLoading(false); // Set loading to false once authentication status is checked
  }, []);

  // Function to set authentication status and update localStorage
  const handleAuthentication = (status) => {
    setAuthenticated(status);

    // Clear the authentication token on logout
    if (!status) {
      localStorage.removeItem('authToken');
    }
  };

  if (loading) {
    // You may want to show a loading spinner or another indicator here
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Use a conditional route for authentication */}
          <Route
            path="*"
            element={
              authenticated ? (
                <>
                  <Navbar />
                  <Alert /> {/* Include the Alert component here */}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/inventorylist" element={<InventoryList />} />
                    <Route path="/products" element={<ProductList products={[]} />} />
                    <Route path="/products/:id" element={<ProductDetails product={{ name: 'Sample Product', quantity: 10, _id: '1' }} />} />
                  </Routes>
                  <Footer />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login setAuthenticated={handleAuthentication} />} />
          <Route path="/registration" element={<Registration setAuthenticated={handleAuthentication} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
