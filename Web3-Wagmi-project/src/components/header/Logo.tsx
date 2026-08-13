import React from 'react'

type Props = { onClick?: () => void }

function Logo({ onClick }: Props): JSX.Element {
  return (
    <div onClick={onClick} className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform">
      <img src="/logo.png" alt="LUMI logo" className="h-12 w-12 rounded-full border border-zinc-700" />
      <h1 className="text-[#c18fa4] text-xl md:text-2xl font-bold font-serif italic transition group-hover:text-[#6d4253]">LUMI</h1>
    </div>
  )
}

export default Logo