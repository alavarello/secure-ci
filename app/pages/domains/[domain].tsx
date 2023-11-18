import type { NextPage } from 'next';
import styles from './Domain.module.css';
import { useRouter } from 'next/router';
import { Button, Card } from '@mui/material';
import { AddressesTable } from '../../components/AddressTable/AddressTable';
import { useModalContext } from '../../components/Modal/Modal.provider';
import Modal from '../../components/Modal/Modal';
import WhitelistAddressesForm from '../../components/SubmitAddressesForm/WhitelistAddressesForm';
import { useConnectedAddress } from '../../hooks/useConnectedAddress';
import { useSCIRegistry } from '../../hooks/useSCIRegistry';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '@fontsource/lexend/300.css';
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
import '@fontsource/lexend/700.css';
import ReportDomainButton from '../../components/ReportButton/attest-report-domain';
import ReportsDomain from '../../components/Reports/reports-domain';
import { getDomainWhitelistedAddresses } from '../../queries/domains';
import { useQuery } from 'react-query';
import { useChainId } from '../../hooks/useChainId';

const Domain: NextPage = () => {
  const router = useRouter()
  const { openModal, closeModal } = useModalContext()
  const { domain } = router.query
  const { address } = useConnectedAddress()
  const { chainId: originalChainId } = useChainId()
  const sciRegistry = useSCIRegistry();
  const [chainId, setChainId] = React.useState(originalChainId)

  const { data: whiteListedAddresses } = useQuery(
    ['getWhitelistedContracts', domain],
    () => getDomainWhitelistedAddresses(domain as string)
  )

  const isVerified: boolean = !!(whiteListedAddresses && whiteListedAddresses.contracts.length > 0)
  
  async function verifyDomain() {
    if(!sciRegistry) return;

    try {
        await sciRegistry.addAddresses(domain as string, 1, [address as string]);
    } catch (e) {
        console.error(e);
    }
  }

    function handleChange(event: SelectChangeEvent<'Chain'>, child: React.ReactNode): void {
        if (/^[0-9]+$/.test(String(event.target.value))) {
            setChainId(parseInt(event.target.value))
        }
    }

    function onSubmit(addresses: string[]) {
        console.debug('New addresses', addresses)
        closeModal()
    }

    if(!domain) return;

return (
    <>
    <Modal>
        <WhitelistAddressesForm
            chainId={chainId}
            // @ts-ignore
            domainName={domain}
            onSubmit={onSubmit}
        />
    </Modal>
        <div>
        <main className={styles.main}>
            {isVerified ? 
                <div className={styles.verifiedContainer}>
                <div className={styles.addressContainer}>
                <a href={`https://${domain}`} target='_blank'>
                    <h2 className={styles.h3}>{domain}
                    </h2>
                    </a>
                    </div>
                    <div className={styles.tableTitle}>
                    <h4 className={styles.h4}>Addresses</h4>
                    <Button onClick={openModal} className={styles.nicerButton}> 
                    Whitelist new addresses
                    </Button>
                    </div>
                    <div className={styles.blockchainContainer}>
                    <Box className={styles.blockchains} sx={{ maxWidth: 180 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Chain</InputLabel>
        <Select
        // @ts-ignore
        defaultValue={originalChainId}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // @ts-ignore
        value={chainId}
        label="Chain"
        onChange={handleChange}>
        <MenuItem selected={chainId == 1} value={1}>Mainnet</MenuItem>
        <MenuItem selected={chainId == 42161} value={42161}>Arbitrum</MenuItem>
        <MenuItem selected={chainId == 137} value={137}>Polygon</MenuItem>
        <MenuItem selected={chainId == 11155111} value={11155111}>Sepolia</MenuItem>
        <MenuItem selected={chainId == 5} value={5}>Goerli</MenuItem>
        </Select>
    </FormControl>
    </Box>
    </div>
    <div>
    <div className= {styles.h4}>
                    <AddressesTable
                        chainId={1} // FIXME
                        addresses={whiteListedAddresses?.contracts.map(val => val.address) ?? []}
                        canMutate={whiteListedAddresses?.domainOwner === address}
                    />
                    </div>
                </div>
                    <div>
                        <ReportDomainButton 
                            // @ts-ignore
                            domainName={domain}
                        />
                        <ReportsDomain
                            // @ts-ignore
                            domainName={domain}
                        />
                    </div>
                </div> 
                : 
                <Card className={styles.verifyCardContainer}>
                    <h2>{domain}</h2>
                    <span>Lets get started with verifying</span>
                    {address ? 
                      <div className={styles.verifyContainer}>
                        <Button onClick={verifyDomain}>Verify</Button>
                        <div>{address}</div>
                      </div>
                      : <ConnectButton />
                    }
                </Card> 
            }
        </main>
        </div>
    </>
);
};

export default Domain;
