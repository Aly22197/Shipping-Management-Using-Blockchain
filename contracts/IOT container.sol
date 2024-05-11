//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract IoTContainer{
    
    address public manager;

    struct Supplier {
        uint id;
        string firstName;
        string lastName;
        string idNumber;
        uint packageCount;
    }

    mapping(address => bool) public package;

    mapping(uint => Supplier) public suppliers;

    uint public supplierCount;

    // User structure
    struct User {
        string firstName;
        string lastName;
        string idNumber;
        string email;
        address userAddress; // Address of the user
        bool isAdded; // Flag to track if user is added
    }

    mapping(address => User) public users;
    mapping(uint => address) public userIds; // Mapping to track user IDs

    uint public usersCount;

    // Modifier to check if the caller is the manager
    modifier onlyAdmin() {
        require(msg.sender == manager, "Only admin can call this function");
        _;
    }

    // Function to add a supplier
    function addSupplier(
        string memory _firstName,
        string memory _lastName,
        string memory _idNumber
    ) public onlyAdmin {
        supplierCount++;
        suppliers[supplierCount] = Supplier(
            supplierCount,
            _firstName,
            _lastName,
            _idNumber,
            0
        );
    }

    // Function to add a user
    function addUser(
        string memory _firstName,
        string memory _lastName,
        string memory _idNumber,
        string memory _email,
        address _userAddress // Address of the user
    ) public onlyAdmin {
        // Check if the user is already added
        require(!users[_userAddress].isAdded, "User already added");

        usersCount++;
        users[_userAddress] = User(
            _firstName,
            _lastName,
            _idNumber,
            _email,
            _userAddress,
            true // Mark user as added
        );
        userIds[usersCount] = _userAddress;
    }

    // Function to register a package ownership
    function registerPackageOwnership() public {
        // Check if the user is registered
        require(users[msg.sender].isAdded, "User not registered");

        // Mark the package as owned by the user
        package[msg.sender] = true;
    }
  
    //participating entities with Ethereum addresses
    address container;
    address payable public sender_owner;
    address payable public receiver;
    string public content;//description of container content
    bytes32 public passphrase; //recived passphrase when money is deposited
    string public receivedCode; //recived code to be hashe'd
    
    enum packageState {
        NotReady, PackageContainerReadyforSelfCheck, ReadyforShipment, 
        MoneyDeposited, StartShippment,WaitingforPassphrase, ReceiverAuthentiated,
        WaitingForCorrectPasscode, ShipmentReceived, 
        AuthenticationFailureAborted,Aborted
    }
    
    packageState public state; 
    uint startTime;
    uint daysAfter;
    uint shipmentPrice;
    
    //sensors
    enum violationType {
         None, Temp, Open, Route, Jerk
    }   
    
    violationType public violation; 
    int selfcheck_result;//1 or 0 indicating the self check result of IoTContainer
    int tempertaure; //track the tempertaure any integer
    int open; //if the container opens 1 , 0
    int onTrack; //to track the route 1 , 0
    int jerk;//sudden jerk 1, 0

    //contructor
    constructor() {
        manager = msg.sender;
        startTime = block.timestamp;
        daysAfter = 2;//2 days maximum for providing another passcode
        content = "This container is shipping frozen food.";
        shipmentPrice = 10 ether;
        container = 0x583031D1113aD414F02576BD6afaBfb302140225;
        sender_owner = payable(msg.sender); //address of sender
        receiver = payable(0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB);
        state = packageState.NotReady;
        selfcheck_result = 0;
    }

    //modifiers
    modifier  OnlySender(){ //only sender who is the owner
        require(sender_owner == msg.sender); 
        _;
    }
    
    modifier  OnlyReceiver(){ //only receiver
        require(msg.sender == receiver); 
        _;
    }
     modifier  OnlyContainer(){
        require(msg.sender == container); 
        _;
    }
    modifier costs() {
        require(msg.value == shipmentPrice);
        _;
        
    }

    //Tracking Events
    event PackageReadyforSelfCheck(address owner);//sender announces Package is Ready for selfcheck
    event SelfCheckDone(string msg);//to announce result of selfcheck
    event DepositMoneyDone(string msg , address receiver);//money is deposited
    event StarttedShippment(address sender);//shipment StartShippment
    event ShipmentArrivedToDestination(string msg, address container);//shipment arrived to destination
    event ReceiverAuthenticatedSuccessfully(string msg, address receiver);
    event ReceiverAuthenticationFailure(string msg, address receiver);//failure within 48 hours
    event AuthenticationFailureAborted(string msg, address receiver);//event when authentication failure after 48 hrs
    event ShipmentReceived(address receiver);//shipment ShipmentReceived Succesfully
    event ShipmentViolatedandRefund(address container);//shipment violated and refund occured
    event PaymentReceivedbySender(address sender);//payment received by manufacturer
    
    //Violation Events
    event TempertaureViolation(string msg, bool t, int v);//temperature out of accepted range
    event SuddenJerk(string msg, bool j, int v);
    event SuddenContainerOpening(string msg, bool o, int v);
    event OutofRoute(string msg, bool r, int v);
    
    function CreatePackage() public OnlySender {
        require(state == packageState.NotReady);
            state = packageState.PackageContainerReadyforSelfCheck; //once locked the container will do a self check on the sensors
            emit PackageReadyforSelfCheck(msg.sender); //trigger event
    }

    function PerformmedSelfCheck(int result) public OnlyContainer{
       
        require(state == packageState.PackageContainerReadyforSelfCheck);
        selfcheck_result = result;
        if(selfcheck_result == 1){//indicating the result is OK
            state = packageState.ReadyforShipment;
            emit SelfCheckDone("Self Check result is Success");//trigger event with result
        }
        else if(selfcheck_result == 0){
            state = packageState.Aborted;
            emit SelfCheckDone("Shipment Aborted: Failure , container must be fixed."); //trigger event with result
            payable(msg.sender).transfer(address(this).balance);
        }
    }

    //deposit money and send the hash
    function DepositMoneyforShipment(bytes32 hash) payable public OnlyReceiver costs {
         require(state == packageState.ReadyforShipment);//this indicates that self check is OK
            state = packageState.MoneyDeposited;
            passphrase = hash;
            emit DepositMoneyDone("Money deposited and passphrase hash provided" , msg.sender); //trigger event
    }

    function StartShippment() public OnlySender {
        require(state == packageState.MoneyDeposited);
            state = packageState.StartShippment;
            emit StarttedShippment(msg.sender); //trigger event
    }
    
    function ShipmentArrived() public OnlyContainer{//called when the shipment arrives to destination
          require(state == packageState.StartShippment); //only if no violations
            state = packageState.WaitingforPassphrase;
            emit ShipmentArrivedToDestination("Please receiver provide your code", msg.sender );
    }
 
    function ProvidePassphrase(string memory code) public OnlyReceiver{
        require((state == packageState.WaitingforPassphrase || state == packageState.WaitingForCorrectPasscode) && violation == violationType.None);
            receivedCode = code;
            if(keccak256(abi.encodePacked(receivedCode)) == passphrase){ //authenticated
                state = packageState.ReceiverAuthentiated;
                emit ReceiverAuthenticatedSuccessfully("Passphrase matched successfully", msg.sender);
            }
            else { //Not authenticated
                state = packageState.WaitingForCorrectPasscode;
                emit ReceiverAuthenticationFailure("You have 48 hours to provide the correct passphrase", msg.sender);
            }
    }
    
    function ProvidePassPhraseAfterTime(string memory phrase) public OnlyReceiver {
        if (block.timestamp <= startTime + daysAfter * 1 days) {
            ProvidePassphrase(phrase);
        }
        else//it will be more than 2 days
        {
            state = packageState.AuthenticationFailureAborted;
            emit AuthenticationFailureAborted("Failure to provide the correct passcode within 48 hours", msg.sender);
            receiver.transfer(shipmentPrice/2);//only half of the shipment price is refunded
            emit ShipmentViolatedandRefund(msg.sender);
            payable(msg.sender).transfer(address(this).balance);
        }
    }
    
    function UnlockShippment() public OnlyContainer {
         require(state == packageState.ReceiverAuthentiated);
                state = packageState.ShipmentReceived;
                emit ShipmentReceived(msg.sender); //trigger event
    }
    
    function GetShipmentMoney() public OnlySender{
        require(state == packageState.ShipmentReceived);
            sender_owner.transfer(shipmentPrice);//transfer the money to the manufacturer
            emit PaymentReceivedbySender(msg.sender);
            payable(msg.sender).transfer(address(this).balance);
    }
    
    //after violation, a refund 
    function Refund() public OnlyContainer{
        require(state == packageState.Aborted);//violation occured
        if(violation != violationType.None){
            receiver.transfer(shipmentPrice);
            emit ShipmentViolatedandRefund(msg.sender);
            // Transfer any remaining funds back to the contract creator
            payable(msg.sender).transfer(address(this).balance);
        }
    }
    
    function violationOccurred(string memory _msg, violationType v, int value) public OnlyContainer{
        require(state == packageState.StartShippment);
        violation = v;
        state = packageState.Aborted;
        if(violation == violationType.Temp){
            tempertaure = value;
            emit TempertaureViolation(_msg ,true, tempertaure);
        }
        else if(violation == violationType.Jerk){
            jerk  = value;
            emit SuddenJerk(_msg, true, jerk);
        }
        else if(violation == violationType.Open){
            open = value;
            emit SuddenContainerOpening(_msg, true, open);
        }
        else if(violation == violationType.Route){
            onTrack = value;
            emit OutofRoute(_msg , true, onTrack);
        }
        Refund();
    }
}