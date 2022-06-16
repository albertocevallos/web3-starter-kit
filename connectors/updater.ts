import { useEffect, useState } from 'react'
import { URI_AVAILABLE } from '@web3-react/walletconnect'
import { metaMask } from './metaMask'
import { walletConnect } from './walletConnect'
import { gnosisSafe } from './gnosisSafe'
import { coinbaseWallet } from './coinbaseWallet'

export default function Updater(): null {
  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])

  // log URI when available
  useEffect(() => {
    walletConnect.events.on(URI_AVAILABLE, (uri: string) => {
      console.log(`uri: ${uri}`)
    })
  }, [])

  // attempt to connect eagerly on mount
  useEffect(() => {
    walletConnect.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to walletconnect')
    })
  }, [])

  // attempt to connect eagerly on mount
  useEffect(() => {
    void gnosisSafe.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to gnosis safe')
    })
  }, [])

  // attempt to connect eagerly on mount
  useEffect(() => {
    void coinbaseWallet.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to coinbase wallet')
    })
  }, [])
  return null
}
