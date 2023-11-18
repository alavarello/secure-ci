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
                        canMutate={data.owner === address}
                    />
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
