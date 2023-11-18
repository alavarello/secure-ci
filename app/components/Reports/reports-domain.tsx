import { useEffect, useState } from 'react';
import styles from './Reports.module.css';
import { getReportsByDomainName } from '../../utils/eas';

function ReportsDomain({
  domainName,
}: {
  domainName: string,
}) {
  const [reports, setReports] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(false)
    getReportsByDomainName(domainName).then(
      (reports) => {
        setReports(reports)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )
  }, [getReportsByDomainName])

  if (error) {
    return <p>Could not fetch domain reports: {`${error}`}</p>;
  }

  if (loading) {
    return <progress />;
  }

  if (reports === 0) {
    return null;
  }

  return (
    <p className={styles.warning}>Warning: domain has been flagged ${reports} times.</p>
  )
}

export default ReportsDomain;
