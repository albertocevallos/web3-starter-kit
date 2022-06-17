import { network } from 'connectors/network'
import { useEffect, useCallback } from 'react'
import { useTokenDataStore } from 'store/tokendata'
import { TokenData } from './types'
import { tokenIdsArray, getToken, TokenId, getAllowanceAddresses, getTokenIdsArray } from 'constants/tokens'
import { toTokenUnitsBN } from 'utils/bignumber'
import { BigNumber, providers } from 'ethers'
import { groupBy } from 'lodash'
import { MulticallService } from 'services/multicall'
import { ERC20Service } from 'services/erc20'
import { waitForBlock } from 'utils/transactions'
import { useWeb3React } from '@web3-react/core'

type UpdateType = 'balance' | 'allowance'

export const updateTokenData = async (
  tokenIds: TokenId[],
  library: {
    provider: providers.Web3Provider | providers.JsonRpcProvider | providers.Web3Provider
    address: string
    network?: number
  },
  useTokenInfoUpdater: (tokenData: TokenData) => void,
  toUpdate?: UpdateType,
  allowanceAddresses?: string[]
) => {
  const eth = tokenIds.find((x) => x === 'eth')
  if (eth) {
    const ethToken = getToken('eth')
    library.provider.getBalance(library.address).then((ethBalance) =>
      useTokenInfoUpdater({
        tokenId: 'eth',
        allowances: [],
        balance: toTokenUnitsBN(ethBalance.toString(), ethToken.decimals).toFixed(),
      })
    )
    tokenIds = tokenIds.filter((x) => x !== 'eth')
  }

  const multicall = new MulticallService(library.provider, library.network as number)

  const callHistory: { tokenId: TokenId; type: UpdateType; data?: any[] }[] = []

  for (let j = 0; j < tokenIds.length; j++) {
    const tokenId = tokenIds[j]
    const token = getToken(tokenId)
    if (token.address === '') {
      continue
    }

    if ((toUpdate && toUpdate === 'allowance') || !toUpdate) {
      const allowanceAddr = allowanceAddresses ? allowanceAddresses : getAllowanceAddresses(tokenId)
      for (let i = 0; i < allowanceAddr.length; i++) {
        callHistory.push({ tokenId: tokenId, type: 'allowance', data: [allowanceAddr[i]] })
        multicall.allowance(token.address, library.address, allowanceAddr[i])
      }
    }

    if ((toUpdate && toUpdate === 'balance') || !toUpdate) {
      callHistory.push({ tokenId: tokenId, type: 'balance' })
      multicall.balanceOf(token.address, library.address)
    }
  }

  const { result } = await multicall.execute()
  const groupedByToken = groupBy(result, 'address')

  for (const [address, responsesTmp] of Object.entries(groupedByToken)) {
    let tokenData: TokenData = {
      tokenId: 'usdc',
      allowances: [],
      balance: '',
    }

    const tokenMultiCall = callHistory.filter(
      (x) => getToken(x.tokenId).address.toLowerCase() === address.toLowerCase()
    )

    if (!tokenMultiCall.length) {
      // TODO handle critical error
      continue
    }
    tokenData.tokenId = tokenMultiCall[0].tokenId
    for (let j = 0; j < tokenMultiCall.length; j++) {
      const token = getToken(tokenMultiCall[j].tokenId)
      const callHis = tokenMultiCall[j]

      if (callHis.type === 'allowance' && callHis.data) {
        tokenData.allowances.push({
          address: callHis.data[0],
          hasAllowance: (responsesTmp[j].parsedData[0] as BigNumber).gte(BigNumber.from('0xffffffffffffffffffffffff')),
        })
      }

      if (callHis.type === 'balance') {
        tokenData.balance = toTokenUnitsBN(
          (responsesTmp[j].parsedData as BigNumber).toString(),
          token.decimals
        ).toFixed()
      }
    }

    useTokenInfoUpdater(tokenData)
  }
}

export const updateTokenAllowance = async (
  tokenId: TokenId,
  library: { provider: providers.Web3Provider | providers.JsonRpcProvider; address: string },
  useTokenInfoUpdater: (tokenData: TokenData) => void,
  allowanceAddress: string,
  requiredBlockNumber: number
) => {
  await waitForBlock(library.provider, requiredBlockNumber)

  const token = getToken(tokenId)
  const erc20 = new ERC20Service(library.provider, token.address)

  useTokenInfoUpdater({
    tokenId: tokenId,
    allowances: [
      { address: allowanceAddress, hasAllowance: await erc20.hasMaxAllowance(library.address, allowanceAddress) },
    ],
    balance: '',
  })
}

export const updateTokenBalance = async (
  tokenId: TokenId,
  library: { provider: providers.Web3Provider | providers.JsonRpcProvider; address: string },
  useTokenInfoUpdater: (tokenData: TokenData) => void,
  requiredBlockNumber: number
) => {
  await waitForBlock(library.provider, requiredBlockNumber)

  const token = getToken(tokenId)
  const erc20 = new ERC20Service(library.provider, token.address)

  useTokenInfoUpdater({
    tokenId: tokenId,
    allowances: [],
    balance: toTokenUnitsBN((await erc20.balanceOf(library.address)).toString(), token.decimals).toFixed(),
  })
}

export default function Updater(): null {
  const usePutTokenData = useTokenDataStore((state) => state.putTokenData)
  const useResetTokenData = useTokenDataStore((state) => state.resetTokenData)

  function useTokenInfoUpdater(): (tokenData: TokenData) => void {
    return useCallback((tokenData: TokenData) => {
      usePutTokenData(tokenData)
    }, [])
  }

  function resetTokenData(): () => void {
    return useCallback(() => {
      useResetTokenData()
    }, [])
  }

  const reset = resetTokenData()
  const tokenInfoUpdater = useTokenInfoUpdater()
  const { account, provider, chainId, isActive } = useWeb3React()

  useEffect(() => {
    if (!chainId || !account || !provider) {
      return undefined
    }
    const tokenIdsArrayInCurrentNetwork = getTokenIdsArray(chainId)

    updateTokenData(tokenIdsArrayInCurrentNetwork, { provider, address: account, network: chainId }, tokenInfoUpdater)

    const tokenDataUpdaterTimer = setInterval(() => {
      updateTokenData(tokenIdsArrayInCurrentNetwork, { provider, address: account, network: chainId }, tokenInfoUpdater)
    }, 30000)

    const tokenDataIntervalId: number = parseInt(tokenDataUpdaterTimer.toString())

    return () => {
      reset()
      clearInterval(tokenDataIntervalId)
    }
  }, [isActive, chainId, provider, account])

  return null
}
