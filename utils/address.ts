import { CONTRACTS, Address } from 'constants/contracts'

export const getAddress = (address: Address, network: number): string => {
  return address[network || 1]
}

export const getMulticallAddress = (network: number) => {
  return getAddress(CONTRACTS.multicall, network)
}
