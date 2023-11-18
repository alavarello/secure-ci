# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Deploy Fake Registry

```
nvm use v20
yarn hardhat --network sepolia run scripts/deploy-fake-secure-ci-registry.ts
yarn hardhat --network sepolia verify 0x0703DD32Cc9c2D841CC60aee17FeB224D410BE3F
```
