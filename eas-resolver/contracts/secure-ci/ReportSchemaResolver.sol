// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import { SchemaResolver } from "../resolver/SchemaResolver.sol";

import { IEAS, Attestation } from "../IEAS.sol";
import { ISecureCIRegistry } from "./ISecureCIRegistry.sol";

contract ReportSchemaResolver is SchemaResolver {
  ISecureCIRegistry private immutable _SecureCIRegistry;
  IEAS private immutable _EAS;

  event ContractReported(uint256 chainId, address indexed contractAddress);

  constructor(IEAS eas, ISecureCIRegistry secureCIRegistry) SchemaResolver(eas) {
    _EAS = eas;
    _SecureCIRegistry = secureCIRegistry;
  }

  function onAttest(Attestation calldata attestation, uint256 /*value*/) internal virtual override returns (bool) {
    (uint256 chainId, address contractAddress) = abi.decode(attestation.data, (uint256, address));

    if (!_SecureCIRegistry.hasContract(chainId, contractAddress)) {
      return false;
    }

    emit ContractReported(chainId, contractAddress);

    return true;
  }

  function onRevoke(Attestation calldata /*attestation*/, uint256 /*value*/) internal pure override returns (bool) {
    return true;
  }
}
