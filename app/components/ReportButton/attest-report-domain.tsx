import styles from './AttestButton.module.css';
import { useContext } from "react";
import { EASContext } from "../../stores/eas";
import {Button} from "@mui/material";
import { Spinner } from '@ensdomains/thorin'

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
    return <Spinner />;
  }

  return (
      <Button variant="outlined" color="error"
      disabled={!eas || attestingDomain || errorDomain}
      onClick={onAttest}
    >
      Report as a bad Domain
    </Button>
  )
}

export default ReportDomainButton;
