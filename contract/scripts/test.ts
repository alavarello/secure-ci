import { ethers, network } from "hardhat";

async function main() {
  const sciRegistry = await ethers.getContractAt("SCIRegistry", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  console.log(await sciRegistry.whitelist('secureci.xyz', 1, '0x3e87a896d87E814bDd6D255b0B3d2DBBB1BE952b'));
  await network.provider.send("evm_setAutomine", [false]);
  await network.provider.send("evm_setIntervalMining", [5000]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
