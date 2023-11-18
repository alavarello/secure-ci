
import { CowSwapWidget, CowSwapWidgetParams, TradeType } from '@cowprotocol/widget-react'
import { NextPage } from "next";
import styles from './Swap.module.css';
import {useCowswapProvider} from "../../hooks/useCowswapProvider";
import {useState} from "react";
import {useConnectedAddress} from "../../hooks/useConnectedAddress";
import {useChainId} from "../../hooks/useChainId";
import {useRouter} from "next/router";
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
    "interfaceFeeBips": "50" // Fill the form above if you are interested
}

const Swap: NextPage = () => {
    const router = useRouter();
    const [contractAddress, setContractAddress] = useState<string>("");
    const provider = useCowswapProvider({setContractAddress});
    const { address } = useConnectedAddress();
    const { chainId: originalChainId } = useChainId();
    const supportedNetworks = [1, 5, 100] // 1 (Mainnet), 5 (Goerli), 100 (Gnosis)
    const isSupportedNetwork = supportedNetworks.includes(originalChainId);

    return (
        <div className={styles.main}>
            {!isSupportedNetwork && <h2 className={styles.unsupported}>Unsupported network <br /> (Please use Gnosis, Goerli or Mainnet)</h2>}
            {isSupportedNetwork &&
                <>
                    <h2>Pool Smart Contracts verification by <strong>secureCI</strong></h2>
                    <p>Domain: {domain}</p>
                    <CowSwapWidget params={{...cowParams, chainId: originalChainId, provider}} provider={provider} />
                </>
            }
        </div>
    )
}
export default Swap;