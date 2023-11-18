import { ethers } from "hardhat";

async function main() {
  const FakeSecureCIRegistry = await ethers.deployContract("FakeSecureCIRegistry", [], {});

  await FakeSecureCIRegistry.waitForDeployment();

  const address = await FakeSecureCIRegistry.getAddress();

  console.log(
    `FakeSecureCIRegistry deployed to ${address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
