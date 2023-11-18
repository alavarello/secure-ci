import { createContext, useCallback, useEffect, useState } from 'react';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { FallbackProvider, JsonRpcProvider, BrowserProvider } from 'ethers';
import { usePublicClient, useWalletClient } from 'wagmi';

const reportContractSchema = {
  uid: '0xca272f6da4ba9af1f159c0a6b8f784ad8d058dfe08b67a4cf45d3aa064b67759',
  schemaEncoder: new SchemaEncoder("uint256 chainId, address contractAddress"),
}

const reportDomainSchema = {
  uid: '0xca272f6da4ba9af1f159c0a6b8f784ad8d058dfe08b67a4cf45d3aa064b67759',
  schemaEncoder: new SchemaEncoder("string domainName"),
}

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
  reportContract: (chainId, contractAddress) => console.debug('reportContract', chainId, contractAddress),
  reportDomain: (domainName) => console.debug('reportDomain', domainName),
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

  const reportContract = useCallback((chainId, contractAddress) => {
    if (!eas) {
      console.error('There is not EAS');
      return;
    }
    const encodedData = reportContractSchema.schemaEncoder.encodeData([
      { name: "chainId", value: chainId, type: "uint256" },
      { name: "contractAddress", value: contractAddress, type: "address" },
    ]);
    const attestation = {
      schema: reportContractSchema.uid,
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

  const reportDomain = useCallback((domainName) => {
    if (!eas) {
      console.error('There is not EAS');
      return;
    }
    const encodedData = reportDomainSchema.schemaEncoder.encodeData([
      { name: "domainName", value: domainName, type: "string" },
    ]);
    const attestation = {
      schema: reportContractSchema.uid,
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
  }, [eas])

  return (
    <EASContext.Provider value={{
      eas,
      reportContract,
      reportDomain,
      attesting,
      error,
    }}>
      {children}
    </EASContext.Provider>
  );
}

