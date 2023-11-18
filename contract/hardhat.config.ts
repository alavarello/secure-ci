import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';

interface EnvOptions {
  // ETHEREUM_PROVIDER_URL?: string;
  // ETHEREUM_ARBITRUM_ONE_PROVIDER_URL?: string;
  // ETHEREUM_OPTIMISM_PROVIDER_URL?: string;
  // ETHEREUM_BASE_PROVIDER_URL?: string;
  // ETHEREUM_LINEA_PROVIDER_URL?: string;
  ETHEREUM_SEPOLIA_PROVIDER_URL?: string;
  // ETHEREUM_OPTIMISM_GOERLI_PROVIDER_URL?: string;
  // ETHEREUM_BASE_GOERLI_PROVIDER_URL?: string;
  // ETHEREUM_ARBITRUM_GOERLI_PROVIDER_URL?: string;
  // ETHEREUM_POLYGON_MUMBAI_PROVIDER_URL?: string;
  // ETHEREUM_LINEA_GOERLI_PROVIDER_URL?: string;
  ETHERSCAN_API_KEY?: string;
}

const {
  // ETHEREUM_PROVIDER_URL = '',
  // ETHEREUM_ARBITRUM_ONE_PROVIDER_URL = '',
  // ETHEREUM_OPTIMISM_PROVIDER_URL = '',
  // ETHEREUM_BASE_PROVIDER_URL = '',
  // ETHEREUM_LINEA_PROVIDER_URL = '',
  ETHEREUM_SEPOLIA_PROVIDER_URL = '',
  // ETHEREUM_OPTIMISM_GOERLI_PROVIDER_URL = '',
  // ETHEREUM_BASE_GOERLI_PROVIDER_URL = '',
  // ETHEREUM_ARBITRUM_GOERLI_PROVIDER_URL = '',
  // ETHEREUM_POLYGON_MUMBAI_PROVIDER_URL = '',
  // ETHEREUM_LINEA_GOERLI_PROVIDER_URL = '',
  ETHERSCAN_API_KEY,
}: EnvOptions = process.env as any as EnvOptions;

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.19',
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
      // saveDeployments: true,
      // live: true,
    },
  },

  // verify: {
  //   etherscan: {
  //     apiKey: ETHERSCAN_API_KEY
  //   }
  // },
};

export default config;
