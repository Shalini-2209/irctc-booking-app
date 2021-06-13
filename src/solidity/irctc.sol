// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Irctc {
    address public authority;
    uint public addressIndex = 1;
    
    mapping (uint => User) public users;
    mapping (uint => Train) public trains;
    mapping (uint => Passenger) public passengers;
    
    uint public userCount = 0;
    uint public trainCount = 0;
    uint public passengerCount = 0;
    
    constructor() {
        authority = tx.origin;
        // prepopoulate some trains
        trains[0] = Train(12607, 'Hyderabad Express', 'Chennai', 'Hyderabad', '15:00', 40); trainCount++;
        trains[1] = Train(12580, 'Chennai Express', 'Hyderabad', 'Chennai', '14:00', 50); trainCount++;
        trains[2] = Train(12700, 'Bangalore Express', 'Chennai', 'Banglore', '11:00', 60); trainCount++;
    }
    
    struct User {
        address userId;   
        string name;
        string email;
        string pwd;
    }
    
    struct Train {
        uint trainNo;
        string trainName;
        string src;
        string dest;
        string time;
        uint seats;
    }
    
    struct Passenger {
        string email;
        uint passengerNo;
        uint trainNo;
        string date;
        string name;
        uint age;
        string status;
    }
    
    modifier isAuthority {
        require(msg.sender == authority, 'Only authorities are allowed to perform this function');
        _;
    }
    
    modifier isUser(address _userId, string memory _email) {
        for(uint i = 0; i < userCount; i++) {
            if(users[i].userId == _userId) {
                revert("User already exists");          
            }
        }
        
        for(uint i = 0; i < userCount; i++) {
            if(keccak256(bytes(users[i].email)) == keccak256(bytes(_email))) {
                revert("User already exists");          
            }
        }
        
        _;
    }
    
    modifier isTrainPresent(uint _trainNo) {
        for(uint i = 0; i < trainCount; i++) {
            if(trains[i].trainNo == _trainNo) {
                revert("Train already exists");          
            }
        }
        _;                                                                                                 
    }
    
    function register(address _userId, string memory _name, string memory _email, string memory _pwd) public isAuthority isUser(_userId, _email) {
        users[userCount] = User(_userId, _name, _email, _pwd);
        userCount++;
        addressIndex++;
    }
    
    function login(string memory _email, string memory _pwd) public view returns(bool) {
        if (isMatching(_email, _pwd))
            return true;
        else
            return false;
    }
    
    function book(string memory _email, uint _trainNo, string memory _date, string memory _name, uint _age) public {
        require(availableSeats(_trainNo) > 0, 'Seats Unavailable');
        passengers[passengerCount] = Passenger(_email, passengerCount, _trainNo, _date, _name, _age, 'Booked');
        passengerCount++;
        trains[getTrainkey(_trainNo)].seats--;
    }
    
    function cancel(uint _passengerNo) public {
        passengers[_passengerNo].status = 'Cancelled';
        uint _trainNo = passengers[_passengerNo].trainNo;
        trains[getTrainkey(_trainNo)].seats++;
    }
    
    
    // admin 
    
    function addTrain(uint _trainNo, string memory _name, string memory _src, string memory _dest, string memory _time, uint _seats) public isAuthority isTrainPresent(_trainNo) {
        trains[trainCount] = Train(_trainNo, _name, _src, _dest, _time, _seats);
        trainCount++;
    }
    
    function updateTrain(uint _trainNo, string memory _name, string memory _src, string memory _dest, string memory _time, uint _seats) public isAuthority {
        uint trainKey = getTrainkey(_trainNo);
        trains[trainKey] = Train(_trainNo, _name, _src, _dest, _time, _seats);
    }
    
    function deleteTrain(uint _trainNo) public isAuthority {
        uint trainKey = getTrainkey(_trainNo);
        delete trains[trainKey];
    }
    
    
    // helper functions
    
    function isMatching(string memory _email, string memory _pwd) internal view returns(bool) {
        for(uint i = 0; i < userCount; i++) {
            if(keccak256(bytes(users[i].email)) == keccak256(bytes(_email)) 
                && keccak256(bytes(users[i].pwd)) == keccak256(bytes(_pwd))) {
                return true;          
            }
        }
        return false;
    }
    
    function availableSeats(uint _trainNo) internal view returns(uint seats) {
        uint trainKey = getTrainkey(_trainNo);
        return trains[trainKey].seats;
    }
    
    function getTrainkey(uint _trainNo) internal view returns(uint trainkKey) {
        for(uint i = 0; i < trainCount; i++) {
            if(trains[i].trainNo == _trainNo) {
                    return i;
            }
        }
    }
    
} 
