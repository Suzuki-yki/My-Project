import { useState } from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import WalletButton from './WalletButton'

// ===== LUMI TEMP NETWORK SWITCHER =====
import NetworkSwitcher from './NetworkSwitcher'
// ===== END =====

type HeaderProps = {
  onPageChange?: (page: string) => void
}

function Header({ onPageChange }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavigate = (page: string) => {
    onPageChange?.(page)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 bg-[rgba(15,17,23,0.65)] backdrop-blur-[20px]">

      <div className="h-18 max-w-[1800px] mx-auto px-4 md:px-8 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-6">
          <Logo />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center">
          <Navigation onNavigate={handleNavigate} />
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* ===== LUMI TEMP NETWORK SWITCHER ===== */}
          <NetworkSwitcher />
          {/* ===== END ===== */}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              <svg
                className="w-5 h-5 text-[#b8b8d0]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>

          <WalletButton />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl p-4 border border-white/8 shadow-2xl">
          <Navigation
            vertical
            onNavigate={handleNavigate}
            onMobileNavigate={() => setMobileOpen(false)}
          />
        </div>
      )}
    </header>
  )
}

export default Header