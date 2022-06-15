import { providers } from 'ethers'

export type TransactionReceipt = providers.TransactionReceipt

export interface TransactionInfo {
  finished: Promise<TransactionReceipt>
  hash: string
}

export const createTransactionInfo = (provider: any, txObject: any): TransactionInfo => {
  return {
    finished: provider.waitForTransaction(txObject.hash),
    hash: txObject.hash,
  }
}
