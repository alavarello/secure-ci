import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';

interface EnvOptions {
  ETHEREUM_SEPOLIA_PROVIDER_URL?: string;
  ETHEREUM_SEPOLIA_PRIVATE_KEY?: string;
  ETHEREUM_GOERLI_PROVIDER_URL?: string;
  ETHEREUM_GOERLI_PRIVATE_KEY?: string;
  ETHERSCAN_API_KEY?: string;
}

const {
  ETHEREUM_SEPOLIA_PROVIDER_URL = '',
  ETHEREUM_SEPOLIA_PRIVATE_KEY = '',
  ETHEREUM_GOERLI_PROVIDER_URL = '',
  ETHEREUM_GOERLI_PRIVATE_KEY = '',
  ETHERSCAN_API_KEY,
}: EnvOptions = process.env as any as EnvOptions;

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000
      },
      metadata: {
        bytecodeHash: 'none'
      }
    }
  },

  typechain: {
    target: 'ethers-v6'
  },

  networks: {
    sepolia: {
      chainId: 11155111,
      url: ETHEREUM_SEPOLIA_PROVIDER_URL,
      accounts: [ETHEREUM_SEPOLIA_PRIVATE_KEY],
    },
    goerli: {
      chainId: 5,
      url: ETHEREUM_GOERLI_PROVIDER_URL,
      accounts: [ETHEREUM_GOERLI_PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
};

export default config;
