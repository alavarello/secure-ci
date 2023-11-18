import styles from './AttestButton.module.css';
import { useContext } from "react";
import { EASContext } from "../../stores/eas";

function ReportDomainButton({
  domainName,
}: {
  domainName: string,
}) {
  const { eas, reportDomain, attesting, error } = useContext(EASContext);

  const onAttest = () => {
    reportDomain(domainName);
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
      Report BAD Domain
    </button>
  )
}

export default ReportDomainButton;
