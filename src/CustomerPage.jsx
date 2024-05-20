// src/CustomerPage.js
import React, { useState, useEffect } from 'react';

const CustomerPage = ({ account, contract }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [shipmentId, setShipmentId] = useState('');
  const [passphrase, setPassphrase] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      const productCount = await contract.methods.nextProductId().call();
      const productsArray = [];
      for (let i = 1; i < productCount; i++) {
        const product = await contract.methods.products(i).call();
        productsArray.push(product);
      }
      setProducts(productsArray);
    };
    loadProducts();
  }, [contract]);

  const handlePlaceOrder = async () => {
    try {
      await contract.methods.placeOrder(selectedProducts).send({ from: account });
      alert('Order placed successfully');
    } catch (error) {
      alert('Error placing order');
    }
  };

  const handleProvidePassphrase = async () => {
    try {
      await contract.methods.ProvidePassphrase(passphrase, shipmentId).send({ from: account });
      alert('Passphrase provided successfully');
    } catch (error) {
      alert('Error providing passphrase');
    }
  };

  return (
    <div>
      <h1>Customer Page</h1>
      <div>
        <h2>Place Order</h2>
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <input
                type="checkbox"
                value={product.id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedProducts([...selectedProducts, product.id]);
                  } else {
                    setSelectedProducts(selectedProducts.filter((id) => id !== product.id));
                  }
                }}
              />
              {product.name} - {product.price} Wei
            </div>
          ))}
        </div>
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
      <div>
        <h2>Provide Passphrase</h2>
        <input
          type="text"
          placeholder="Shipment ID"
          value={shipmentId}
          onChange={(e) => setShipmentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Passphrase"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
        />
        <button onClick={handleProvidePassphrase}>Provide Passphrase</button>
      </div>
    </div>
  );
};

export default CustomerPage;
