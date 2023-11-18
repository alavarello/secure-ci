// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

contract FakeScam {
    // Event to emit when Ether is received
    event Received(address sender, uint amount);

    // Fallback function to receive Ether
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    // Function to check the balance of the contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
