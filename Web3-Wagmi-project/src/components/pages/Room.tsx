import React from 'react'
import { usePermissions  } from '../../hooks/usePermissions'

function Room(): JSX.Element {
  const { canAccessRoom } = usePermissions();
  if(!canAccessRoom) {
    return (
      <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/8 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>

          <h2 className="text-[#c18fa4] text-2xl font-bold mb-2">
            Room Locked
          </h2>

          <p className="text-[#b8b8d0]">
            You need a Character NFT to unlock your personal room.
          </p>
        </div>
      </div>
    )
  }
  return (
          <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/8 shadow-[0_0_30px_rgba(193,143,164,0.08)] h-full">
        <div className="mb-6">
          <h2 className="text-[#c18fa4] text-2xl font-bold mb-2">Your Room</h2>
          <p className="text-[#b8b8d0] text-sm">Customize your personal digital space</p>
        </div>

        <div className="space-y-4">
          {/* Placeholder Room */}
          <div className="w-full aspect-video bg-gradient-to-br from-[#c18fa4]/20 to-[#67e8f9]/20 rounded-lg border border-white/10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🏠</div>
              <p className="text-[#b8b8d0]">Your Digital Room Coming Soon!</p>
              <p className="text-gray-500 text-sm mt-1">Customize your space with NFTs and decorations</p>
            </div>
          </div>

          {/* Room Settings */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
            <h3 className="text-[#b8b8d0] font-semibold">Room Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                <span className="text-[#b8b8d0] text-sm">Background Theme</span>
                <select className="bg-white/10 border border-white/10 text-[#b8b8d0] rounded px-2 py-1 text-sm focus:outline-none">
                  <option>Dreamcore</option>
                  <option>Cyberpunk</option>
                  <option>Minimalist</option>
                  <option>Neon</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                <span className="text-[#b8b8d0] text-sm">Music</span>
                <input type="checkbox" className="w-4 h-4 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                <span className="text-[#b8b8d0] text-sm">Animations</span>
                <input type="checkbox" className="w-4 h-4 cursor-pointer" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Room
