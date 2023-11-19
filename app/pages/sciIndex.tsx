import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import {Box, Container, FormControl, TextField, Typography} from "@mui/material";
import '@fontsource/lexend/300.css';
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
import '@fontsource/lexend/700.css';
import { useRouter } from 'next/router'
import useRandomBodyBackground from "../hooks/useRandomBodyBackground";


const SCIHome = () => {

  const router = useRouter()
  const [domainToSearch, setDomainToSearch] = useState("");
  useRandomBodyBackground();
  return (
    <div className={styles.container}>
      <Head>
      <link href="/favicon.png" rel="icon" />
        <title>Secure Contract Interactions</title>
        <meta
          content="Secure CI allows to whitelist your UI with your contract"
          name="description"
        />
      </Head>
      <main className={styles.main}>
      <Container>
                <Box>
                <Typography className={styles.h2}>Search for Domains</Typography>
                <Typography className={styles.h3}>Register your domain, secure your smart contracts, protect your users. </Typography>
                <div className={styles.boxContainer}>
                    <FormControl className={styles.domainInput}>
                    <TextField
                        onKeyDown={(e) => {
                            if(e.key === 'Enter'){
                                router.push(`/domains/${domainToSearch}`)
                            }
                        }}
                        className={styles.textInput} label="Input Domain"
                        onChange={(e) => {
                            setDomainToSearch(e.target.value)
                        }}
                    />
                    </FormControl>
                    </div>
                </Box>
            </Container>
      </main>
    </div>
  );
};

export default SCIHome;
