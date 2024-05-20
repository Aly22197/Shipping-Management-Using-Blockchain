import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome to the Home Page</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <div style={{ marginRight: '20px' }}>
          <Link to="/SupplierPage1">
            <button style={{ padding: '10px 20px', fontSize: '16px' }}>Supplier 1</button>
          </Link>
        </div>
        <div>
          <Link to="/SupplierPage2">
            <button style={{ padding: '10px 20px', fontSize: '16px' }}>Supplier 2</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
