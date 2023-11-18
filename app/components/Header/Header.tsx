import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from "../../styles/Header.module.css";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {Box} from "@mui/system";
// @ts-ignore

// TODO: Include search in the domain left bar as ens has

function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className={styles.navbar}>
                <Toolbar>
                    <Typography color="black" variant="h6" component="a" href="/" sx={{ flexGrow: 1 }}>
                    <img src="sci_resized_v2.png" alt="sci_logo" />
                    </Typography>
                    <ConnectButton />
                </Toolbar>
            </AppBar>
        </Box>
);
}
export default Header;