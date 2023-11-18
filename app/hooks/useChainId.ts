import { useNetwork } from "wagmi";

export function useChainId(): { chainId: number } {
  const { chain } = useNetwork();

  if (!chain) {
    return { chainId: 1 };
  }

  return { chainId: chain.id };
}
