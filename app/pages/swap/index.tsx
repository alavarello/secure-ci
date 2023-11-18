
import { CowSwapWidget, CowSwapWidgetParams, TradeType } from '@cowprotocol/widget-react'
import { NextPage } from "next";
import styles from './Swap.module.css';
import {useEthersSigner} from "../../hooks/useEtherSigner";
import {useCowswapProvider} from "../../hooks/useCowswapProvider";

//  Fill this form https://cowprotocol.typeform.com/to/rONXaxHV once you pick your "appCode"

const params: CowSwapWidgetParams = {
    "appCode": "secureCI COWSwap Integration",
    "width": "420px",
    "height": "529px",
    "chainId": 5, // 1 (Mainnet), 5 (Goerli), 100 (Gnosis)
    //"provider": useCowswapProvider({chainId: 5}), // Ethereum EIP-1193 provider. For a quick test, you can pass `window.ethereum`, but consider using something like https://web3modal.com
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
    return (
        <div className={styles.main}>
            <CowSwapWidget params={params} />
        </div>
    )
}
export default Swap;