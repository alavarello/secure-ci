import {useEffect, useState} from "react";
import {useEthersSigner} from "./useEtherSigner";
import {SCIRegistry} from "../services/contracts/SCIRegistry";

export function useSCIRegistry() {
  const signer = useEthersSigner();
  const [sciRegistry, setSCIRegistry] = useState<SCIRegistry>();

  useEffect(() => {
    if(!signer) return;

    SCIRegistry.getContract(signer).then(sciRegistry => {
      setSCIRegistry(sciRegistry);
    });

  }, [signer]);

  return sciRegistry;

}