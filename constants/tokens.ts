import { ZERO_ADDRESS } from './blockchain'
import { CONTRACTS } from './contracts'

export interface Token {
  symbol: string
  name: string
  address: string
  decimals: number
  displayedDecimals: number
}
/*
* IMPORTANT: Add all token used by the dapp
/*/
export type TokenId = 'eth' | 'usdc' | 'usdt' | 'dai'

/*
* IMPORTANT: Add metadata for token Ids, they must match
/*/
const tokens: { [key in TokenId]: Token } = {
  eth: {
    symbol: 'ETH',
    name: 'Ethereum',
    address: ZERO_ADDRESS,
    decimals: 18,
    displayedDecimals: 4,
  },
  usdc: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
    displayedDecimals: 2,
  },
  usdt: {
    symbol: 'USDT',
    name: 'Tether',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    decimals: 6,
    displayedDecimals: 2,
  },
  dai: {
    symbol: 'DAI',
    name: 'Maker DAO',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    decimals: 18,
    displayedDecimals: 2,
  },
}

export const tokensArray: Token[] = Object.values(tokens)

export const tokenIdsArray: TokenId[] = Object.keys(tokens) as TokenId[]

export const getToken = (tokenId: TokenId): Token => tokens[tokenId]

export const getTokens = (tokenIds: TokenId[]): Token[] => tokenIds.map((id) => tokens[id])

export const getTokenId = (address: string): TokenId | undefined =>
  tokenIdsArray.find((t) => tokens[t].address.toLowerCase() === address.toLowerCase())

export const getAllowanceAddresses = (tokenId: TokenId): string[] => {
  const main = Object.values(CONTRACTS)
    .filter((x) => x.underlyingToken === tokenId)
    .map((x) => x.address)

  return main
}
