import { useConnectedAddress } from "../../hooks/useConnectedAddress"
import { useChainId } from "../../hooks/useChainId"
import styles from './Subscribe.module.css';
import { useSignMessage } from 'wagmi'
import {
  useManageSubscription,
  useSubscription,
  useW3iAccount,
  useInitWeb3InboxClient,
  useMessages
} from '@web3inbox/widget-react'
import { useCallback, useEffect, useState } from "react"
import SubscribedMessages from "./subscribed-messages";

function SubscribeDomainButton({
  domainName,
}: {
  domainName: string,
}) {
  const { chainId } = useChainId()
  const { address } = useConnectedAddress()
  const { signMessageAsync } = useSignMessage()
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [isAlreadyRegisted, setIsAlreadyRegisted] = useState<boolean>(false)

  // Initialize the Web3Inbox SDK
  const isReady = useInitWeb3InboxClient({
    // The project ID and domain you setup in the Domain Setup section
    projectId: 'dc226665666de6862c10b8f9c5caf7af',
    domain: 'secureci.xyz',

    // Allow localhost development with "unlimited" mode.
    // This authorizes this dapp to control notification subscriptions for all domains (including `app.example.com`), not just `window.location.host`
    isLimited: false,
  })

  const { account, setAccount, isRegistered, isRegistering, register } = useW3iAccount()

  const { isSubscribed, isSubscribing, subscribe } = useManageSubscription()

  useEffect(() => {
    if (!address) {
      return;
    }
    // Convert the address into a CAIP-10 blockchain-agnostic account ID and update the Web3Inbox SDK with it
    setAccount(`eip155:${chainId}:${address}`)
  }, [address, setAccount])

  // In order to authorize the dapp to control subscriptions, the user needs to sign a SIWE message which happens automatically when `register()` is called.
  // Depending on the configuration of `domain` and `isLimited`, a different message is generated.
  const performRegistration = useCallback(async () => {
    if (!address) {
      return;
    }
    try {
      await register((message) => signMessageAsync({ message }))
    } catch (err) {
      setRegisterError(`${err}`)
    }
  }, [signMessageAsync, register, address])

  // useEffect(() => {
  //   // Register even if an identity key exists, to account for stale keys
  //   performRegistration()
  // }, [performRegistration])

  useEffect(() => {
    if (isRegistered) {
      setIsAlreadyRegisted(true)
    } else {
      const savedRegistered = localStorage.getItem('web3inbox-regitered')

      if (savedRegistered) {
        performRegistration().then(() => {
          setIsAlreadyRegisted(true)
        }).catch((err) => {
          setRegisterError(`${err}`)
        })
      }
    }
  }, [performRegistration, isRegistered])

  const performSubscribe = useCallback(async () => {
    // Register again just in case
    await performRegistration()
    await subscribe()
    localStorage.setItem('web3inbox-regitered', 'true')
  }, [subscribe, isAlreadyRegisted])

  if (!address || !isReady) {
    return null;
  }

  return (
    <div className={styles.subscribe}>
    {!isAlreadyRegisted ? (
      <div>
        To manage notifications, sign and register an identity key:&nbsp;
        <button className={styles.button} onClick={performRegistration} disabled={isRegistering}>
          {isRegistering ? 'Registering...' : 'Register'}
        </button>
      </div>
    ) : (
      <>
        {registerError ? <p className={styles.error}>{registerError}</p> : (
          <>
            {!isSubscribed ? (
              <>
                <button className={styles.button} onClick={performSubscribe} disabled={isSubscribing}>
                  {isSubscribing ? 'Subscribing...' : 'Subscribe to notifications'}
                </button>
              </>
            ) : (
              <>
                <div>You are subscribed and will be receiving a message when <code>{domainName}</code> changes.</div>
                <SubscribedMessages
                  // @ts-ignore
                  domainName={domainName}
                />
              </>
            )}
          </>
        )}
      </>
    )}
    </div>
  )
}

export default SubscribeDomainButton
