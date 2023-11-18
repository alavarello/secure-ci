//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// Must be synced with /eas-contracts/contracts/secure-ci/Authorizer.sol
interface Authorizer {
    // TODO: Add docs
    function isAuthorize(address sender, string memory domain, uint256 chainId, address[] calldata addresses) external returns (bool);
}