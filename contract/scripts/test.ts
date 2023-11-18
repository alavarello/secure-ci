import { ethers, network } from "hardhat";

async function main() {
  const sciRegistry = await ethers.getContractAt("SCIRegistry", "0x33fB6e0ccdB2d3789351087dD077Ad1Ed7bAdAAf");
  // console.log(await sciRegistry.whitelist('secureci.xyz', 1, '0x3e87a896d87E814bDd6D255b0B3d2DBBB1BE952b'));
  const ensAuthorizer = await ethers.deployContract("ENSAuthorizer", ["0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"], {})
  // sciRegistry.addAuthorizer(0, "0x40be3c96D6bC227a63b56af6BeFb4a6084dff364");
  sciRegistry.addAuthorizer(1, ensAuthorizer.target);
  // await network.provider.send("evm_setAutomine", [false]);
  // await network.provider.send("evm_setIntervalMining", [5000]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
