// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './Pages/About';
import Web3 from 'web3';
import AdminPage from './AdminPage';
import SupplierPage1 from './SupplierPage1';
import CustomerPage from './CustomerPage';
import Welcome from './WelcomePage';
import LoginPage from './LoginPage';
import { contractAbi, contractAddress } from './constant';
import SupplierPage2 from './SupplierPage2';

function App () {
  return(
    <BrowserRouter>
    <div>
    <Routes>
      <Route path="/" element={<Welcome/>}/>
      <Route path="/LoginPage" element={<LoginPage/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/SupplierPage1' element={<SupplierPage1/>}/>
      <Route path='/SupplierPage2' element={<SupplierPage2/>}/>

    </Routes>
    </div>
    
    </BrowserRouter>
  )


};


export default App;
