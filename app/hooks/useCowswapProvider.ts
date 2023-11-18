import * as React from 'react'
import { type WalletClient, useWalletClient } from 'wagmi'
import {BrowserProvider} from 'ethers'
import {EthereumProvider} from "@cowprotocol/widget-lib";
import {JsonRpcRequest} from "@cowprotocol/widget-lib/types";

class WalletProviderProxy implements EthereumProvider {
    constructor(private readonly provider: BrowserProvider) {
    }

    request<T>(params: JsonRpcRequest): Promise<T> {
        console.log("request called123")
        console.log(params);
        return this.provider.send(params.method, params.params);
    }

    enable(): Promise<void> {
        console.log("enable called123")
        return Promise.resolve();
    }

    on(event: string, args: unknown): void {
        console.log("on called123")
    }
}

function walletClientToCowswapProvider(walletClient: WalletClient): EthereumProvider {
    const { account, chain, transport } = walletClient
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    const provider = new BrowserProvider(transport, network)

    return new WalletProviderProxy(provider);
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useCowswapProvider({ chainId }: { chainId?: number } = {}) {
    const { data: walletClient } = useWalletClient({ chainId })
    return React.useMemo(
        () => (walletClient ? walletClientToCowswapProvider(walletClient) : undefined),
        [walletClient],
    )
}