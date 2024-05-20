// src/AdminPage.js
import React, { useState } from 'react';

const AdminPage = ({ account, contract }) => {
  const [supplierAddress, setSupplierAddress] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerName, setCustomerName] = useState('');

  const handleAddSupplier = async () => {
    try {
      await contract.methods.addSupplier(supplierAddress, supplierName).send({ from: account });
      alert('Supplier added successfully');
    } catch (error) {
      alert('Error adding supplier');
    }
  };

  const handleAddCustomer = async () => {
    try {
      await contract.methods.addCustomer(customerAddress, customerName).send({ from: account });
      alert('Customer added successfully');
    } catch (error) {
      alert('Error adding customer');
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Add Supplier</h2>
        <input
          type="text"
          placeholder="Supplier Address"
          value={supplierAddress}
          onChange={(e) => setSupplierAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Supplier Name"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
        <button onClick={handleAddSupplier}>Add Supplier</button>
      </div>
      <div>
        <h2>Add Customer</h2>
        <input
          type="text"
          placeholder="Customer Address"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>
    </div>
  );
};

export default AdminPage;
