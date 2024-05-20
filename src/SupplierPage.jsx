// src/SupplierPage.js
import React, { useState } from 'react';

const SupplierPage = ({ account, contract }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [orderId, setOrderId] = useState('');
  const [contentDescription, setContentDescription] = useState('');

  const handleAddProduct = async () => {
    try {
      await contract.methods.addProduct(productName, productPrice).send({ from: account });
      alert('Product added successfully');
    } catch (error) {
      alert('Error adding product');
    }
  };

  const handleCreateShipment = async () => {
    try {
      await contract.methods.createShipment(orderId, contentDescription).send({ from: account });
      alert('Shipment created successfully');
    } catch (error) {
      alert('Error creating shipment');
    }
  };

  return (
    <div>
      <h1>Supplier Page</h1>
      <div>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>
        <h2>Create Shipment</h2>
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content Description"
          value={contentDescription}
          onChange={(e) => setContentDescription(e.target.value)}
        />
        <button onClick={handleCreateShipment}>Create Shipment</button>
      </div>
    </div>
  );
};

export default SupplierPage;
