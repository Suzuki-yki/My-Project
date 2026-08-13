import { useAccount } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { LUMI_POSSESSIONS_ADDRESS } from '../../contracts'

export interface NFTAttribute {
  trait_type: string
  value: string
}

export interface NFT {
  tokenId: string
  contractAddress: string
  name: string
  image: string
  attributes: NFTAttribute[]
}

function convertIpfsUrl(url: string): string {
  if (!url) return ''
  const gateway = 'https://silver-selected-catshark-130.mypinata.cloud/ipfs/'
  if (url.startsWith('ipfs://')) {
    return gateway + url.replace('ipfs://', '')
  }
  if (url.includes('ipfs.io/ipfs/')) {
    return gateway + url.split('/ipfs/')[1]
  }
  return url
}

async function fetchLumiNFTs(address: string): Promise<NFT[]> {
  const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY
  const url = `https://eth-sepolia.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&contractAddresses[]=${LUMI_POSSESSIONS_ADDRESS}&withMetadata=true`

  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch NFTs')

  const data = await response.json()

  return data.ownedNfts.map((nft: any) => ({
    tokenId: nft.tokenId,
    contractAddress: LUMI_POSSESSIONS_ADDRESS,
    name: nft.name ?? 'Unknown',
    image: convertIpfsUrl(nft.image?.cachedUrl ?? nft.image?.originalUrl ?? ''),
    attributes: nft.raw?.metadata?.attributes ?? [],
  }))
}

export function useNFTs() {
  const { address, isConnected } = useAccount()

  const { data: nfts, isLoading, error } = useQuery({
    queryKey: ['lumiNFTs', address],
    queryFn: () => fetchLumiNFTs(address!),
    enabled: isConnected && !!address,
  })

  return { nfts: nfts ?? [], isLoading, error }
}