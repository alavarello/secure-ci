// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./interfaces/Authorizer.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";


contract SCIRegistry is Ownable {

    mapping(uint256 => mapping(address => bool)) public hasContractBeenWhitelisted;
    mapping(string => bool) public hasDomainBeenWhitelisted;
    mapping(string => bool) public hasBeenWhitelisted;
    mapping(string => mapping(uint256 => mapping(address => bool))) public whitelist;
    mapping(uint256 => Authorizer) public authorizers;

    /**
       * @dev The caller account is not authorized to perform an operation.
     */
    error MessageSenderIsNotDomainOwner(address messageSender, string domain);

    event AddressesAddedToDomain(uint256 indexed authorizer, address indexed domainOwner, string domain, uint256 indexed chainId, address[] contractAddresses);

    constructor() Ownable(msg.sender) {}

    function addAddresses(
        uint256 authorizer,
        string calldata domain,
        uint256 chainId,
        address[] calldata addresses
    ) external {
        if(!authorizers[authorizer].isAuthorize(msg.sender, domain, chainId, addresses)) {
            revert MessageSenderIsNotDomainOwner(msg.sender, domain);
        }

        hasBeenWhitelisted[domain] = true;

        for(uint i = 0; i < addresses.length; i++) {
            whitelist[domain][chainId][addresses[i]] = true;
            hasContractBeenWhitelisted[chainId][addresses[i]] = true;
        }

        emit AddressesAddedToDomain(authorizer, msg.sender, domain, chainId, addresses);

    }

    // You can use this function to remove authorizers by passing the ZERO address
    function addAuthorizer(uint256 authorizerId, Authorizer authorizer) public onlyOwner {
        authorizers[authorizerId] = authorizer;
    }

    function isDomainWhitelisted(string calldata domainName) external returns (bool) {
        return hasDomainBeenWhitelisted[domainName];
    }

    function hasContract(uint256 chainId, address contractAddress) external returns (bool) {
        return hasContractBeenWhitelisted[chainId][contractAddress];
    }
}
