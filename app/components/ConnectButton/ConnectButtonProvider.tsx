import {configureChains, createConfig, mainnet, WagmiConfig} from "wagmi";
import { publicProvider } from 'wagmi/providers/public';
import {AvatarComponent, getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import '@rainbow-me/rainbowkit/styles.css';
import {hardhat} from "viem/chains";
import {goerli, sepolia} from "wagmi/chains";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import {ReactNode} from "react";

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        sepolia,
        goerli,
        hardhat,
    ],
    [publicProvider(), alchemyProvider({ apiKey: 'SIfRQTz5lQuN8zKVhiS7pX4w2OR8q4Jo' })]
);
const { connectors } = getDefaultWallets({
    appName: 'SecureCI',
    projectId: 'dc226665666de6862c10b8f9c5caf7af',
    chains,
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

const CustomAvatar: AvatarComponent = () => {
    return  (
      <img
        src={'https://noun-api.com/beta/pfp'}
        width={32}
        height={32}
        style={{ borderRadius: 999 }}
      />
    )
  };

function ConnectButtonProvider({children}: {children: ReactNode}) {
    return <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} avatar={CustomAvatar}>
            {children}
        </RainbowKitProvider>
    </WagmiConfig>
}

export default ConnectButtonProvider;