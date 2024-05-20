import React, { useState } from 'react';
import './SupplierPage.css'; // Import CSS file
import foodImage from './images/b6.jpeg';
import supplementsImage from './images/b4.jpeg';
import makeupImage from './images/b8.jpeg';
import { contractAbi, contractAddress } from './constant';

const SupplierPage1 = ({ account, contract }) => {
    const [cart, setCart] = useState([]);

    const products = [
        { id: 1, name: 'Food', price: 200, image: foodImage },
        { id: 2, name: 'Supplements', price: 700, image: supplementsImage },
        { id: 3, name: 'Makeup', price: 900, image: makeupImage },
    ];

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
    };

    const handleCheckout = async () => {
        // Implement checkout logic here, e.g., send cart data to backend or smart contract
        //await contract.methods.placeOrder(cart).send({ from: account });
        // After successful checkout, clear the cart
        setCart([]);
        alert('Checkout successful!');
    };

    return (
        <div>
            <h1>Supplier Page</h1>
            <div className="supplier-container">
                <div className="product-list">
                    <h2>Products</h2>
                    <div className="products">
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.image} alt={product.name} />
                                <p className="product-title">{product.name}</p>
                                <p className="product-price">{product.price}</p>
                                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="cart">
                    <h2>Cart</h2>
                    {cart.length > 0 ? (
                        <div className="cart-items">
                            {cart.map((product, index) => (
                                <div key={index} className="cart-item">
                                    <p>{product.name} - {product.price}</p>
                                </div>
                            ))}
                            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                        </div>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SupplierPage1;
