import { useContext, useEffect, useState } from 'react';
import styles from './Reports.module.css';
import { EASContext } from '../../stores/eas';

function ReportsDomain({
  domainName,
}: {
  domainName: string,
}) {
  const { loadReportsByDomain, getReportByDomain, getDomainError, isDomainLoading } = useContext(EASContext);

  useEffect(() => {
    loadReportsByDomain(domainName)
  }, [loadReportsByDomain, domainName])

  const error = getDomainError(domainName)

  if (error) {
    return <p>Could not fetch domain reports: {`${error}`}</p>;
  }

  const loading = isDomainLoading(domainName)

  if (loading) {
    return <progress />;
  }

  const reports = getReportByDomain(domainName)

  if (reports === 0) {
    return null;
  }

  return (
    <p className={styles.warning}>Warning: domain has been flagged {reports} times.</p>
  )
}

export default ReportsDomain;
