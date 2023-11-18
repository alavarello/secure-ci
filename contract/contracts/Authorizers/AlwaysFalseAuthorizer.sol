//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "../interfaces/Authorizer.sol";

contract AlwaysFalseAuthorizer is Authorizer {
    function isAuthorize(address sender, string memory domain, uint256 chainId, address[] calldata addresses) external returns (bool) {
        return false;
    }
}