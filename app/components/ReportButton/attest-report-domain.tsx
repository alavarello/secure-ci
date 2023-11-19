import styles from './AttestButton.module.css';
import { useContext } from "react";
import { EASContext } from "../../stores/eas";
import {Button, LinearProgress} from "@mui/material";
import { useConnectedAddress } from '../../hooks/useConnectedAddress';
import { useChainId } from '../../hooks/useChainId';
import { sendNotification } from '../../utils/web3inbox';

function ReportDomainButton({
  domainName,
}: {
  domainName: string,
}) {
  const { eas, reportDomain, attestingDomain, errorDomain } = useContext(EASContext);
  const { address } = useConnectedAddress()
  const { chainId } = useChainId()

  const onAttest = () => {
    reportDomain(domainName).then((uid) => {
      if (!uid) {
        return;
      }
      sendNotification(domainName, chainId, address,
        `Domain has been reported`,
        `Address ${address} flagged ${domainName}`
      )
    });
  }

  if (errorDomain) {
    return <p>Cannot attest: {`${errorDomain}`}</p>;
  }

  if (attestingDomain) {
    return <LinearProgress style={{maxWidth: "100px", margin: "50px"}} />;
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
