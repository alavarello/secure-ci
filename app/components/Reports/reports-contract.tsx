import { useEffect, useState } from 'react';
import styles from './Reports.module.css';
import { getReportsByContract } from '../../utils/eas';

function ReportsContract({
  chainId,
  contractAddress,
}: {
  chainId: number,
  contractAddress: string,
}) {
  const [reports, setReports] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(false)
    getReportsByContract(chainId, contractAddress).then(
      (reports) => {
        setReports(reports)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )
  }, [getReportsByContract])

  if (error) {
    return <p>Could not fetch contact reports: {`${error}`}</p>;
  }

  if (loading) {
    return <progress />;
  }

  if (reports === 0) {
    return null;
  }

  return (
    <p className={styles.warning}>Warning: contract has been flagged ${reports} times.</p>
  )
}

export default ReportsContract;
