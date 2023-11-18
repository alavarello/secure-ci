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
  const { eas, reportContract, attesting, error } = useContext(EASContext);

  const onAttest = () => {
    reportContract(chainId, contractAddress);
  }

  if (error) {
    return <p>Cannot attest: {`${error}`}</p>;
  }

  if (attesting) {
    return <progress />;
  }

  return (
    <button
      className={styles.button}
      disabled={!eas || attesting || error}
      onClick={onAttest}
    >
      Report BAD Contract
    </button>
  )
}

export default ReportContractButton;
