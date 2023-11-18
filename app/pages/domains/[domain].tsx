import type { NextPage } from 'next';
import styles from './Domain.module.css';
import { DUMMY_DOMAIN_DATA_FROM_SUBGRAPH } from '../../test_data/test-data';
import { useRouter } from 'next/router';
import { Button, Card } from '@mui/material';
import { AddressesTable } from '../../components/AddressTable/AddressTable';
import { useQuery } from 'react-query'
import { useModalContext } from '../../components/Modal/Modal.provider';
import Modal from '../../components/Modal/Modal';
import WhitelistAddressesForm from '../../components/SubmitAddressesForm/WhitelistAddressesForm';
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

const CONNECTED_ADDRESS = '0xf032ecF3eDB10C103D9b99CEaa69E91be2D799f1'

const verifyDomain = (domain: string) => {
    console.log('verifying domain', domain)
    if(!domain) return
    // TODO export and implement this in services
    return
}

const Domain: NextPage = () => {
const router = useRouter()
const { openModal } = useModalContext()
const { domain } = router.query;
const data = DUMMY_DOMAIN_DATA_FROM_SUBGRAPH.find(val => val.domain === domain)
const isVerified: boolean = data?.addresses != undefined && data?.addresses.length > 0
const { isLoading, refetch: verify } = useQuery(`verify-domain-${domain}`, () => verifyDomain(domain as string), {
    enabled: false,
})

    function handleChange(event: SelectChangeEvent<any>, child: React.ReactNode): void {
        throw new Error('Function not implemented.');
    }

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
                        canMutate={data.owner === CONNECTED_ADDRESS}
                    />
                </div> 
                </div> 
                : 
                <Card className={styles.verifyCardContainer}>
                    <h2>{domain}</h2>
                    Lets get started with verifying
                    <Button onClick={() => verify()}>Verify</Button>
                </Card> 
            }
        </main>
        </div>
    </>
);
};

export default Domain;
