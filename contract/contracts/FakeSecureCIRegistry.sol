// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import { Authorizer } from "./interfaces/Authorizer.sol";

import { ISecureCIRegistry } from "./interfaces/ISecureCIRegistry.sol";

contract FakeSecureCIRegistry is ISecureCIRegistry {
  function hasContract(uint256 chainId, address contractAddress) external view returns (bool) {
    return true;
  }

  function isDomainWhitelisted(string memory domainName) external returns (bool) {
    return true;
  }

  function addAuthorizer(uint256 authorizerId, Authorizer authorizer) external {}

  function addAddresses(
    uint256 authorizer,
    string calldata domain,
    uint256 chainId,
    address[] calldata addresses
  ) external {}
}
