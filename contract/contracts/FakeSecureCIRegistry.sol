// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import { ISecureCIRegistry } from "./interfaces/ISecureCIRegistry.sol";

contract FakeSecureCIRegistry is ISecureCIRegistry {
  function hasContract(uint256 chainId, address contractAddress) external view returns (bool) {
    return true;
  }
}
