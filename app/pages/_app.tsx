import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { EASProvider } from '../stores/eas';
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react';
import ModalContextProvider from '../components/Modal/Modal.provider';
import {StyledEngineProvider} from "@mui/material";
import ConnectButtonProvider from "../components/ConnectButton/ConnectButtonProvider";
import {PopupProvider} from "../components/Popup/PopupProvider";
import Popup from "../components/Popup/Popup";



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
      <ConnectButtonProvider>
          <EASProvider>
            <StyledEngineProvider injectFirst>
                <PopupProvider>
                    <CssBaseline />
                    <ModalContextProvider>
                      <Header/>
                      <Component {...pageProps} />
                      <Footer />
                      <Popup />
                    </ModalContextProvider>
                </PopupProvider>
            </StyledEngineProvider>
          </EASProvider>
      </ConnectButtonProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
