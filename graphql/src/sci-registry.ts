import {
  AddressesAddedToDomain as AddressesAddedToDomainEvent,
} from "../generated/SCIRegistry/SCIRegistry"
import {
  Domain,
  Contract,
  WhitelistEvent,
} from "../generated/schema"

export function handleAddressesAddedToDomain(
  event: AddressesAddedToDomainEvent
): void {
  const domain = new Domain(event.params.domain.toHexString());
  domain.domainOwner = event.params.domainOwner;
  domain.save();

  const addresses = event.params.contractAddresses;
  for(let i = 0; i < addresses.length; i++) {
    const id = event.params.chainId.toString().concat(":").concat(addresses[i].toHexString());
    const contract = new Contract(id);
    contract.address = addresses[i];
    contract.chainId = event.params.chainId;
    contract.save();

    const whitelistEvent = new WhitelistEvent(
        event.transaction.hash.toHexString()
            .concat(":")
            .concat(event.logIndex.toString())
            .concat(":")
            .concat(addresses[i].toHexString())
    );
    whitelistEvent.domain = domain.id;
    whitelistEvent.contract = contract.id;
    whitelistEvent.authorizer = event.params.authorizer;
    whitelistEvent.blockNumber = event.block.number;
    whitelistEvent.blockTimestamp = event.block.timestamp;
    whitelistEvent.transactionHash = event.transaction.hash;
    whitelistEvent.save();
  }
}