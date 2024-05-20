import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcomepage.css';

const WelcomePage = ({ isAdmin }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (isAdmin) {
      navigate('/AdminPage');
    } else {
      navigate('/LoginPage');
    }
  };

  return (
    <div>
      <div className="background"></div>
      <div className="overlay"></div>
      <div className="container">
        <h2>Welcome to Trackify</h2>
        <h4>
          A secure, efficient system for global shipment tracking and management built on smart
          containers and Ethereum smart contracts. By integrating Internet of Things (IoT) sensors,
          stakeholders gain real-time insights into shipment conditions. Additionally, smart
          contracts automate processes, streamline costs, and ensure compliance throughout the
          supply chain. This innovative approach fosters a future of efficient, secure, and ethical
          logistics.
        </h4>
        <p>Please connect your MetaMask wallet to continue.</p>
        <button onClick={handleRedirect}>Login</button>
      </div>
    </div>
  );
};

export default WelcomePage;
