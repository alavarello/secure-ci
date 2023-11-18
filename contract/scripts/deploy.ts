import { ethers } from "hardhat";

async function main() {
  const registry = await ethers.deployContract("SCIRegistry", [], {});
  await registry.waitForDeployment();

  const alwaysTrueAuthorizer = await ethers.deployContract("AlwaysTrueAuthorizer", [], {});
  const ensAuthorizer = await ethers.deployContract("ENSAuthorizer", ["0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"], {});

  registry.addAuthorizer(0, alwaysTrueAuthorizer.target);
  registry.addAuthorizer(1, ensAuthorizer.target);

  console.log(
    `SCI Registry deployed to ${await registry.getAddress()}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
