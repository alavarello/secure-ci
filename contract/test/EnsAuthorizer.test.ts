import { expect } from "chai";
import {ethers} from "hardhat";
import {
  ENSRegistry,
  ENSAuthorizer,
} from "../typechain-types";
const ensNamehash: any = require('@ensdomains/eth-ens-namehash');

const EMPTY_BYTES32 =
    '0x0000000000000000000000000000000000000000000000000000000000000000'
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
function sha3(name: string) {
  return ethers.keccak256(ethers.toUtf8Bytes(name))
}

describe("EnsAuthorizer", function () {
  let ensRegistry: ENSRegistry, ensAuthorizer: ENSAuthorizer, rootDomain: string;

  before(async () => {
    const [owner] = await ethers.getSigners();
    rootDomain = 'xyz';

    // ENS Contracts Deployment
    const registryFactory = await ethers.getContractFactory("ENSRegistry");
    ensRegistry = (await registryFactory.deploy()) as ENSRegistry;
    const ensRegistryAddr = await ensRegistry.getAddress();
    await ensRegistry.setSubnodeOwner(EMPTY_BYTES32, ensNamehash.hash(rootDomain), owner.address);

    // Ens Authorization Contract Deployment
    const EnsAuthorizer = await ethers.getContractFactory("ENSAuthorizer");
    ensAuthorizer = await EnsAuthorizer.deploy(ensRegistryAddr);
  })

  describe("isAuthorize", function () {
    it("Should validate when address is owner of the domain", async function () {
      const owner = (await ethers.getSigners())[0];
      const domain = 'testdomain';

      console.log(await ensRegistry.owner(EMPTY_BYTES32));
      //tried ethers.namehash, sha3 and all combinations nothing works, ayudame loco
      await ensRegistry.setSubnodeOwner(EMPTY_BYTES32, ensNamehash.hash(rootDomain), owner.address);
      console.log(await ensRegistry.owner(ensNamehash.hash(rootDomain)));
      console.log(owner.address);
      //await ensRegistry.setSubnodeRecord(sha3(rootDomain), ensNamehash.hash(domain), owner.address);
      //expect(await ensAuthorizer.isAuthorize(owner.address, `${domain}.${rootDomain}`, 1, [])).to.equal(true);
    });
  });
});
