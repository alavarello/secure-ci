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
  const { domain } = router.query
  const data = DUMMY_DOMAIN_DATA_FROM_SUBGRAPH.find(val => val.domain === domain)
  const isVerified: boolean = data?.addresses != undefined && data?.addresses.length > 0
  const { isLoading, refetch: verify } = useQuery(`verify-domain-${domain}`, () => verifyDomain(domain as string), {
    enabled: false,
  })

  return (
    <>
    <Modal>
        <WhitelistAddressesForm />
    </Modal>
        <div>
        <main className={styles.main}>
            {isVerified && data?.addresses ? 
                <div className={styles.verifiedContainer}>
                    <h2>{domain}</h2>
                    <div className={styles.tableTitle}>
                        <h4>Addresses</h4>
                        <Button onClick={openModal}>Whitelist new addresses</Button>
                    </div>
                    <AddressesTable
                        addresses={data.addresses}
                        canMutate={data.owner === CONNECTED_ADDRESS}
                    />
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
