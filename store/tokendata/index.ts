import create from 'zustand'
import produce from 'immer'
import { TokenData, defaultTokenData } from './types'

interface TokenDataState {
  tokenInfos: TokenData[]
  putTokenData: ({ tokenId, allowances, balance }: TokenData) => void
  resetTokenData: () => void
}

export const useTokenDataStore = create<TokenDataState>()((set, get) => ({
  tokenInfos: [],
  putTokenData: ({ tokenId, allowances, balance }: TokenData) =>
    set(
      produce((draft) => {
        const foundTokenId = draft.tokenInfos.findIndex((x: any) => x.tokenId === tokenId)
        if (foundTokenId !== -1) {
          if (allowances.length) {
            const token = draft.tokenInfos[foundTokenId]
            token.allowances = allowances
            draft.tokenInfos[foundTokenId] = token
          }

          if (balance !== '') {
            const token = draft.tokenInfos[foundTokenId]
            token.balance = balance
            draft.tokenInfos[foundTokenId] = token
          }
        } else {
          draft.tokenInfos.push({
            tokenId,
            allowances,
            balance,
          })
        }
      })
    ),
  resetTokenData: () => {
    set(() => ({
      tokenInfos: get().tokenInfos.map(({ tokenId }) => {
        return defaultTokenData(tokenId)
      }),
    }))
  },
}))
