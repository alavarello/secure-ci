// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./Authorizer.sol";

// Must be synced with /eas-contracts/contracts/secure-ci/ISecureCIRegistry.sol
interface ISecureCIRegistry {
  function hasContract(uint256 chainId, address contractAddress) external returns (bool);

  function isDomainWhitelisted(string calldata domainName) external returns (bool);

  function addAuthorizer(uint256 authorizerId, Authorizer authorizer) external;

  function addAddresses(
    uint256 authorizer,
    string calldata domain,
    uint256 chainId,
    address[] calldata addresses
  ) external;
}
