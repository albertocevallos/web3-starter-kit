import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  StyledDialog,
  ModalHeader,
  ModalTitle,
  ModalSubTitle,
  ModalMenu,
  ModalMenuRow,
  ModalMenuIcon,
  ModalMenuArrow,
  ModalMenuGroup,
  ModalDisclosure,
} from './lib'
import { walletsArray } from 'config/wallets'
import Close from 'assets/icons/close.svg'
import RightArrow from 'assets/icons/rightarrow.svg'
import LeftArrow from 'assets/icons/leftarrow.svg'

import MetaMaskCard from '../web3/connectorCards/MetaMaskCard'
import WalletConnectCard from '../web3/connectorCards/WalletConnectCard'
import GnosisSafeCard from '../web3/connectorCards/GnosisSafeCard'
import CoinbaseWalletCard from '../web3/connectorCards/CoinbaseWalletCard'

interface ModalProps {
  isOpen: boolean
  close: () => void
}

export default function Modal({ isOpen, close }: ModalProps) {
  const [window, setWindow] = useState<string>()

  useEffect(() => {
    if (isOpen === false) {
      setWindow('')
    }
  }, [isOpen])

  const windowHandler = () => {
    switch (window) {
      case 'METAMASK':
        return <MetaMaskCard />
      case 'WALLET_CONNECT':
        return <WalletConnectCard />
      case 'GNOSIS_SAFE':
        return <GnosisSafeCard />
      case 'COINBASE_WALLET':
        return <CoinbaseWalletCard />
      default:
        return ''
    }
  }
  return (
    <>
      <StyledDialog isOpen={isOpen} onDismiss={close} aria-label="Select wallet">
        <ModalHeader>
          {window ? (
            <img onClick={() => setWindow('')} src={LeftArrow} style={{ height: '1em', cursor: 'pointer' }} />
          ) : (
            <div></div>
          )}

          <img onClick={() => close()} src={Close} style={{ height: '1em', cursor: 'pointer' }} />
        </ModalHeader>
        <div style={{ height: '5em' }}></div>
        <ModalTitle>Connect Wallet</ModalTitle>
        <ModalSubTitle>To start using this dApp</ModalSubTitle>
        {!window ? (
          <ModalMenu>
            {walletsArray.map((wallet) => {
              return (
                <ModalMenuRow onClick={() => setWindow(wallet.component)} key={wallet.name}>
                  <ModalMenuGroup>
                    <ModalMenuIcon src={wallet.icon} />
                    <div style={{}}>{wallet.name}</div>
                  </ModalMenuGroup>
                  <ModalMenuArrow src={RightArrow} />
                </ModalMenuRow>
              )
            })}
          </ModalMenu>
        ) : (
          <div>{windowHandler()}</div>
        )}
        <ModalDisclosure>
          By connecting I accept the <span>Terms of Service</span>.
        </ModalDisclosure>
      </StyledDialog>
    </>
  )
}
