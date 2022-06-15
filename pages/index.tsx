import React from 'react'

import CoinbaseWalletCard from 'components/web3/connectorCards/CoinbaseWalletCard'
import GnosisSafeCard from 'components/web3/connectorCards/GnosisSafeCard'
import MetaMaskCard from 'components/web3/connectorCards/MetaMaskCard'
import NetworkCard from 'components/web3/connectorCards/NetworkCard'
import WalletConnectCard from 'components/web3/connectorCards/WalletConnectCard'

const index = () => {
  return (
    <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
      <MetaMaskCard />
      <WalletConnectCard />
      <CoinbaseWalletCard />
      <NetworkCard />
      <GnosisSafeCard />
    </div>
  )
}

export default index
