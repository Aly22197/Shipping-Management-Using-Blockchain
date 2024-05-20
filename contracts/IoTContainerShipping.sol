// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract IoTContainerShipping {

    address public manager;

    struct Supplier {
        address payable supplierAddress;
        string supplierid;
        string SName;
        string Semail;
        string Spassword;
        bool exists;
    }

    struct Customer {
        address payable customerAddress;
        string customerid;
        string CName;
        string Cemail;
        string Cpassword;
        bool exists;
    }

    struct Product {
        uint productid;
        string productName;
        uint price;
        bool exists;
    }

    struct Order {
        uint orderid;
        address payable customerAddress;
        uint[] productIds;
        uint totalAmount;
        bool isPaid;
        bool exists;
    }

    struct Shipment {
        uint shipmentid;
        uint productid;
        uint orderid;
        address payable supplierAddress;
        address payable customerAddress;
        string contentDescription;
        containerState state;
        bool exists;
    }

    mapping(address => Supplier) public suppliers;
    mapping(uint => address) public supplierIds;
    mapping(address => Customer) public customers;
    mapping(uint => address) public customerIds;
    mapping(uint => Product) public products;
    mapping(uint => Order) public orders;
    mapping(uint => Shipment) public shipments;
    mapping(address => uint[]) public customerOrders;

    uint public customerCount;
    uint public supplierCount;

    uint public nextProductId;
    uint public nextOrderId;
    uint public nextShipmentId;

    address container;
    bytes32 public passphrase;
    string public receivedCode;

    uint public startTime;
    uint public daysAfter;

    enum containerState {
        NotReady, ContainerReadyforSelfCheck, ReadyforShipment,
        MoneyDeposited, StartShipment, WaitingforPassphrase, ReceiverAuthenticated,
        WaitingForCorrectPasscode, ShipmentReceived, AuthenticationFailureAborted, Aborted
    }

    enum violationType {
        None, Temp, Open, Route, Jerk
    }

    violationType public violation;

    int public selfcheck_result;
    int public temperature;
    int public open;
    int public onTrack;
    int public jerk;

    // Constructor
    constructor() {
        manager = msg.sender;
        container = 0x583031D1113aD414F02576BD6afaBfb302140225;
    }

    // Modifiers
    modifier OnlyAdmin() {
        require(msg.sender == manager, "Only admin can call this function");
        _;
    }

    modifier OnlySupplier() {
        require(suppliers[msg.sender].exists, "Only supplier can call this function");
        _;
    }

    modifier OnlyCustomer() {
        require(customers[msg.sender].exists, "Only customer can call this function");
        _;
    }

    modifier OnlyContainer() {
        require(msg.sender == container, "Only container can call this function");
        _;
    }

    // Events
    event SupplierAdded(address indexed supplierAddress, string supplierid, string SName, string Semail, string Spassword);
    event CustomerAdded(address indexed customerAddress, string customerid, string CName, string Cemail, string Cpassword);
    event ProductAdded(uint productid, string name, uint price);
    event OrderPlaced(uint orderid, address customerAddress, uint totalAmount);
    event OrderPaid(uint orderid, address customerAddress);
    event ShipmentCreated(uint shipmentid, uint productid, uint orderid, address supplierAddress, address customerAddress, string contentDescription);
    event ContainerReadyforSelfCheck(address supplierAddress);
    event SelfCheckDone(string msg);
    event DepositMoneyDone(string msg, address customerAddress);
    event StartedShipment(address supplierAddress);
    event ShipmentArrivedToDestination(string msg, address container);
    event ReceiverAuthenticatedSuccessfully(string msg, address customerAddress);
    event ReceiverAuthenticationFailure(string msg, address customerAddress);
    event AuthenticationFailureAborted(string msg, address customerAddress);
    event ShipmentReceived(address customerAddress);
    event ShipmentViolatedandRefund(address container);
    event PaymentReceivedbySender(address supplierAddress);
    event TemperatureViolation(string msg, bool t, int v);
    event SuddenJerk(string msg, bool j, int v);
    event SuddenContainerOpening(string msg, bool o, int v);
    event OutofRoute(string msg, bool r, int v);

    // Functions
    function addSupplier(address payable _supplierAddress, string memory _supplierid, string memory _SName, string memory _Semail, string memory _Spassword) public {
        require(!suppliers[_supplierAddress].exists, "Supplier already exists");
        supplierCount++;
        suppliers[_supplierAddress] = Supplier(_supplierAddress,_supplierid,_SName,_Semail,_Spassword, true);
        emit SupplierAdded(_supplierAddress,_supplierid,_SName,_Semail,_Spassword);
        supplierIds [supplierCount] = _supplierAddress;
    }

    function addCustomer(address payable _customerAddress, string memory _customerid, string memory _CName, string memory _Cemail, string memory _Cpassword) public {
        require(!customers[_customerAddress].exists, "Customer already exists");
        customerCount++;
        customers[_customerAddress] = Customer(_customerAddress, _customerid,_CName,_Cemail,_Cpassword, true);
        emit CustomerAdded(_customerAddress, _customerid,_CName,_Cemail,_Cpassword);
        customerIds [customerCount] = _customerAddress;
    }

    function addProduct(string memory _name, uint _price) public OnlySupplier {
        products[nextProductId] = Product(nextProductId, _name, _price, true);
        emit ProductAdded(nextProductId, _name, _price);
        nextProductId++;
    }

    function placeOrder(uint[] memory _productIds) public OnlyCustomer {
        uint totalAmount = 0;
        for (uint i = 0; i < _productIds.length; i++) {
            require(products[_productIds[i]].exists, "Product does not exist");
            totalAmount += products[_productIds[i]].price;
        }
        orders[nextOrderId] = Order(nextOrderId, payable(msg.sender), _productIds, totalAmount, false, true);
        customerOrders[msg.sender].push(nextOrderId);
        emit OrderPlaced(nextOrderId, msg.sender, totalAmount);
        nextOrderId++;
    }

    function payForOrder(uint _orderid, bytes32 hash) public payable OnlyCustomer {
        Order storage order = orders[_orderid];
        require(order.exists, "Order does not exist");
        require(order.customerAddress == msg.sender, "Only the customer who placed the order can pay for it");
        require(!order.isPaid, "Order is already paid");
        require(msg.value == order.totalAmount, "Incorrect payment amount");
        order.isPaid = true;
        passphrase = hash;
        emit OrderPaid(_orderid, msg.sender);
        emit DepositMoneyDone("Money deposited and passphrase hash provided", msg.sender);
    }

    function createShipment(uint _orderid,uint _productid, string memory _contentDescription) public OnlySupplier {
        require(orders[_orderid].exists, "Order does not exist");
        require(orders[_orderid].isPaid, "Order is not paid");
        shipments[nextShipmentId] = Shipment(nextShipmentId, _productid,_orderid, payable(msg.sender), orders[_orderid].customerAddress, _contentDescription, containerState.NotReady, true);
        emit ShipmentCreated(nextShipmentId, _productid,_orderid, msg.sender, orders[_orderid].customerAddress, _contentDescription);
        nextShipmentId++;
    }

    function CreateContainer(uint _shipmentid) public OnlySupplier {
        Shipment storage shipment = shipments[_shipmentid];
        require(shipment.exists, "Shipment does not exist");
        require(shipment.state == containerState.NotReady, "Shipment is not in NotReady state");
        shipment.state = containerState.ContainerReadyforSelfCheck;
        emit ContainerReadyforSelfCheck(msg.sender);
    }

    function PerformedSelfCheck(uint _shipmentId, int result) public OnlyContainer {
        Shipment storage shipment = shipments[_shipmentId];
        require(shipment.exists, "Shipment does not exist");
        require(shipment.state == containerState.ContainerReadyforSelfCheck, "Shipment is not ready for self-check");
        selfcheck_result = result;
        if(selfcheck_result == 1) { // Indicating the result is OK
            shipment.state = containerState.ReadyforShipment;
            emit SelfCheckDone("Self Check result is Success");
        } else if(selfcheck_result == 0) {
            shipment.state = containerState.Aborted;
            emit SelfCheckDone("Shipment Aborted: Failure, container must be fixed.");
            payable(shipment.customerAddress).transfer(address(this).balance);
        }
    }

    function StartShipment(uint _shipmentId) public OnlyContainer {
        Shipment storage shipment = shipments[_shipmentId];
        require(shipment.exists, "Shipment does not exist");
        require(shipment.state == containerState.ReadyforShipment, "Shipment is not ready for shipment");
        shipment.state = containerState.StartShipment;
        emit StartedShipment(msg.sender);
    }

    function ShipmentArrived(uint _shipmentId) public OnlySupplier {
        Shipment storage shipment = shipments[_shipmentId];
        require(shipment.exists, "Shipment does not exist");
        require(shipment.state == containerState.StartShipment, "Shipment has not started");
        shipment.state = containerState.WaitingforPassphrase;
        startTime = block.timestamp;
        daysAfter = 2; // Initialize daysAfter for passphrase timing
        emit ShipmentArrivedToDestination("Please receiver provide your code", msg.sender);
    }

    function ProvidePassphrase(string memory code, uint _shipmentId) public OnlyCustomer {
        Shipment storage shipment = shipments[_shipmentId];
        require((shipment.state == containerState.WaitingforPassphrase || shipment.state == containerState.WaitingForCorrectPasscode) && violation == violationType.None, "Shipment is not in correct state or violation detected");
        receivedCode = code;
        if(keccak256(abi.encodePacked(receivedCode)) == passphrase){ // Authenticated
            shipment.state = containerState.ReceiverAuthenticated;
            emit ReceiverAuthenticatedSuccessfully("Passphrase matched successfully", msg.sender);
        } else { // Not authenticated
            shipment.state = containerState.WaitingForCorrectPasscode;
            emit ReceiverAuthenticationFailure("You have 48 hours to provide the correct passphrase", msg.sender);
        }
    }

    function ProvideValidCode(uint _shipmentId) public OnlyCustomer {
        Shipment storage shipment = shipments[_shipmentId];
        require(shipment.state == containerState.WaitingForCorrectPasscode, "Shipment is not in the state for passcode provision");
        if(block.timestamp <= (startTime + daysAfter * 1 days)) {
            shipment.state = containerState.AuthenticationFailureAborted;
            payable(shipment.customerAddress).transfer(address(this).balance);
            emit AuthenticationFailureAborted("Authentication failed, shipment aborted", msg.sender);
        } else {
            emit ReceiverAuthenticationFailure("You still have time to provide the correct passphrase", msg.sender);
        }
    }

    function MarkShipmentReceived(uint _shipmentId) public OnlySupplier {
        Shipment storage shipment = shipments[_shipmentId];
        require(shipment.exists, "Shipment does not exist");
        require(shipment.state == containerState.ReceiverAuthenticated, "Receiver not authenticated");
        shipment.state = containerState.ShipmentReceived;
        payable(shipment.supplierAddress).transfer(address(this).balance);
        emit ShipmentReceived(shipment.customerAddress);
        emit PaymentReceivedbySender(shipment.supplierAddress);
    }

    // IoT Sensors Functions
    function UpdateTemperature(int t) public OnlyContainer {
        temperature = t;
        if(temperature > 40 || temperature < 0) {
            violation = violationType.Temp;
            emit TemperatureViolation("Temperature violation detected", true, t);
        } else {
            violation = violationType.None;
            emit TemperatureViolation("Temperature is OK", false, t);
        }
    }

    function SuddenJerkDetected(int j) public OnlyContainer {
        jerk = j;
        if(jerk > 2) {
            violation = violationType.Jerk;
            emit SuddenJerk("Sudden jerk detected", true, j);
        } else {
            violation = violationType.None;
            emit SuddenJerk("No significant jerk detected", false, j);
        }
    }

    function ContainerOpened(int o) public OnlyContainer {
        open = o;
        if(open == 1) {
            violation = violationType.Open;
            emit SuddenContainerOpening("Container opened detected", true, o);
        } else {
            violation = violationType.None;
            emit SuddenContainerOpening("Container not opened", false, o);
        }
    }

    function UpdateRouteStatus(int r) public OnlyContainer {
        onTrack = r;
        if(onTrack == 0) {
            violation = violationType.Route;
            emit OutofRoute("Route deviation detected", true, r);
        } else {
            violation = violationType.None;
            emit OutofRoute("On correct route", false, r);
        }
    }

    function ShipmentViolated(uint _shipmentId) public OnlyContainer {
        Shipment storage shipment = shipments[_shipmentId];
        require(shipment.exists, "Shipment does not exist");
        require(violation != violationType.None, "No violation detected");
        shipment.state = containerState.Aborted;
        payable(shipment.customerAddress).transfer(address(this).balance);
        emit ShipmentViolatedandRefund(container);
    }
}
