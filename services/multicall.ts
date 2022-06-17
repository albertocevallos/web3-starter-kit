import { network } from 'connectors/network'
import { CONTRACTS } from 'constants/contracts'
import { BigNumber, Contract, ethers } from 'ethers'
import { getMulticallAddress } from 'utils/address'

const multicallAbi = [
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            name: 'target',
            type: 'address',
          },
          {
            name: 'callData',
            type: 'bytes',
          },
        ],
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      {
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        name: 'returnData',
        type: 'bytes[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

type MulticallTypes = 'erc20' | 'swapPool'
const multicallAbis: { [key in MulticallTypes]: any[] } = {
  erc20: [
    'function balanceOf(address marketMaker) external view returns (uint256)',
    'function allowance(address owner, address spender) external view returns (uint256)',
  ],
  swapPool: [
    'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
    'function totalSupply() external view returns (uint256)',
  ],
}

interface PreparedCalls {
  address: string
  name: string
  encodedData: string
  multicallType: MulticallTypes
}

interface CallResponses {
  address: string
  name: string
  parsedData: any
  multicallType: MulticallTypes
}

export class MulticallService {
  private contract: Contract
  private preparedCalls: PreparedCalls[] = []

  constructor(provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider, network: number) {
    this.contract = new ethers.Contract(getMulticallAddress(network), multicallAbi, provider)
  }

  balanceOf = (contractAddress: string, owner: string): any => {
    const itf = new ethers.utils.Interface(multicallAbis.erc20)
    this.preparedCalls.push({
      name: 'balanceOf',
      address: contractAddress.toLowerCase(),
      encodedData: itf.encodeFunctionData('balanceOf', [owner]),
      multicallType: 'erc20',
    })
  }

  allowance = (contractAddress: string, owner: string, spender: string): any => {
    const itf = new ethers.utils.Interface(multicallAbis.erc20)
    this.preparedCalls.push({
      name: 'allowance',
      address: contractAddress.toLowerCase(),
      encodedData: itf.encodeFunctionData('allowance', [owner, spender]),
      multicallType: 'erc20',
    })
  }

  poolTotalSupply = (poolAddress: string): any => {
    const itf = new ethers.utils.Interface(multicallAbis.swapPool)
    this.preparedCalls.push({
      name: 'poolTotalSupply',
      address: poolAddress.toLowerCase(),
      encodedData: itf.encodeFunctionData('totalSupply'),
      multicallType: 'swapPool',
    })
  }

  poolGetReserves = (poolAddress: string): any => {
    const itf = new ethers.utils.Interface(multicallAbis.swapPool)
    this.preparedCalls.push({
      name: 'poolTotalSupply',
      address: poolAddress.toLowerCase(),
      encodedData: itf.encodeFunctionData('getReserves'),
      multicallType: 'swapPool',
    })
  }

  execute = async (): Promise<{ blockNumber: BigNumber; result: CallResponses[] }> => {
    const calldata = this.preparedCalls.map(({ address, encodedData }) => [address, encodedData])
    const { blockNumber, returnData } = await this.contract.aggregate(calldata)

    let result: CallResponses[] = []
    for (let i = 0; i < this.preparedCalls.length; i++) {
      const preparedCall = this.preparedCalls[i]
      const itf = new ethers.utils.Interface(multicallAbis[preparedCall.multicallType])
      result.push({
        address: preparedCall.address,
        name: preparedCall.name,
        parsedData: itf.decodeFunctionResult(preparedCall.name, returnData[i]),
        multicallType: preparedCall.multicallType,
      })
    }
    this.preparedCalls = []
    return { blockNumber, result }
  }
}
