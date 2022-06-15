import { TokenId } from './tokens'
import { ZERO_ADDRESS } from './blockchain'

export interface Vault {
  address: string
  underlyingToken: TokenId
}

export type ContractId = 'example' | 'example2'

export const VAULTS: { [key in ContractId]: Vault } = {
  example: {
    address: ZERO_ADDRESS,
    underlyingToken: 'usdc',
  },
  example2: {
    address: ZERO_ADDRESS,
    underlyingToken: 'dai',
  },
}

export const CONTRACTS = {
  multicall: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
}
