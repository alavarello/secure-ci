import styles from "../../styles/Footer.module.css";
import * as React from "react";
import {Button, LinearProgress} from "@mui/material";
import { useEffect, useState } from "react";
import { connectSnap, getSnap } from "../../services/snap/snap";
import { useConnectedAddress } from "../../hooks/useConnectedAddress";

function Footer() {
    const [isConnectingPlugin, setIsConnectingPlugin] = useState(false)
    const [isPluginActive, setIsPluginActive] = useState(false)
    const { address } = useConnectedAddress()

    useEffect(() => {
        if(address && !isPluginActive) {
            handleConnectPlugin()
        }
    }, [address])

    const handleConnectPlugin = async () => {
        setIsConnectingPlugin(true);
        try {
            const snap = await getSnap();
            if(!snap) {
                await connectSnap()
            }
            setIsPluginActive(true)
        } catch (error) {
            console.error(error)
        }
        setIsConnectingPlugin(false)
    }

    useEffect(() => {
        getSnap().then((snap) => {
            if(!!snap) setIsPluginActive(true)
        }).catch((error) => {
            console.error(error)
        })
    }, [getSnap, setIsPluginActive])

    return (
        <footer className={styles.footer}>
            <a href="#" rel="noopener noreferrer" target="_blank">
                Created with ❤️ at Devconnect Istanbul 2023
            </a>

            {isPluginActive ? "SCI is active and monitoring." :
                isConnectingPlugin ? <LinearProgress style={{maxWidth: "100px", margin: "50px"}} /> :
                    <Button onClick={() => {
                        handleConnectPlugin()
                    }}>Activate SCI! Make your transactions secure.
                    </Button>
            }
        </footer>
    );
}
export default Footer;