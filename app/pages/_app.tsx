import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import CssBaseline from '@mui/material/CssBaseline';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    goerli,
    mainnet,
    hardhat,
    sepolia,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { EASProvider } from '../stores/eas';
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react';
import ModalContextProvider from '../components/Modal/Modal.provider';
import {StyledEngineProvider} from "@mui/material";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
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

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <EASProvider>
            <StyledEngineProvider injectFirst>
                <CssBaseline />
                <ModalContextProvider>
                  <Header/>
                  <Component {...pageProps} />
                  <Footer />
                </ModalContextProvider>
            </StyledEngineProvider>
          </EASProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
