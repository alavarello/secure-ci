import { ethers } from "hardhat";

async function main() {
  const registry = await ethers.deployContract("Registry", [], {});

  await registry.waitForDeployment();

  console.log(
    `Registry deployed to ${await registry.getAddress()}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
