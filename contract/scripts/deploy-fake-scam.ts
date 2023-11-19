import { ethers } from "hardhat";

async function main() {
    const FakeScam = await ethers.deployContract("FakeScam", [], {});
    await FakeScam.waitForDeployment();
    const address = await FakeScam.getAddress();
    console.log(`FakeScam deployed to ${address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});