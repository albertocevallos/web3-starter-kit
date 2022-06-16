import MetaMaskIcon from 'assets/icons/metamask.svg'
import WalletConnectIcon from 'assets/icons/walletconnect.svg'
import CoinbaseIcon from 'assets/icons/coinbase.svg'
import GnosisSafeIcon from 'assets/icons/gnosissafe.svg'

export interface Wallet {
  name: string
  icon: any
  component: string
}

export type WalletId = 'metamask' | 'walletConnect' | 'gnosisSafe' | 'coinbase'

/*
 * Supported wallet
 */

const wallets: { [key in WalletId]: Wallet } = {
  metamask: {
    name: 'MetaMask',
    icon: MetaMaskIcon,
    component: 'METAMASK',
  },
  walletConnect: {
    name: 'WalletConnect',
    icon: WalletConnectIcon,
    component: 'WALLET_CONNECT',
  },
  gnosisSafe: {
    name: 'Gnosis Safe',
    icon: GnosisSafeIcon,
    component: 'GNOSIS_SAFE',
  },
  coinbase: {
    name: 'Coinbase Wallet',
    icon: CoinbaseIcon,
    component: 'COINBASE_WALLET',
  },
}

export const walletsArray: Wallet[] = Object.values(wallets)
