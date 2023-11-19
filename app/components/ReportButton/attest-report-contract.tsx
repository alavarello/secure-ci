import styles from './AttestButton.module.css';
import { useContext } from "react";
import { EASContext } from "../../stores/eas";
import {Button, LinearProgress} from '@mui/material';

function ReportContractButton({
  chainId,
  contractAddress,
}: {
  chainId: number,
  contractAddress: string,
}) {
  const { eas, reportContract, attestingContract, errorContract } = useContext(EASContext);

  const onAttest = () => {
    reportContract(chainId, contractAddress);
  }

  if (errorContract) {
    return;
  }

  if (attestingContract) {
    return <LinearProgress style={{maxWidth: "100px", margin: "50px"}} />;
  }

  return (
    <Button variant="outlined" color="error"
      disabled={!eas || attestingContract || errorContract}
      onClick={onAttest}
    >
      Report BAD Contract
    </Button>
  )
}

export default ReportContractButton;
