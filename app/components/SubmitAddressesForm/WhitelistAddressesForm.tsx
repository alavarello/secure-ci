import {LoadingButton} from "@mui/lab"
import styles from './WhitelistAddressesForm.module.css'
import { Card, TextField } from '@mui/material'
import {useContext, useState} from 'react'
import {useSCIRegistry} from "../../hooks/useSCIRegistry";
import SaveIcon from '@mui/icons-material/Save';
import Typography from "@mui/material/Typography";
import {ContractTransactionResponse} from "ethers";
import {PopupContext} from "../Popup/PopupProvider";

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
  const [tx, setTx] = useState<ContractTransactionResponse | null>(null)
  const {dispatchPopup} = useContext(PopupContext);

  // width of the TextField
  const width = 460

  const [addresses, setAddresses] = useState('');
  const sciRegistry = useSCIRegistry();

  async function handleSubmit(event: any) {
    if(!addresses) return
    setLoading(true)

    event.preventDefault();

    if(!sciRegistry) {
      console.debug('Not SCI registry');
      setLoading(false)
      return;
    }

    try {
        const tx = await sciRegistry.addAddresses(domainName, chainId, addresses.split('\n'));
        // @ts-ignore
        setTx(tx);
        await tx.wait()
    } catch (e) {
        console.error(e);
        setLoading(false);
        dispatchPopup({props: {
                open: true,
                content: <>
                    Ups there was an error sending your transaction. Please try again later
                </>,
                severity: "error",
                title: "Error"
            }})
        return
    }

    setLoading(false);

    onSubmit?.(addresses.split('\n'))
  }


    return (
    <Card className={styles.modalContainer}>
      <h3 className={styles.h1Whitelist}>Whitelist addresses</h3>
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
      <LoadingButton
        loading={loading}
        disabled={!addresses}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
        type="submit"
        className={styles.modalButton}
        onClick={handleSubmit}
      >
          Whitelist new addresses
      </LoadingButton>
      {tx &&
          <a
              href={"https://goerli.etherscan.io/tx/" + tx.hash}
              target="_blank"
          >
              Click here to view tx
          </a>
      }
    </Card>
  )
}

export default WhitelistAddressesForm
