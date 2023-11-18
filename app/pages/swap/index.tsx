
import { CowSwapWidget, CowSwapWidgetParams, TradeType } from '@cowprotocol/widget-react'
import { NextPage } from "next";
import styles from './Swap.module.css';
import {useCowswapProvider} from "../../hooks/useCowswapProvider";

//  Fill this form https://cowprotocol.typeform.com/to/rONXaxHV once you pick your "appCode"

const cowParams: CowSwapWidgetParams = {
    "appCode": "secureCI COWSwap Integration",
    "width": "420px",
    "height": "529px",
    "chainId": 5, // 1 (Mainnet), 5 (Goerli), 100 (Gnosis)
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
    const provider = useCowswapProvider();
    console.log(`hay provider ${provider !== undefined}`)
    console.log(provider)
    return (
        <div className={styles.main}>
            <CowSwapWidget params={{...cowParams, provider}} provider={provider} />
        </div>
    )
}
export default Swap;