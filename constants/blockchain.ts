export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const ETHEREUM_NETWORK = 1
export const POLYGON_NETWORK = 137
export const AVALANCHE_NETWORK = 43114
export const networks: { [key: number]: string } = {
  [ETHEREUM_NETWORK]: 'ethereum',
  [POLYGON_NETWORK]: 'polygon',
  [AVALANCHE_NETWORK]: 'avalanche',
}
