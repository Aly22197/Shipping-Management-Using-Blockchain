import React, { useState } from 'react';
import './SupplierPage.css'; // Import CSS file
import Car1Image from './images/car1.jpg';
import Car2Image from './images/car2.jpg';
import Car3Image from './images/car3.jpg';

const SupplierPage2 = ({ account, contract }) => {
    const [cart, setCart] = useState([]);

    const products = [
        { id: 4, name: 'Car1', price: 500, image: Car1Image },
        { id: 5, name: 'Car2', price: 300, image: Car2Image },
        { id: 6, name: 'Car3', price: 600, image: Car3Image },
    ];

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
    };

    const handleCheckout = async () => {
        // Implement checkout logic here, e.g., send cart data to backend or smart contract
        // Example: await contract.methods.checkout(cart).send({ from: account });
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

export default SupplierPage2;
