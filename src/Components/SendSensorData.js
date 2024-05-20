// src/components/SensorDataSender.js
import React from 'react';
import Web3 from 'web3';
import { contractAbi, contractAddress } from '../Constant/constant';

const SensorDataSender = ({ account }) => {
  const sendSensorData = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      const data = contract.methods.UpdateTemperature(25).encodeABI(); // Simulate a temperature reading of 25 degrees

      const tx = {
        from: account,
        to: contractAddress,
        gas: 2000000,
        data: data,
      };

      try {
        const signedTx = await web3.eth.accounts.signTransaction(tx, account.privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction receipt:', receipt);
      } catch (error) {
        console.error('Error sending transaction:', error);
      }
    } else {
      console.error('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
  };

  return (
    <div>
      <h1>IoT Sensor Data Sender</h1>
      <button onClick={sendSensorData}>Send Temperature Data</button>
    </div>
  );
};

export default SensorDataSender;
