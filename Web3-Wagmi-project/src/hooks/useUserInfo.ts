import { useAccount, useBalance, useChainId } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { formatUnits } from 'viem'

export interface ChainInfo {
  chainId: number
  chainName: string
  nativeSymbol: string
}

export function useUserInfo() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { data: balanceData } = useBalance({
    address: address,
  })

  // Map chain ID to chain info
  const getChainInfo = (id: number): ChainInfo => {
    const chainMap: Record<number, ChainInfo> = {
      1: { chainId: 1, chainName: 'Ethereum Mainnet', nativeSymbol: 'ETH' },
      11155111: { chainId: 11155111, chainName: 'Sepolia Testnet', nativeSymbol: 'ETH' },
    }
    return chainMap[id] || { chainId: id, chainName: 'Unknown', nativeSymbol: 'ETH' }
  }

  const { data: personaData } = useQuery({
    queryKey: ['persona', address],
    queryFn: async () => {
      if (!address) return null

      // This would be replaced with actual persona analysis
      // based on user's NFT collection and behavior
      return {
        level: 1,
        tags: ['Newcomer', 'Collector'],
        personalityScore: {
          style: 'Minimalist',
          vibe: 'Curious',
          aesthetic: 'Modern',
        },
      }
    },
    enabled: isConnected && !!address,
  })

  return {
    address,
    isConnected,
    balance: balanceData ? formatUnits(balanceData.value, balanceData.decimals) : '0',
    balanceSymbol: balanceData?.symbol || 'ETH',
    chainInfo: getChainInfo(chainId),
    personaData,
  }
}
