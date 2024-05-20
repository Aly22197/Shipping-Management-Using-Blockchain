// src/SupplierPage.js
import React from 'react';
import SensorDataSender from './components/SensorDataSender';

const SupplierPage = ({ account, contract }) => {
  return (
    <div>
      <h1>Supplier Page</h1>
      <p>Account: {account}</p>
      {/* Other supplier functionalities */}
      <SensorDataSender account={account} />
    </div>
  );
};

export default SupplierPage;
