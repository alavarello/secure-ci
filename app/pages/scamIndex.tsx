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
import Scam from "./fake_phishing_demo";


const ScamHome = () => {

  return <Scam />;
};

export default ScamHome;
