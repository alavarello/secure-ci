import { Button } from '@mui/base'
import styles from './WhitelistAddressesForm.module.css'
import { Card, TextField } from '@mui/material'
import { useState } from 'react'
import {useSCIRegistry} from "../../hooks/useSCIRegistry";

export const WhitelistAddressesForm = ({
  chainId,
  domainName,
  onSubmit,
}: {
  chainId: number,
  domainName: string,
  onSubmit: (addresses: string[]) => void,
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // width of the TextField
  const width = 450

  const [addresses, setAddresses] = useState('');
  const sciRegistry = useSCIRegistry();

  async function handleSubmit(event: any) {
    setLoading(true)
    setError(null)

    event.preventDefault();

    if(!sciRegistry) {
      console.debug('Not SCI registry');
      setLoading(false)
      return;
    }

    try {
        await sciRegistry.addAddresses(domainName, chainId, addresses.split('\n'));
    } catch (e) {
        console.error(e);
        setError(`${e}`);
    }

    setLoading(true)

    onSubmit?.(addresses.split('\n'))
  }

    return (
    <Card className={styles.modalContainer}>
      <h3 className={styles.h1Whitelist}>Whitelist addresses</h3>
      {loading && <progress />}
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.container} onSubmit={handleSubmit} >
        <TextField
          className={styles.textField}
          disabled={loading}
            name='addresses'
            placeholder={"0xf032ecF3eDB10C103D9b99CEaa69E91be2D799f1" + '\n' + "0xf6b6f07862a02c85628b3a9688beae07fea9c863"}
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
      <Button
          disabled={loading}
        type="submit"
        className={styles.modalButton}
        onClick={handleSubmit}
      >
                    Whitelist new addresses
                    </Button>
    </Card>
  )
}

export default WhitelistAddressesForm
