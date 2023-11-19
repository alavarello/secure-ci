import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useManageSubscription, useMessages } from "@web3inbox/widget-react"
import { useState } from "react";
import styles from './Subscribe.module.css';

function SubscribedMessages({
  domainName,
}: {
  domainName: string,
}) {
  const { isSubscribed } = useManageSubscription()
  const { messages } = useMessages()
  const [opened, setOpened] = useState(null)

  if (!isSubscribed) {
    return null;
  }

  function openMessage(
    // @ts-ignore
    message,
  ) {
    setOpened(message.id)
  }

  function closeMessage() {
    setOpened(null)
  }

  console.debug('messages', messages)

  const domainMessages = messages.filter((message) => {
    const domain = new URL(message.message.url).host;
    return domain == domainName;
  })

  return (
    <div className={styles.messages}>
    <h2 className={styles.h2}>Messages</h2>
    {domainMessages.length === 0 &&  <div className={styles.youAreSuscribed}>{`You are subscribed and will be receiving a message when ${domainName} changes.`}</div>}
    {domainMessages.length > 0 && 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {domainMessages.map((message) => (
            <TableRow
              key={message.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <h4>{message.message.title}</h4>
                {opened === message.id && (
                  <p>
                    {message.message.body}
                  </p>
                )}
              </TableCell>
              <TableCell>
                {new Date(message.publishedAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <div className={styles.actions}>
                {opened === message.id ? (
                  <button onClick={() => closeMessage()} className={styles.arrow}>
                    <svg style={{ width: '24px', height: '24px' }} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </button>
                ) : (
                  <button onClick={() => openMessage(message)} className={styles.arrow}>
                    <svg style={{ width: '24px', height: '24px' }} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </button>
                )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }
    </div>
  )
}

export default SubscribedMessages
