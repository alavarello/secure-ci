import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { BaseContract, ContractTransactionResponse, Contract } from "ethers";
import {ethers} from "hardhat";
import {ENSRegistry, PublicResolver, EnsAuthorizer} from "../typechain-types";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
function sha3(name: string) {
  return ethers.keccak256(ethers.toUtf8Bytes(name))
}

describe("EnsAuthorizer", function () {
  let ensRegistry: ENSRegistry, resolver: PublicResolver, ensAuthorizer: EnsAuthorizer, ensDomain: string;

  before(async () => {
    const [owner] = await ethers.getSigners();
    ensDomain = ethers.namehash('xyz')
    // ENS Contracts Deployment
    const registryFactory = await ethers.getContractFactory("ENSRegistry");
    const publicResolverFactory = await ethers.getContractFactory("PublicResolver");
    ensRegistry = (await registryFactory.deploy()) as ENSRegistry;

    const ensRegistryAddr = await ensRegistry.getAddress();
    resolver = await publicResolverFactory.deploy(ensRegistryAddr, ZERO_ADDRESS,ZERO_ADDRESS,ZERO_ADDRESS);
    await ensRegistry.setSubnodeOwner(ethers.namehash(''), sha3('eth'), owner.address);

    // Ens Authorization Contract Deployment
    const EnsAuthorizer = await ethers.getContractFactory("EnsAuthorizer");
    ensAuthorizer = await EnsAuthorizer.deploy(ensRegistryAddr);

  })

  describe("isAuthorize", function () {
    it("Should validate when address is owner of the domain", async function () {
      const addr = (await ethers.getSigners())[1];
      const domain = 'testdomain';
      await ensRegistry.setSubnodeOwner(ethers.namehash(ensDomain), sha3(domain), addr.address);
      expect(await ensAuthorizer.isAuthorize(addr.address, `${domain}.${ensDomain}`, 1, [])).to.equal(true);
    });
  });
});
