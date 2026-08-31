import { useNFTs } from '../../hooks/useNFTs'
import { useUserInfo } from '../../hooks/useUserInfo'

function Collection() {
  const { nfts, isLoading } = useNFTs()
  const { isConnected } = useUserInfo()

  if (!isConnected) {
    return (
      <div className="rounded-2xl p-8 bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/8 shadow-[0_0_30px_rgba(193,143,164,0.08)] h-full flex items-center justify-center">
        <p className="text-[#b8b8d0] text-center">Connect your wallet to view your NFT collection</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/8 shadow-[0_0_30px_rgba(193,143,164,0.08)]">
      <div className="mb-6">
        <h2 className="text-[#c18fa4] text-2xl font-bold mb-2">Your Collection</h2>
        <p className="text-[#b8b8d0] text-sm">Showcase your digital treasures</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-[#b8b8d0]">Loading your NFTs...</div>
        </div>
      ) : nfts && nfts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nfts.map((nft) => (
            <div
              key={`${nft.contractAddress}-${nft.tokenId}`}
              className="rounded-lg bg-white/5 border border-white/10 p-3 hover:border-[#c18fa4] transition"
            >
              {nft.image ? (
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full aspect-square object-cover rounded-md mb-2"
                />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-[#c18fa4] to-[#67e8f9] rounded-md mb-2 flex items-center justify-center">
                  <span className="text-white text-2xl">🎨</span>
                </div>
              )}
              <p className="text-[#b8b8d0] text-xs font-semibold truncate">{nft.name || 'Unknown'}</p>
              <p className="text-gray-500 text-xs">#{nft.tokenId.slice(0, 8)}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-[#b8b8d0]">
          <div className="text-4xl mb-2">🎨</div>
          <p>No NFTs yet</p>
          <p className="text-sm text-gray-500 mt-1">Start collecting to express yourself!</p>
        </div>
      )}
    </div>
  )
}

export default Collection
