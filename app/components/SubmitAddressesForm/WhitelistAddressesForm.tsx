import { Button } from '@mui/base'
import styles from './WhitelistAddressesForm.module.css'
import { Card, TextField } from '@mui/material'
import { useState } from 'react'
import {useSCIRegistry} from "../../hooks/useSCIRegistry";

export const WhitelistAddressesForm = ({
  domainName,
}: {
  domainName: string,
}) => {
  // width of the TextField
  const width = 450

  const [addresses, setAddresses] = useState('');
  const sciRegistry = useSCIRegistry();

  async function handleSubmit(event: any) {
    event.preventDefault();

    if(!sciRegistry) return;

    try {
        await sciRegistry.addAddresses(domainName, 1, addresses.split('\n'));
    } catch (e) {
        console.error(e);
    }
  }

    return (
    <Card className={styles.modalContainer}>
      <h3 className={styles.h1Whitelist}>Whitelist addresses</h3>
      <form className={styles.container} onSubmit={handleSubmit} >
        <TextField
            name='addresses'
            placeholder={"0xf032ecF3eDB10C103D9b99CEaa69E91be2D799f1" + '\n' + "0xf032ecF3eDB10C103D9b99CEaa69E91be2D799f1"}
            variant="outlined"
            value={addresses}
            // @ts-ignore // TODO: Fix
            onInput={ e => setAddresses(e.target.value)}
            /* styles the wrapper */
            style={{ width }}
            /* styles the input component */
            inputProps={{
                style: {
                    width,
                    padding: '0 14px',
                },
            }}
            multiline
            rows={12}
            maxRows={Infinity}
        />

      </form>
      <Button type="submit" className={styles.modalButton}> 
                    Whitelist new addresses
                    </Button>
    </Card>
  )
}

export default WhitelistAddressesForm
