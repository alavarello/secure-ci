import { Button } from '@mui/base'
import styles from './WhitelistAddressesForm.module.css'
import { Card, TextField } from '@mui/material'
import { useState } from 'react'

export const WhitelistAddressesForm = () => {
  // width of the TextField
  const width = 450

  const [addresses, setAddresses] = useState('');

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(addresses.split('\n'));
    //
}

  return (
    <Card className={styles.modalContainer}>
      <h3>Whitelist addresses</h3>
      <form className={styles.container} onSubmit={handleSubmit} >
        <TextField
            name='addresses'
            placeholder={"0xf032ecF3eDB10C103D9b99CEaa69E91be2D799f1" + '\n' + "0xf032ecF3eDB10C103D9b99CEaa69E91be2D799f1"}
            variant="outlined"
            value={addresses}
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
            rows={2}
            maxRows={Infinity}
        />
        <Button type="submit" >Whitelist</Button>
      </form>
    </Card>
  )
}

export default WhitelistAddressesForm
