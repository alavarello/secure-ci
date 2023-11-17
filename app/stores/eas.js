import { createContext, useCallback, useEffect, useState } from 'react';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { FallbackProvider, JsonRpcProvider, BrowserProvider } from 'ethers';
import { usePublicClient, useWalletClient } from 'wagmi';

const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";
const schemaEncoder = new SchemaEncoder("uint256 chainId, address contractAddress");

export function publicClientToProvider(publicClient) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  };
  if (transport.type === "fallback")
    return new FallbackProvider(
      (transport.transports).map(
        ({ value }) => new JsonRpcProvider(value?.url, network)
      )
    );
  return new JsonRpcProvider(transport.url, network);
}

export function walletClientToSigner(walletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  };
  const provider = new BrowserProvider(transport, network);
  const signer = provider.getSigner(account.address);

  return signer;
}

export function useSigner() {
  const { data: walletClient } = useWalletClient({
    onError(error) {
      console.error('Cannot get wallet client', error)
    },
  });

  const [signer, setSigner] = useState(undefined);
  useEffect(() => {
    async function getSigner() {
      if (!walletClient) return;

      const tmpSigner = await walletClientToSigner(walletClient);

      setSigner(tmpSigner);
    }

    getSigner();

  }, [walletClient]);
  return signer;
}

export function useProvider() {
  const publicClient = usePublicClient({
    onError(error) {
      console.error('Cannot get public client', error)
    },
  });

  const [provider, setProvider] = useState(undefined);
  useEffect(() => {
    async function getSigner() {
      if (!publicClient) return;

      const tmpProvider = publicClientToProvider(publicClient);

      setProvider(tmpProvider);
    }

    getSigner();

  }, [publicClient]);
  return provider;
}

export const EASContext = createContext({
  eas: undefined,
  attest: (chainId, contractAddress) => console.debug('attest', chainId, contractAddress),
  attesting: false,
  error: null,
});

export function EASProvider({
  EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e", // Sepolia v0.26
  children,
}) {
  const signer = useSigner();
  const [eas, setEAS] = useState(undefined);
  const [attesting, setAttesting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.debug('signer', signer);
    if (signer) {
      const eas = new EAS(EASContractAddress);
      eas.connect(signer);
      console.debug('eas', eas);
      setEAS(eas);
    }
  }, [signer]);

  const attest = useCallback((chainId, contractAddress) => {
    console.debug('attest on eas', eas);
    if (!eas) {
      console.error('There is not EAS');
      return;
    }
    const encodedData = schemaEncoder.encodeData([
      { name: "chainId", value: chainId, type: "uint256" },
      { name: "contractAddress", value: contractAddress, type: "address" },
    ]);
    const attestation = {
      schema: schemaUID,
      data: {
        expirationTime: 0,
        revocable: true,
        data: encodedData,
      },
    };
    setAttesting(true);
    eas.attest(attestation).then(
      (tx) => {
        console.debug('attested tx', tx);
        tx.wait().then(
          (newAttestationUID) => {
            console.debug('newAttestationUID', newAttestationUID);
            setAttesting(false);
          },
          (err) => {
            console.error('EAS tx wait', err);
            setError(err);
            setAttesting(false);
          },
        );
      },
      (err) => {
        console.error('EAS attest failed', err);
        setError(err);
        setAttesting(false);
      },
    );
  }, [eas]);

  return (
    <EASContext.Provider value={{
      eas,
      attest,
      attesting,
      error,
    }}>
      {children}
    </EASContext.Provider>
  );
}

