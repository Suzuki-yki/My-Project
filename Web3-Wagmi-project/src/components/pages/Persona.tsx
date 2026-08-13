import React from 'react'
import { useUserInfo } from '../../hooks/useUserInfo'

function Persona(): JSX.Element {
  const { personaData, isConnected } = useUserInfo()

  if (!isConnected) {
    return (
      <div className="rounded-2xl p-8 bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/8 shadow-[0_0_30px_rgba(193,143,164,0.08)] h-full flex items-center justify-center">
        <p className="text-[#b8b8d0] text-center">Connect your wallet to view your Persona</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/8 shadow-[0_0_30px_rgba(193,143,164,0.08)]">
      <div className="mb-6">
        <h2 className="text-[#c18fa4] text-2xl font-bold mb-2">Your Persona</h2>
        <p className="text-[#b8b8d0] text-sm">Express your digital identity</p>
      </div>

      {personaData ? (
        <div className="space-y-6">
          {/* Level */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#b8b8d0]">Persona Level</span>
              <span className="text-3xl font-bold text-[#c18fa4]">{personaData.level}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#c18fa4] to-[#67e8f9] h-2 rounded-full"
                style={{ width: `${Math.min(personaData.level * 10, 100)}%` }}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-[#b8b8d0] font-semibold mb-3">Your Vibes</h3>
            <div className="flex flex-wrap gap-2">
              {personaData.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gradient-to-r from-[#c18fa4] to-[#f9a8d4] text-black text-sm px-3 py-1 rounded-full font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Personality */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
            <h3 className="text-[#b8b8d0] font-semibold">Personality Score</h3>
            {Object.entries(personaData.personalityScore).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-[#b8b8d0] text-sm capitalize">{key}</span>
                <span className="text-[#67e8f9] font-semibold">{value}</span>
              </div>
            ))}
          </div>

          {/* Growth Tip */}
          <div className="bg-gradient-to-r from-[#c18fa4] to-[#f9a8d4] rounded-lg p-4">
            <p className="text-black/90 font-semibold">✨ Keep growing!</p>
            <p className="text-black/80 text-sm mt-1">Collect more NFTs and interact to level up your Persona.</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-[#b8b8d0]">Loading your Persona data...</p>
        </div>
      )}
    </div>
  )
}

export default Persona
