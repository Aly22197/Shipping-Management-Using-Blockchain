const contractAddress = "0xE103D67EdB2D187361C48Ea3bF60C2512b39C231";
const contractAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "customerAddress",
        "type": "address"
      }
    ],
    "name": "AuthenticationFailureAborted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "supplierAddress",
        "type": "address"
      }
    ],
    "name": "ContainerReadyforSelfCheck",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "customerAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "customerid",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "CName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "Cemail",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "Cpassword",
        "type": "string"
      }
    ],
    "name": "CustomerAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "customerAddress",
        "type": "address"
      }
    ],
    "name": "DepositMoneyDone",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "orderid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "customerAddress",
        "type": "address"
      }
    ],
    "name": "OrderPaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "orderid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "customerAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalAmount",
        "type": "uint256"
      }
    ],
    "name": "OrderPlaced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "r",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "v",
        "type": "int256"
      }
    ],
    "name": "OutofRoute",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "supplierAddress",
        "type": "address"
      }
    ],
    "name": "PaymentReceivedbySender",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "productid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "ProductAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "customerAddress",
        "type": "address"
      }
    ],
    "name": "ReceiverAuthenticatedSuccessfully",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "customerAddress",
        "type": "address"
      }
    ],
    "name": "ReceiverAuthenticationFailure",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      }
    ],
    "name": "SelfCheckDone",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "container",
        "type": "address"
      }
    ],
    "name": "ShipmentArrivedToDestination",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "shipmentid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "productid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "orderid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "supplierAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "customerAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "contentDescription",
        "type": "string"
      }
    ],
    "name": "ShipmentCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "customerAddress",
        "type": "address"
      }
    ],
    "name": "ShipmentReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "container",
        "type": "address"
      }
    ],
    "name": "ShipmentViolatedandRefund",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "supplierAddress",
        "type": "address"
      }
    ],
    "name": "StartedShipment",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "o",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "v",
        "type": "int256"
      }
    ],
    "name": "SuddenContainerOpening",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "j",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "v",
        "type": "int256"
      }
    ],
    "name": "SuddenJerk",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "supplierAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "supplierid",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "SName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "Semail",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "Spassword",
        "type": "string"
      }
    ],
    "name": "SupplierAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "t",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "v",
        "type": "int256"
      }
    ],
    "name": "TemperatureViolation",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "customerCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "customerIds",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "customerOrders",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "customers",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "customerAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "customerid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "CName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "Cemail",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "Cpassword",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "daysAfter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "jerk",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "manager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "nextOrderId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "nextProductId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "nextShipmentId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "onTrack",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "open",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "orders",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "orderid",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "customerAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "totalAmount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isPaid",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "passphrase",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "products",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "productid",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "productName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "receivedCode",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "selfcheck_result",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "shipments",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "shipmentid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "productid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "orderid",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "supplierAddress",
        "type": "address"
      },
      {
        "internalType": "address payable",
        "name": "customerAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "contentDescription",
        "type": "string"
      },
      {
        "internalType": "enum IoTContainerShipping.containerState",
        "name": "state",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "startTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "supplierCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "supplierIds",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "suppliers",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "supplierAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "supplierid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "SName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "Semail",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "Spassword",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "temperature",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "violation",
    "outputs": [
      {
        "internalType": "enum IoTContainerShipping.violationType",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_supplierAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_supplierid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_SName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_Semail",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_Spassword",
        "type": "string"
      }
    ],
    "name": "addSupplier",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_customerAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_customerid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_CName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_Cemail",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_Cpassword",
        "type": "string"
      }
    ],
    "name": "addCustomer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_productIds",
        "type": "uint256[]"
      }
    ],
    "name": "placeOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_orderid",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "hash",
        "type": "bytes32"
      }
    ],
    "name": "payForOrder",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_orderid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_productid",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_contentDescription",
        "type": "string"
      }
    ],
    "name": "createShipment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_shipmentid",
        "type": "uint256"
      }
    ],
    "name": "CreateContainer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_shipmentId",
        "type": "uint256"
      },
      {
        "internalType": "int256",
        "name": "result",
        "type": "int256"
      }
    ],
    "name": "PerformedSelfCheck",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_shipmentId",
        "type": "uint256"
      }
    ],
    "name": "StartShipment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_shipmentId",
        "type": "uint256"
      }
    ],
    "name": "ShipmentArrived",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "code",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_shipmentId",
        "type": "uint256"
      }
    ],
    "name": "ProvidePassphrase",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_shipmentId",
        "type": "uint256"
      }
    ],
    "name": "ProvideValidCode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_shipmentId",
        "type": "uint256"
      }
    ],
    "name": "MarkShipmentReceived",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "t",
        "type": "int256"
      }
    ],
    "name": "UpdateTemperature",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "j",
        "type": "int256"
      }
    ],
    "name": "SuddenJerkDetected",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "o",
        "type": "int256"
      }
    ],
    "name": "ContainerOpened",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "r",
        "type": "int256"
      }
    ],
    "name": "UpdateRouteStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_shipmentId",
        "type": "uint256"
      }
    ],
    "name": "ShipmentViolated",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
export { contractAbi,contractAddress }