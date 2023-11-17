//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./interfaces/Authorizer.sol";
import '@ensdomains/ens-contracts/contracts/registry/ENS.sol';

contract EnsAuthorizer is Authorizer {
    ENS ensRegistry;
    // State Variables
    mapping(string => address) public verified;

    constructor(address _ensRegistryAddress) {
        ensRegistry = ENS(_ensRegistryAddress);
    }

    function isAuthorize(address sender, string memory domain, uint256 chainId, address[] calldata addresses) external returns (bool) {
        // Check if the domain exists in the verified mapping
        if (verified[domain] != address(0)) {
            // If it exists, check if the sender matches the address in the mapping
            return verified[domain] == sender;
        }

        // If the sender is the owner of the domain, add it to the verified mapping
        if (hasENSDomain(domain, sender)) {
            verified[domain] = sender;
            return true;
        }

        // Not the owner of the domain
        return false;
    }


    function hasENSDomain(string memory _name, address _address) internal view returns (bool) {
        bytes32 node = getDomainHash(_name);
        address owner = ensRegistry.owner(node);
        return (owner == _address);
    }

    function getDomainHash(string memory _name) internal pure returns (bytes32) {
        bytes memory name = bytes(_name);
        bytes32 node = 0x0;
        uint256 i = 0;

        while (i < name.length) {
            uint256 j = i;
            while (j < name.length && name[j] != '.') {
                j++;
            }

            bytes memory part = new bytes(j - i);
            for (uint256 k = i; k < j; ++k) {
                part[k - i] = name[k];
            }

            node = keccak256(abi.encodePacked(node, keccak256(part)));
            i = j + 1;
        }

        return node;
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}