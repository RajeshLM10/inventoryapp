// components/Alert.js
import React, { useState, useEffect } from 'react';
import './Alert.css';
const Alert = ({ productAlerts }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const setProductAlerts = (productId, thresholdQuantity, expirationAlertDays) => {
      // Ensure that productAlerts is defined and is an array
      if (Array.isArray(productAlerts)) {
        const product = productAlerts.find((item) => item._id === productId);

        if (product) {
          const { name, quantity, expirationDate } = product;

          if (quantity < thresholdQuantity) {
            setAlerts((prevAlerts) => [
              ...prevAlerts,
              `${name}: Low stock. Current quantity: ${quantity}`,
            ]);
          }

          if (expirationDate) {
            const daysUntilExpiration = Math.floor((new Date(expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
            if (daysUntilExpiration <= expirationAlertDays) {
              setAlerts((prevAlerts) => [
                ...prevAlerts,
                `${name}: Expiring soon. Days left: ${daysUntilExpiration}`,
              ]);
            }
          }
        }
      }
    };

    // Example: Set alerts for a product with ID '1'
    setProductAlerts('1', 10, 7);
  }, [productAlerts]);

  return (
    <div>
      <h2>Product Alerts</h2>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
};

export default Alert;
