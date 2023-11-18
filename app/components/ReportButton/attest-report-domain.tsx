import styles from './AttestButton.module.css';
import { useContext } from "react";
import { EASContext } from "../../stores/eas";

function ReportDomainButton({
  domainName,
}: {
  domainName: string,
}) {
  const { eas, reportDomain, attestingDomain, errorDomain } = useContext(EASContext);

  const onAttest = () => {
    reportDomain(domainName);
  }

  if (errorDomain) {
    return <p>Cannot attest: {`${errorDomain}`}</p>;
  }

  if (attestingDomain) {
    return <progress />;
  }

  return (
    <button
      className={styles.button}
      disabled={!eas || attestingDomain || errorDomain}
      onClick={onAttest}
    >
      Report BAD Domain
    </button>
  )
}

export default ReportDomainButton;
