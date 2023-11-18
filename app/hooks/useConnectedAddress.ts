import {useAccount} from "wagmi";

export function useConnectedAddress(): {address: `0x${string}` | undefined} {
  const {address} = useAccount();

  return {address};
}