import { useState } from 'react'

function Memories() {
  const [memories] = useState([
    { id: 1, date: '2026-05-26', title: 'Connected to Persona Space', description: 'Started my journey in Persona Space' },
    { id: 2, date: '2026-05-25', title: 'First NFT Collected', description: 'Added my first NFT to collection' },
  ])

  return (
    <div className="rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/8 shadow-[0_0_30px_rgba(193,143,164,0.08)] h-full">
      <div className="mb-6">
        <h2 className="text-[#c18fa4] text-2xl font-bold mb-2">Your Memories</h2>
        <p className="text-[#b8b8d0] text-sm">Moments that shaped your Persona</p>
      </div>

      <div className="space-y-3">
        {memories.map((memory) => (
          <div key={memory.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-[#c18fa4] transition">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-[#c18fa4] font-semibold">{memory.title}</h3>
              <span className="text-gray-500 text-xs">{memory.date}</span>
            </div>
            <p className="text-[#b8b8d0] text-sm">{memory.description}</p>
          </div>
        ))}
      </div>

      {memories.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-[#b8b8d0]">
          <div className="text-4xl mb-2">📝</div>
          <p>No memories yet</p>
          <p className="text-sm text-gray-500 mt-1">Your journey will be recorded here</p>
        </div>
      )}
    </div>
  )
}

export default Memories
