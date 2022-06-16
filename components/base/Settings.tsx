import React, { useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { shortenAddress } from 'utils'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import Modal from '../Modal'

const Container = styled.div`
  display: flex;
  flex-basis: 25%;
  max-width: 25%;
  align-items: center;
  justify-content: flex-end;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 0.5em;
  color: white;
  background-color: #0f172a;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
`

const Settings = () => {
  const { account, provider, chainId, isActive } = useWeb3React()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Container>
      {!account || !provider || !chainId ? (
        <Button onClick={() => setIsOpen(true)}>Connect Wallet</Button>
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          <Jazzicon diameter={15} seed={account ? jsNumberForAddress(account) : 0} />
          <div style={{ marginLeft: '.7em' }}> {shortenAddress(account)}</div>
        </Button>
      )}
      {<Modal isOpen={isOpen} close={() => setIsOpen(false)} />}
    </Container>
  )
}

export default Settings
