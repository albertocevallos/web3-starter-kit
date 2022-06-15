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
