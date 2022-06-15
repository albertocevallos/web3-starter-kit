import { Contract, ethers } from 'ethers'
import { BigNumber } from 'ethers'
import { createTransactionInfo, TransactionInfo } from './transactionInfo'

const erc20Abi = [
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function balanceOf(address marketMaker) external view returns (uint256)',
]

export class ERC20Service {
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
  contract: Contract

  constructor(provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider, contractAddress: string) {
    this.provider = provider
    const signer: ethers.providers.JsonRpcSigner = provider.getSigner()
    this.contract = new ethers.Contract(contractAddress, erc20Abi, provider).connect(signer)
  }

  /**
   * @returns The allowance given by `owner` to `spender`.
   */
  allowance = async (owner: string, spender: string): Promise<BigNumber> => {
    return this.contract.allowance(owner, spender)
  }
  /**
   * Approve `spender` to transfer an "unlimited" amount of tokens on behalf of the connected user.
   */
  approveUnlimited = async (spender: string): Promise<TransactionInfo> => {
    const transactionObject = await this.contract.approve(spender, ethers.constants.MaxUint256)
    return createTransactionInfo(this.provider, transactionObject)
  }

  balanceOf = async (owner: string): Promise<BigNumber> => {
    return await this.contract.balanceOf(owner)
  }

  hasMaxAllowance = async (owner: string, spender: string): Promise<boolean> => {
    const allowance: BigNumber = await this.contract.allowance(owner, spender)
    return allowance.gte(BigNumber.from('0xffffffffffffffffffffffff')) // some erc20 implementations do not cope with MaxUint256 well
  }
}
