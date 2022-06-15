import create from 'zustand'
import { TokenData } from './types'

interface TokenDataState {
  tokenInfos: TokenData[]
  putTokenData: ({ tokenId, allowances, balance }: TokenData) => void
  reset: () => void
}

export const useTokenDataStore = create<TokenDataState>()((set) => ({
  tokenInfos: [],
  putTokenData: ({ tokenId, allowances, balance }: TokenData) =>
    set((state) => ({ tokenInfos: [...state.tokenInfos, { tokenId, allowances, balance }] })),
  reset: () => set((state) => ({ tokenInfos: [] })),
}))
