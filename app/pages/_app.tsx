import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import CssBaseline from '@mui/material/CssBaseline';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    arbitrum,
    goerli,
    mainnet,
    optimism,
    polygon,
    base,
    zora, hardhat,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { EASProvider } from '../stores/eas';
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react';
import ModalContextProvider from '../components/Modal/Modal.provider';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    hardhat,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
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
            <CssBaseline />
            <ModalContextProvider>
              <Header/>
              <Component {...pageProps} />
              <Footer />
            </ModalContextProvider>
          </EASProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
