// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import { SchemaResolver } from "../resolver/SchemaResolver.sol";

import { IEAS, Attestation } from "../IEAS.sol";
import { ISecureCIRegistry } from "./ISecureCIRegistry.sol";

contract ReportDomainSchemaResolver is SchemaResolver {
  ISecureCIRegistry private immutable _SecureCIRegistry;
  IEAS private immutable _EAS;

  event DomainReported();

  constructor(IEAS eas, ISecureCIRegistry secureCIRegistry) SchemaResolver(eas) {
    _EAS = eas;
    _SecureCIRegistry = secureCIRegistry;
  }

  function onAttest(Attestation calldata attestation, uint256 /*value*/) internal virtual override returns (bool) {
    (string memory domainName) = abi.decode(attestation.data, (string));

    if (!_SecureCIRegistry.isDomainWhitelisted(domainName)) {
      return false;
    }

    emit DomainReported();

    return true;
  }

  function onRevoke(Attestation calldata /*attestation*/, uint256 /*value*/) internal pure override returns (bool) {
    return true;
  }
}
