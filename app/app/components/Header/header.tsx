'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import Image from "next/image";

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar className="static" >
            <Container className="max-w-xl">
                <Toolbar disableGutters>
                    <img src="/assets/logo.jpeg" className="flex-1"  alt="Logo"/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                    >
                        SCI
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;