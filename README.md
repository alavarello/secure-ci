# secure-ci

## Description

This project is structured in several parts that together build up the whole system. 
- A `contract` folder containing all infrastructure and code necessary to deploy and run the smart contract Regitry and authorize. 
- A `eas-contracts` folder with the infrastructure and code to run the EAS. 
- A `graphql` folder with the specifications an infrastructure to run the graph deployed in The Graph.
- `nounsbg` folder gives a script to create a nice background image with randomized nouns.
- `snaps` contains the main code to be run to get the Metamask snap for secure CI up and running and finally 
- `app` folder contains the main applications and front-ends used to gather all the pieces together

### Application

See [app/README.md](app/README.md).

### Contract

See [contract/README.md](contract/README.md).

### EAS-Contracts

See [eas-contracts/README.md](eas-contracts/README.md).

### TheGraph Subgraph

See [graphql/README.md](graphql/README.md).

### Nouns Background

See [nounsbg/README.md](nounsbg/README.md).

### Snaps

See [snaps/README.md](snaps/README.md).

## How to run

Install [MetaMask Flask](https://metamask.io/flask/) in your browser.

On the `snaps` folder run:

- nvm use
- yarn
- yarn start

This will start the snap in localhost:8080

## App

On the `app` folder run:

- nvm use
- yarn
- yarn dev

Access localhost:3000 to view the application.

Allow the snap to be installed in your MetaMask.

## How to use

Enter your domain name.

Whitelist the contract addresses that interact with the interface in your domain.

When sending a transaction, MetaMask will show a verified icon when interating
with such contracts from your domain.
