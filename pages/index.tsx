import React from 'react'
import { useWeb3React } from '@web3-react/core'

import CoinbaseWalletCard from 'components/web3/connectorCards/CoinbaseWalletCard'
import GnosisSafeCard from 'components/web3/connectorCards/GnosisSafeCard'
import MetaMaskCard from 'components/web3/connectorCards/MetaMaskCard'
import NetworkCard from 'components/web3/connectorCards/NetworkCard'
import WalletConnectCard from 'components/web3/connectorCards/WalletConnectCard'

import { useTokenDataStore } from 'store/tokendata'

import { getName } from 'utils/web3'

const index = () => {
  const web3React = useWeb3React()

  const useTokenInfos = useTokenDataStore((state) => state.tokenInfos)
  const usePutTokenData = useTokenDataStore((state) => state.putTokenData)
  const useResetTokenData = useTokenDataStore((state) => state.reset)

  console.log(useTokenInfos)

  return (
    <div>
      <div>Priority connector is:{getName(web3React.connector)} </div>
      <div>count: {useTokenInfos.length}</div>
      <button
        onClick={() => {
          usePutTokenData({ balance: '0', allowances: [], tokenId: 'eth' })
        }}
      >
        increment
      </button>
      <button
        onClick={() => {
          useResetTokenData()
        }}
      >
        reset
      </button>
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard />
        <WalletConnectCard />
        <CoinbaseWalletCard />
        <NetworkCard />
        <GnosisSafeCard />
      </div>
    </div>
  )
}

export default index
