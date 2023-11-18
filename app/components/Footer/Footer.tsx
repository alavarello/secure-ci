import styles from "../../styles/Footer.module.css";
import * as React from "react";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {connectSnap, getSnap, sendHello} from "../../services/snap/snap";

function Footer() {

    const [isConnectingPlugin, setIsConnectingPlugin] = useState(false)
    const [isPluginActive, setIsPluginActive] = useState(false)

    const handleConnectPlugin = async () => {
        setIsConnectingPlugin(true);
        try {
            await connectSnap()
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
            <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
                Made with ❤️ by your frens at SCI 
            </a>

            {isPluginActive ? "SCI is active and monitoring." :
                isConnectingPlugin ? <progress/> :
                    <Button onClick={() => {
                        handleConnectPlugin()
                    }}>Activate SCI! Make your transactions secure.
                    </Button>
            }
        </footer>
    );
}
export default Footer;