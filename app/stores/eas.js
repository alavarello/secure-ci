import { createContext, useCallback, useEffect, useState } from 'react';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { FallbackProvider, JsonRpcProvider, BrowserProvider, ZeroAddress } from 'ethers';
import { usePublicClient, useWalletClient } from 'wagmi';
import { getReportsByContract, getReportsByDomainName, reportContractSchema, reportDomainSchema } from '../utils/eas';

const reportContractSchemaEncoder = new SchemaEncoder("uint256 chainId, address contractAddress");
const reportDomainSchemaEncoder = new SchemaEncoder("string domainName");

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
  loadReportsByContract: (chainId, contractAddress) => console.debug('loadReportsByContract', chainId, contractAddress),
  loadReportsByDomain: (domainName) => console.debug('loadReportsByDomain', domainName),
  getReportByContract: (chainId, contractAddress) => 0,
  getReportByDomain: (domainName) => 0,
  isContractLoading: (chainId, contractAddress) => false,
  isDomainLoading: (domainName) => false,
  getContractError: (chainId, contractAddress) => null,
  getDomainError: (domainName) => null,
});

export function EASProvider({
  EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e", // Sepolia v0.26
  children,
}) {
  const signer = useSigner();
  const [eas, setEAS] = useState(undefined);
  const [attesting, setAttesting] = useState(false);
  const [error, setError] = useState(null);
  const [reports, setReports] = useState({})
  const [loading, setLoading] = useState({})
  const [errors, setErrors] = useState({})

  const setReport = (k, v) => setReports((p) => ({ ...p, [k]: v }))

  const addLoading = (k) => setLoading((p) => ({ ...p, [k]: true }))
  const delLoading = (k) => setLoading((p) => ({ ...p, [k]: false }))

  const addError = (k, e) => setErrors((p) => ({ ...p, [k]: e }))
  const delError = (k) => setErrors((p) => ({ ...p, [k]: null }))

  const loadReportsByContract = useCallback((chainId, contractAddress) => {
    const k = `c-${chainId}-${contractAddress}`
    addLoading(k)
    delError(k)
    getReportsByContract(chainId, contractAddress).then(
      (reports) => {
        setReport(k, reports)
        delLoading(k)
      },
      (err) => {
        addError(k, err)
        delLoading(k)
      }
    )
  }, [getReportsByContract])

  const loadReportsByDomain = useCallback((domainName) => {
    const k = `d-${domainName}`
    addLoading(k)
    delError(k)
    getReportsByDomainName(domainName).then(
      (reports) => {
        setReport(k, reports)
        delLoading(k)
      },
      (err) => {
        addError(k, err)
        delLoading(k)
      }
    )
  }, [getReportsByDomainName])

  const getReportByContract = useCallback((chainId, contractAddress) => reports[`c-${chainId}-${contractAddress}`] ?? 0, [reports])
  const getReportByDomain = useCallback((domainName) => reports[`d-${domainName}`] ?? 0, [reports])

  const isContractLoading = useCallback((chainId, contractAddress) => loading[`c-${chainId}-${contractAddress}`] ?? false, [loading])
  const isDomainLoading = useCallback((domainName) => loading[`d-${domainName}`] ?? false, [loading])

  const getContractError = useCallback((chainId, contractAddress) => errors[`c-${chainId}-${contractAddress}`] ?? null, [errors])
  const getDomainError = useCallback((domainName) => errors[`d-${domainName}`] ?? null, [errors])

  useEffect(() => {
    console.debug('signer', signer);
    if (signer) {
      console.debug('EASContractAddress', EASContractAddress);
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
    const encodedData = reportContractSchemaEncoder.encodeData([
      { name: "chainId", value: chainId, type: "uint256" },
      { name: "contractAddress", value: contractAddress, type: "address" },
    ]);
    const attestation = {
      schema: reportContractSchema.uid,
      data: {
        recipient: ZeroAddress,
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
            loadReportsByContract(chainId, contractAddress)
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
  }, [eas, loadReportsByContract]);

  const reportDomain = useCallback((domainName) => {
    if (!eas) {
      console.error('There is not EAS');
      return;
    }
    const encodedData = reportDomainSchemaEncoder.encodeData([
      { name: "domainName", value: domainName, type: "string" },
    ]);
    const attestation = {
      schema: reportDomainSchema.uid,
      data: {
        recipient: ZeroAddress,
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
            loadReportsByDomain(domainName)
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
  }, [eas, loadReportsByDomain])

  return (
    <EASContext.Provider value={{
      eas,
      reportContract,
      reportDomain,
      attesting,
      error,
      loadReportsByContract,
      loadReportsByDomain,
      getReportByContract,
      getReportByDomain,
      isContractLoading,
      isDomainLoading,
      getContractError,
      getDomainError,
    }}>
      {children}
    </EASContext.Provider>
  );
}

