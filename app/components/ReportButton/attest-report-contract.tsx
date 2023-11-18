import styles from './AttestButton.module.css';
import { useContext } from "react";
import { EASContext } from "../../stores/eas";
import { Button } from '@mui/material';

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
    return <progress />;
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
