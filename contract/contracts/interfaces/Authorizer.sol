//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

interface Authorizer {
    // TODO: Add docs
    function isAuthorize(address sender, string memory domain, uint256 chainId, address[] calldata addresses) external returns (bool);
}