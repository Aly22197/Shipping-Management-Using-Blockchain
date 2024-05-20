import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage2.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [currentAccount, setCurrentAccount] = useState('');
    const navigate = useNavigate();

    // Function to connect to MetaMask
    const connectToMetaMask = async () => {
        if (window.ethereum) {
            try {
                // Requesting account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                setError('');
                setCurrentAccount(window.ethereum.selectedAddress);
            } catch (error) {
                setError('Error connecting to MetaMask');
            }
        } else {
            setError('MetaMask not found. Please install MetaMask to continue.');
        }
    };

    useEffect(() => {
        // Check if MetaMask is installed
        if (window.ethereum) {
            // Check if already connected to MetaMask
            if (window.ethereum.selectedAddress) {
                setCurrentAccount(window.ethereum.selectedAddress);
                navigate('/LoginPage');
            }

            // Subscribe to MetaMask account change event
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    setError('Please connect MetaMask to continue.');
                    setCurrentAccount('');
                } else {
                    setError('');
                    setCurrentAccount(accounts[0]);
                    navigate('/Home');
                }
            });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            // Assume login is successful for demo purposes
            navigate('/Home');
        } else {
            setError('Please enter username and password');
        }
    };

    return (
        <div className="container">
            <div className="login-form">
                <h2>Welcome to the IoT Container Shipping DApp</h2>
                <p>Please connect your MetaMask wallet or login with your username and password.</p>
                {currentAccount ? (
                    <p>Connected MetaMask Account: {currentAccount}</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                )}
                {error && <p id="error-msg">{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
