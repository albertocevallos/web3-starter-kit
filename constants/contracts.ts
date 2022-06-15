import { getToken, TokenId } from './tokens'
import { ZERO_ADDRESS } from './blockchain'

export interface Reward {
  address: string
  underlyingToken: TokenId
}

export type ContractId = 'example'

export const CONTRACTS: { [key in ContractId]: Reward } = {
  example: {
    address: ZERO_ADDRESS,
    underlyingToken: 'usdc',
  },
}
