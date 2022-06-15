import { TokenId } from 'constants/tokens'

export interface Allowance {
  address: string
  hasAllowance: boolean
}

export interface TokenData {
  tokenId: TokenId
  balance: string
  allowances: Allowance[]
}

export const defaultTokenData = (tokenId: TokenId): TokenData => ({
  balance: '0',
  allowances: [],
  tokenId: tokenId,
})
