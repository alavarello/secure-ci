import { NextPage } from "next";
import React, { useContext } from "react";
import styles from './FakePhishingDemo.module.css';
import {useFakeScam} from "../../hooks/useFakeScam";
import {useChainId} from "../../hooks/useChainId";
import {FakeScam} from "../../services/contracts/FakeScam";
const ScamButton: React.FC<{fakeScam: FakeScam}> = ({fakeScam}) => {
    const [loading, setLoading] = React.useState(false)
    const handleClick = async () => {
        setLoading(true)
        if (!fakeScam) {
            setLoading(false)
            return;
        }

        try {
            await fakeScam.stealAndLockEth();
        } catch (e) {
            console.error(e);
        }

        setLoading(false);
    }

    return (
            <button className={styles.button} onClick={handleClick}>
                You give me 1 eth, I give you 2 eth
            </button>
    );
}
const Scam: NextPage = () => {
    const fakeScam = useFakeScam();
    const {chainId} = useChainId();
    const canBeScammed = chainId == 5;
    if(!fakeScam)
        return null;
    
    if(!canBeScammed) {
        return (
            <div className={styles.container}>
                <h2 className={styles.unsupported}>Unsupported network <br /> (Please let me scam you on Goerli)</h2>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ScamButton fakeScam={fakeScam}/>
        </div>
    );
}
export default Scam;