import { ethers } from "hardhat";

async function main() {
  const registry = await ethers.deployContract("SCIRegistry", [], {});
  await registry.waitForDeployment();

  const alwaysTrueAuthorizer = await ethers.deployContract("AlwaysTrueAuthorizer", [], {});

  registry.addAuthorizer(1, alwaysTrueAuthorizer.target);

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
