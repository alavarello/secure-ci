import { NextPage } from "next";
import React, { useContext } from "react";
import styles from './FakePhishingDemo.module.css';
const ScamButton: React.FC = () => {

    const handleClick = () => {
        // Implement this function in your context
    }

    return (
        <button className={styles.button} onClick={handleClick}>
            Click me to get 2 ETH
        </button>
    );
}
const Scam: NextPage = () => {
    return (
        <div className={styles.container}>
            <ScamButton />
        </div>
    );
}
export default Scam;