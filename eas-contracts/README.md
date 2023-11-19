# Report Schema Resolvers

There are two contracts developed to be used as schema resolvers for flagging
domains and contract of Secure CI.

- `contacts/secure-ci/ReportContactSchemaResolver.sol`
- `contacts/secure-ci/ReportDomainSchemaResolver.sol`

## Quickstart

```
nvm use
pnpm i
HARDHAT_NETWORK=sepolia pnpm hardhat --network sepolia deploy
HARDHAT_NETWORK=sepolia pnpm hardhat etherscan-verify --license MIT --api-url https://api-sepolia.etherscan.io
```

## Deploying

You can deploy the project by:

```sh
pnpm deploy:sepolia
```

And the verify it with:

```sh
pnpm verify:deploy
```
