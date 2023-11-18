'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from './Header.module.css';
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {Box} from "@mui/system";
// @ts-ignore

// TODO: Include search in the domain left bar as ens has

function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className={styles.navbar}>
                <Toolbar>
                    <Typography color="black" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SCI
                    </Typography>
                    <ConnectButton />
                </Toolbar>
            </AppBar>
        </Box>
);
}
export default Header;