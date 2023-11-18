// SPDX-License-Identifier: MIT

// Must be synced with /eas-contracts/contracts/secure-ci/ISecureCIRegistry.sol

pragma solidity 0.8.19;

interface ISecureCIRegistry {
  function hasContract(uint256 chainId, address contractAddress) external returns (bool);
}
