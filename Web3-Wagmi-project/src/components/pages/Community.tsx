import { useState } from 'react'

function Community() {
  const [communityMembers] = useState([
    { id: 1, name: 'Explorer_Soul', level: 15, vibe: 'Dreamcore Collector' },
    { id: 2, name: 'Cyber_Wanderer', level: 12, vibe: 'Anime Enthusiast' },
    { id: 3, name: 'Pink_Aesthetic', level: 8, vibe: 'Aesthetic Lover' },
  ])

  return (
    <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/8 shadow-[0_0_30px_rgba(193,143,164,0.08)] h-full">
      <div className="mb-6">
        <h2 className="text-[#c18fa4] text-2xl font-bold mb-2">Community</h2>
        <p className="text-[#b8b8d0] text-sm">Connect with other Persona collectors</p>
      </div>

      <div className="space-y-3">
        {communityMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between hover:border-[#c18fa4] transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c18fa4] to-[#67e8f9] flex items-center justify-center text-white font-semibold">
                {member.name.charAt(0)}
              </div>
              <div>
                <p className="text-[#b8b8d0] font-semibold">{member.name}</p>
                <p className="text-[#67e8f9] text-xs">{member.vibe}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#c18fa4] font-bold">Level {member.level}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Community Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-[#c18fa4]">2.5K</div>
          <p className="text-[#b8b8d0] text-xs mt-1">Members</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-[#67e8f9]">15.2K</div>
          <p className="text-[#b8b8d0] text-xs mt-1">NFTs</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-[#f9a8d4]">842</div>
          <p className="text-[#b8b8d0] text-xs mt-1">Collections</p>
        </div>
      </div>
    </div>
  )
}

export default Community
