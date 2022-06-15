import create from 'zustand'
import { TokenData, defaultTokenData } from './types'

interface TokenDataState {
  tokenInfos: TokenData[]
  putTokenData: ({ tokenId, allowances, balance }: TokenData) => void
  reset: () => void
}

export const useTokenDataStore = create<TokenDataState>()((set, get) => ({
  tokenInfos: [],
  putTokenData: ({ tokenId, allowances, balance }: TokenData) => {
    const tokens = get()
    const foundTokenId = tokens.tokenInfos.findIndex((x) => x.tokenId === tokenId)
    if (foundTokenId !== -1) {
      if (allowances.length) {
        const token = tokens.tokenInfos[foundTokenId]
        token.allowances = allowances
        tokens.tokenInfos[foundTokenId] = token
      }

      if (balance !== '') {
        const token = tokens.tokenInfos[foundTokenId]
        token.balance = balance
        tokens.tokenInfos[foundTokenId] = token
      }
    } else {
      set((state) => ({ tokenInfos: [...state.tokenInfos, { tokenId, allowances, balance }] }))
    }
  },
  reset: () => {
    const tokens = get()

    set(() => ({
      tokenInfos: tokens.tokenInfos.map(({ tokenId }) => {
        return defaultTokenData(tokenId)
      }),
    }))
  },
}))
