import type { NextPage } from 'next';
import styles from './Domain.module.css';
import { DUMMY_DOMAIN_DATA_FROM_SUBGRAPH } from '../../test_data/test-data';
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


const Domain: NextPage = () => {
  const router = useRouter()
  const { openModal } = useModalContext()
  const { domain } = router.query
  const data = DUMMY_DOMAIN_DATA_FROM_SUBGRAPH.find(val => val.domain === domain)
  const isVerified: boolean = data?.addresses != undefined && data?.addresses.length > 0
  const { address } = useConnectedAddress()

  const sciRegistry = useSCIRegistry();
  
  async function verifyDomain() {
    if(!sciRegistry) return;

    try {
        await sciRegistry.addAddresses(domain as string, 1, [address as string]);
    } catch (e) {
        console.error(e);
    }
  }

    function handleChange(event: SelectChangeEvent<'Chain'>, child: React.ReactNode): void {
        throw new Error('Function not implemented.');
    }

    if(!domain) return;

return (
    <>
    <Modal>
        <WhitelistAddressesForm />
    </Modal>
        <div>
        <main className={styles.main}>
            {isVerified && data?.addresses ? 
                <div className={styles.verifiedContainer}>
                <div className={styles.addressContainer}>
                <a href={`https://${domain}`} target='_blank'>
                    <h2 className={styles.h3}>{domain}
                    </h2>
                    </a>
                    </div>
                    <div className={styles.tableTitle}>
                        <h4 className={styles.h4}>Addresses</h4>
                        <Button onClick={openModal}>Whitelist new addresses</Button>
                    </div>
                    <div className={styles.blockchainContainer}>
                    <Box className={styles.blockchains} sx={{ maxWidth: 180 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Chain</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value="Chain"
        label="Chain"
        onChange={handleChange}>
        <MenuItem value={10}>Mainnet</MenuItem>
        <MenuItem value={20}>Arbitrum</MenuItem>
        <MenuItem value={30}>Polygon</MenuItem>
        <MenuItem value={40}>Sepolia</MenuItem>
        <MenuItem value={50}>Goerli</MenuItem>
        </Select>
    </FormControl>
    </Box>
    </div>
    <div className= {styles.h4}>
                    <AddressesTable
                        addresses={data.addresses}
                        canMutate={data.owner === address}
                    />
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
