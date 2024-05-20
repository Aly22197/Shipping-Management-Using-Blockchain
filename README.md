# Shipping-Management-Using-Blockchain

# Introduction

Smart Contracts represents an efficient solution to nowadays problems from centralized old systems to losing track of products in the shipment stage. The idea revolves around developing a blockchain-based solution for efficient shipment tracking and management in global supply chains, focusing on smart containers and Ethereum smart contracts. By utilizing blockchain technology and IoT sensors, stakeholders can monitor shipment conditions in real-time, automate processes through smart contracts, and reduce costs while ensuring compliance and accountability. This approach fosters efficient, secure, and ethical supply chains.

# Running the project requirements

In the project terminal: -

1. mkdir my-react-truffle-app
2. cd my-react-truffle-app
3. npm init
4. Change Entry Point: Update the entry point to truffle-config.js in package.json.
5. npm i
6. npm install truffle --save-dev
7. truffle init
8. truffle compile
9. Add Migration Scripts: Create migration scripts for deploying contracts.
10. install and run ganache, open and add the project file truffle-config.js
11. Migrate Contracts: Migrate your contracts to the blockchain. using truffle migrate
12. Update constant.js: Inside the Constant folder.

const contractConstants = {
    contractAddress: "<Your_Contract_Address>",
    contractABI: "<Your_Contract_ABI>"
};

export default contractConstants;

12. npm start

That's it now you're running the project!
