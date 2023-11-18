import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { handleAddressesAddedToDomain } from "../src/sci-registry"
import { createAddressesAddedToDomainEvent } from "./sci-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let authorizer = BigInt.fromI32(234)
    let domainOwner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let domain = "Example string value"
    let chainId = BigInt.fromI32(234)
    let contractAddresses = [
      Address.fromString("0x0000000000000000000000000000000000000001")
    ]
    let newAddressesAddedToDomainEvent = createAddressesAddedToDomainEvent(
      authorizer,
      domainOwner,
      domain,
      chainId,
      contractAddresses
    )
    handleAddressesAddedToDomain(newAddressesAddedToDomainEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddressesAddedToDomain created and stored", () => {
    assert.entityCount("AddressesAddedToDomain", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddressesAddedToDomain",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "authorizer",
      "234"
    )
    assert.fieldEquals(
      "AddressesAddedToDomain",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "domainOwner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddressesAddedToDomain",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "domain",
      "Example string value"
    )
    assert.fieldEquals(
      "AddressesAddedToDomain",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "chainId",
      "234"
    )
    assert.fieldEquals(
      "AddressesAddedToDomain",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "contractAddresses",
      "[0x0000000000000000000000000000000000000001]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
