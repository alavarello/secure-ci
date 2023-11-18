import styles from './AttestButton.module.css';
import { useContext } from "react";
import { EASContext } from "../../stores/eas";

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
    return <p>Cannot attest: {`${errorContract}`}</p>;
  }

  if (attestingContract) {
    return <progress />;
  }

  return (
    <button
      className={styles.button}
      disabled={!eas || attestingContract || errorContract}
      onClick={onAttest}
    >
      Report BAD Contract
    </button>
  )
}

export default ReportContractButton;
