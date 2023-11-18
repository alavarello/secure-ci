
import { CowSwapWidget, CowSwapWidgetParams, TradeType } from '@cowprotocol/widget-react'
import { NextPage } from "next";
import styles from './Swap.module.css';
import {useCowswapProvider} from "../../hooks/useCowswapProvider";
import {useEffect, useState} from "react";
import {useChainId} from "../../hooks/useChainId";
import {useQuery} from "react-query";
import {getDomainsByContractAddress, getDomainWhitelistedAddresses} from "../../queries/domains";

const cowParams: CowSwapWidgetParams = {
    "appCode": "secureCI COWSwap Integration",
    "width": "420px",
    "height": "529px",
    "tradeType": TradeType.SWAP,
    "sell": {
        "asset": "",
        "amount": "100"
    },
    "buy": {
        "asset": "USDC",
        "amount": "0"
    },
    "theme": "light", // light/dark or provide your own color palette
}

const Swap: NextPage = () => {
    const [domain, setDomain] = useState('');
    const [contractAddress, setContractAddress] = useState<string>("");
    const provider = useCowswapProvider({setContractAddress});
    const { chainId: originalChainId } = useChainId();
    const supportedNetworks = [1, 5, 100] // 1 (Mainnet), 5 (Goerli), 100 (Gnosis)
    const isSupportedNetwork = supportedNetworks.includes(originalChainId);

    useEffect(() => {
        setDomain(window.location.hostname);
    }, []);

    const { data: whiteListedDomains, isLoading } = useQuery(
        ['getDomainsByContract', contractAddress],
        () => getDomainsByContractAddress(contractAddress)
    )

    const isVerified = !isLoading &&
        contractAddress &&
        whiteListedDomains &&
        whiteListedDomains.chainId === `${originalChainId}` &&
        whiteListedDomains.domains.some((d) => d.id === domain);

    return (
        <div className={styles.main}>
            {!isSupportedNetwork && <h2 className={styles.unsupported}>Unsupported network <br /> (Please use Gnosis, Goerli or Mainnet)</h2>}
            {isSupportedNetwork &&
                <div className={styles.cowPlugin}>
                    {contractAddress && isLoading && <h3>Fetching secureCI subgraph for {contractAddress}</h3>}
                    {contractAddress && !isLoading && <h3 className={!isVerified ? styles.notVerified : styles.verified}> {contractAddress} is {!isVerified && <b>NOT</b>} verified for {domain}</h3>}
                    <CowSwapWidget params={{...cowParams, chainId: originalChainId, provider}} provider={provider} />
                    <p className={styles.verification}>Pool Smart Contracts verification by <strong>secureCI</strong></p>
                </div>
            }
        </div>
    )
}

export default Swap;