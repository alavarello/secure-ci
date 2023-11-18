import { ethers } from "hardhat";

async function main() {
    const DummyReceive = await ethers.deployContract("DummyReceive", [], {});
    await DummyReceive.waitForDeployment();
    const address = await DummyReceive.getAddress();
    console.log(`DummyReceive deployed to ${address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});