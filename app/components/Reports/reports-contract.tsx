import { useContext, useEffect, useState } from 'react';
import styles from './Reports.module.css';
import { EASContext } from '../../stores/eas';

function ReportsContract({
  chainId,
  contractAddress,
}: {
  chainId: number,
  contractAddress: string,
}) {
  const { loadReportsByContract, getReportByContract, getContractError, isContractLoading } = useContext(EASContext);

  useEffect(() => {
    loadReportsByContract(chainId, contractAddress)
  }, [loadReportsByContract, chainId, contractAddress])

  const error = getContractError(chainId, contractAddress)

  if (error) {
    return <p>Could not fetch contact reports: {`${error}`}</p>;
  }

  const loading = isContractLoading(chainId, contractAddress)

  if (loading) {
    return <progress />;
  }

  const reports = getReportByContract(chainId, contractAddress)

  if (reports === 0) {
    return null;
  }

  return (
    <p className={styles.warning}>Warning: contract has been flagged {reports} times.</p>
  )
}

export default ReportsContract;
