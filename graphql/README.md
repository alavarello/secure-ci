# TheGraph Subgraph

This part of the repository contains The Graph subgraph that has been deployed
to Goerli and can be found at

https://api.thegraph.com/subgraphs/name/alavarello/sci-goerli

## Install

Use `yarn` to `graph-cli` and dependencies. Use `nvm use` if needed.

## Compile

Run `yarn build` to create subgraph file and manifest. It can be then found at
`build/SCIRegistry/abis/SCIRegistry.json` and `build/subgraph.yaml`.

## Local Development

The commands ending in `-local` are used for development.

## Deploy

Send the subgraph to TheGraph Studio with:

```sh
$ yarn deploy
```
