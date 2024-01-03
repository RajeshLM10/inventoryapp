// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Import the updated stylesheet

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="left-content">
          <p>&copy; 2023 Your Company Name</p>
          <p>Contact: contact@company.com</p>
          <p>Phone: +123 456 7890</p>
          <p>About Us: Your company's mission and values.</p>
        </div>
        <div className="right-content">
          <div className="social-media-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/facebook-icon.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/twitter-icon.png" alt="Twitter" />
            </a>
            {/* Add more social media links as needed */}
          </div>
          <div className="additional-links">
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
            {/* Add more links as needed */}
          </div>
          <div className="contact-info">
            <p>Email: info@company.com</p>
            <a href="/contact">Contact Us</a>
          </div>

          <div className="language-selector">
            <select>
              <option value="en">English</option>
              <option value="es">Español</option>
              {/* Add more language options as needed */}
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
