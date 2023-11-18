import {FC} from "react";
import Typography from "@mui/material/Typography";

const EXPLORERS: { [key: number]: string } = {
    5: "https://goerli.etherscan.io/address/{address}",
    1: "https://etherscan.io/address/{address}"
}

const DisplayAddress: FC<{
    address: string,
    chainId: number,
}> = ({address, chainId}) => {
    console.log(chainId);
    return <Typography>
        <a href={EXPLORERS[chainId]?.replace("{address}", address)} target="_blank">
            {address}
        </a>
    </Typography>
}

export default DisplayAddress;
