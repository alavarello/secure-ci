import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { connectSnap, getSnap } from '../services/snap/snap';
import {Button, Box, Container, FormControl, InputAdornment, InputLabel, TextField, Typography} from "@mui/material";
import { AccountCircle } from '@mui/icons-material';

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Secure Contract Interactions</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className={styles.main}>
      <Container>
                <Box>
                <Typography className={styles.h2}>Search for Domains</Typography>
                    <FormControl className={styles.domainInput}>
                    <TextField label="Your Domain" >
                        <InputAdornment position="end">
                            <AccountCircle />
                        </InputAdornment>
                    </TextField>
                    </FormControl>
                </Box>
            </Container>
      </main>
    </div>
  );
};

export default Home;
