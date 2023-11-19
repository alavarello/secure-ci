// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

contract FakeScam {
    // Event to emit when Ether is received
    event Received(address sender, uint amount);
    event Withdrawn(address receiver, uint amount);

    // Fallback function to receive Ether
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    // Function to allow receiving Ether with data
    function receiveFunds() external payable {
        emit Received(msg.sender, msg.value);
    }

    // Function to withdraw Ether from the contract
    function withdraw(uint amount) public {
        require(amount <= address(this).balance, "Insufficient balance in contract");
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    // Function to check the balance of the contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
