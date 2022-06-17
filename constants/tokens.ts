import { ZERO_ADDRESS } from './blockchain'
import { VAULTS } from './contracts'
import { ETHEREUM_NETWORK, AVALANCHE_NETWORK } from './blockchain'

export interface Token {
  symbol: string
  name: string
  address: string
  decimals: number
  displayedDecimals: number
  network: number
}
/*
* IMPORTANT: Add all token used by the dapp
/*/
export type TokenId = 'eth' | 'usdc' | 'usdt' | 'dai' | 'usdte'

/*
* IMPORTANT: Add metadata for token Ids, they must match
/*/
const tokens: { [key in TokenId]: Token } = {
  // ETHEREUM
  eth: {
    symbol: 'ETH',
    name: 'Ethereum',
    address: ZERO_ADDRESS,
    decimals: 18,
    displayedDecimals: 4,
    network: ETHEREUM_NETWORK,
  },
  usdc: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
    displayedDecimals: 2,
    network: ETHEREUM_NETWORK,
  },
  usdt: {
    symbol: 'USDT',
    name: 'Tether',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    decimals: 6,
    displayedDecimals: 2,
    network: ETHEREUM_NETWORK,
  },
  dai: {
    symbol: 'DAI',
    name: 'Maker DAO',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    decimals: 18,
    displayedDecimals: 2,
    network: ETHEREUM_NETWORK,
  },
  // AVALANCHE
  usdte: {
    symbol: 'USDT.e',
    name: 'Tether',
    address: '0xc7198437980c041c805a1edcba50c1ce5db95118',
    decimals: 6,
    displayedDecimals: 2,
    network: AVALANCHE_NETWORK,
  },
}

export const tokensArray: Token[] = Object.values(tokens)

export const tokenIdsArray: TokenId[] = Object.keys(tokens) as TokenId[]

export const getToken = (tokenId: TokenId): Token => tokens[tokenId]

export const getTokens = (tokenIds: TokenId[]): Token[] => tokenIds.map((id) => tokens[id])

export const getTokenId = (address: string): TokenId | undefined =>
  tokenIdsArray.find((t) => tokens[t].address.toLowerCase() === address.toLowerCase())

export const getAllowanceAddresses = (tokenId: TokenId): string[] => {
  const main = Object.values(VAULTS)
    .filter((x) => x.underlyingToken === tokenId)
    .map((x) => x.address)
  return main
}

export const getTokenIdsArray = (network: number) => {
  let _tokensIds: TokenId[] = []
  tokenIdsArray.map((row, index) => {
    if (tokensArray[index].network === network) {
      _tokensIds = [..._tokensIds, row]
    }
  })
  return _tokensIds
}
