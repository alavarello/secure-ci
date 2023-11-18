import type {NextPage} from 'next';
import styles from './Domain.module.css';
import {useRouter} from 'next/router';
import {Button, Divider, Grid} from '@mui/material';
import {AddressesTable} from '../../components/AddressTable/AddressTable';
import {useModalContext} from '../../components/Modal/Modal.provider';
import Modal, {ModalProps} from '../../components/Modal/Modal';
import WhitelistAddressesForm from '../../components/SubmitAddressesForm/WhitelistAddressesForm';
import {useConnectedAddress} from '../../hooks/useConnectedAddress';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import '@fontsource/lexend/300.css';
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
import '@fontsource/lexend/700.css';
import ReportDomainButton from '../../components/ReportButton/attest-report-domain';
import ReportsDomain from '../../components/Reports/reports-domain';
import {getDomainWhitelistedAddresses} from '../../queries/domains';
import {useQuery} from 'react-query';
import {useChainId} from '../../hooks/useChainId';
import {FC, useEffect} from "react";
import {minWidth} from "@mui/system";
import SubscribeDomainButton from '../../components/SubscribeButton/subscribe-domain';
import { sendNotification } from '../../utils/web3inbox';

const ChainSelector: FC<{
    originalChainId: number,
    chainId: number,
    handleChange: any
}> = ({originalChainId, chainId, handleChange}) => {
    return <FormControl style={{margin: "auto", minWidth: "150px"}}>
        <InputLabel id="demo-simple-select-label">Chain</InputLabel>
        <Select
            defaultValue={originalChainId}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chainId}
            label="Filter by Chain"
            onChange={handleChange}>
            <MenuItem selected={chainId == 1} value={1}>Mainnet</MenuItem>
            <MenuItem selected={chainId == 42161} value={42161}>Arbitrum</MenuItem>
            <MenuItem selected={chainId == 137} value={137}>Polygon</MenuItem>
            <MenuItem selected={chainId == 11155111} value={11155111}>Sepolia</MenuItem>
            <MenuItem selected={chainId == 5} value={5}>Goerli</MenuItem>
        </Select>
    </FormControl>
}

const Domain: NextPage = () => {
    const router = useRouter()
    const {openModal, closeModal} = useModalContext()
    const {domain} = router.query as {domain: string}
    const {address} = useConnectedAddress()
    const {chainId: originalChainId} = useChainId()
    const [chainId, setChainId] = React.useState(originalChainId)
    const [isDomainOwner, setIsDomainOwner] = React.useState(false)

    const {data: whiteListedAddresses, refetch: getWhitelistedContractsAgain} = useQuery(
        ['getWhitelistedContracts', domain],
        () => getDomainWhitelistedAddresses(domain as string)
    )

    useEffect(() => {
        if(!address || !whiteListedAddresses) return;
        // TODO: Check the verifier instead of the subgraph
        setIsDomainOwner(address.toLowerCase() === whiteListedAddresses.domainOwner.toLowerCase());
    }, [address, whiteListedAddresses])

    function handleChange(event: SelectChangeEvent<'Chain'>, child: React.ReactNode): void {
        if (/^[0-9]+$/.test(String(event.target.value))) {
            setChainId(parseInt(event.target.value))
        }
    }

    function onSubmit(addresses: string[]) {
        console.debug('New addresses', addresses)
        sendNotification(domain, chainId, address,
            `New contract${addresses.length === 1 ? '' : 's'} verified`,
            `The following addresses has been verified:\n${addresses.join('\n')}`
        )
        closeModal()
        getWhitelistedContractsAgain()
    }

    function onRemove(addressRemoved: string) {
        sendNotification(domain, chainId, address,
            `Contract is not verified anymore`,
            `The following address has been unverified:\n${addressRemoved}`
        )
    }

    if (!domain) return;

    return (
        <>
            <main className={styles.main}>
                <div className={styles.verifiedContainer}>
                    <div style={{position: "relative"}}>
                        <ReportDomainButton domainName={domain}/>
                    </div>
                    <div className={styles.addressContainer}>
                        <a href={`https://${domain}`} target='_blank'>
                            <h2 className={styles.h3}>{domain}
                            </h2>
                        </a>
                    </div>
                    {isDomainOwner && <div style={{position: "relative"}}>
                        <Button onClick={openModal} className={styles.nicerButton}>
                            Whitelist new addresses
                        </Button>
                    </div>}
                    <div>
                        <ReportsDomain domainName={domain}/>
                    </div>
                    <Divider style={{padding: "1rem"}}/>

                    <div className={styles.tableTitle}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <h4 className={styles.h4}>Contracts</h4>
                            </Grid>
                            <Grid item xs={4} style={{display: "flex"}}>
                                <ChainSelector
                                    originalChainId={originalChainId}
                                    chainId={chainId}
                                    handleChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <div className={styles.h4}>
                            <AddressesTable
                                chainId={chainId}
                                addresses={whiteListedAddresses?.contracts.map(val => val.address) ?? []}
                                canMutate={whiteListedAddresses?.domainOwner === address}
                                onRemove={onRemove}
                            />
                        </div>
                    </div>
                    <div>
                        <SubscribeDomainButton domainName={domain}/>
                    </div>
                </div>
            </main>
            <Modal>
                <WhitelistAddressesForm
                    chainId={chainId}
                    domainName={domain}
                    onSubmit={onSubmit}
                />
            </Modal>
        </>
    );
};

export default Domain;
