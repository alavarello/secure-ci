import {useEffect, useState} from "react";
import {useEthersSigner} from "./useEtherSigner";
import {FakeScam} from "../services/contracts/FakeScam";


export function useFakeScam() {
    const signer = useEthersSigner();
    const [fakeScam, setFakeScam] = useState<FakeScam>();

    useEffect(() => {
        if(!signer) return;

        FakeScam.getContract(signer).then(fakeScam => {
            setFakeScam(fakeScam);
        });

    }, [signer]);

    return fakeScam;
}