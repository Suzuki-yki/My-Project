import React from 'react'
import { useUserInfo } from '../../../../hooks/useUserInfo'
import { useNFTs } from '../../../../hooks/useNFTs'

function SoulPanel(): JSX.Element {
  const { address, isConnected, balance, balanceSymbol, chainInfo, personaData } = useUserInfo()
  const { nfts } = useNFTs()

  return (
    <div className="rounded-2xl p-4 bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/8 shadow-[0_0_30px_rgba(193,143,164,0.08)] h-full">
      <h3 className="text-[#c18fa4] text-sm uppercase tracking-[0.2em] mb-4 opacity-70">Soul Panel</h3>

      {!isConnected ? (
        <div className="text-[#b8b8d0] text-sm">Connect wallet to see your Persona data</div>
      ) : (
        <div className="flex flex-col gap-4 text-[#b8b8d0] text-sm">
          {/* Wallet Address */}
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Wallet</div>
            <div className="text-[#67e8f9] font-medium mt-1 break-all">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
          </div>

          {/* Balance */}
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Balance</div>
            <div className="text-[#f9a8d4] font-medium mt-1">
              {parseFloat(balance).toFixed(4)} {balanceSymbol}
            </div>
          </div>

          {/* Network */}
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Network</div>
            <div className="text-[#c18fa4] font-medium mt-1">
              {chainInfo.chainName}
            </div>
          </div>

          {/* NFT Count */}
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Collection</div>
            <div className="text-[#67e8f9] font-medium mt-1">
              {nfts.length} NFTs
            </div>
          </div>

          {/* Persona */}
          {personaData && (
            <>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-xs text-gray-400 uppercase tracking-wide">Persona Level</div>
                <div className="text-[#f9a8d4] font-medium mt-1">{personaData.level}</div>
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-xs text-gray-400 uppercase tracking-wide">Vibe</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {personaData.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-[#c18fa4] text-black px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default SoulPanel
