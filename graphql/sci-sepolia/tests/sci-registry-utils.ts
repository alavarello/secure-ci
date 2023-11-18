import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AddressesAddedToDomain,
  OwnershipTransferred
} from "../generated/SCIRegistry/SCIRegistry"

export function createAddressesAddedToDomainEvent(
  authorizer: BigInt,
  domainOwner: Address,
  domain: string,
  chainId: BigInt,
  contractAddresses: Array<Address>
): AddressesAddedToDomain {
  let addressesAddedToDomainEvent = changetype<AddressesAddedToDomain>(
    newMockEvent()
  )

  addressesAddedToDomainEvent.parameters = new Array()

  addressesAddedToDomainEvent.parameters.push(
    new ethereum.EventParam(
      "authorizer",
      ethereum.Value.fromUnsignedBigInt(authorizer)
    )
  )
  addressesAddedToDomainEvent.parameters.push(
    new ethereum.EventParam(
      "domainOwner",
      ethereum.Value.fromAddress(domainOwner)
    )
  )
  addressesAddedToDomainEvent.parameters.push(
    new ethereum.EventParam("domain", ethereum.Value.fromString(domain))
  )
  addressesAddedToDomainEvent.parameters.push(
    new ethereum.EventParam(
      "chainId",
      ethereum.Value.fromUnsignedBigInt(chainId)
    )
  )
  addressesAddedToDomainEvent.parameters.push(
    new ethereum.EventParam(
      "contractAddresses",
      ethereum.Value.fromAddressArray(contractAddresses)
    )
  )

  return addressesAddedToDomainEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
