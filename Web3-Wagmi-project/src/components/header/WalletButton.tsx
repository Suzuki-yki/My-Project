import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [showWallets, setShowWallets] = useState(false)

  const handleConnect = (connector: typeof connectors[0]) => {
    connect({ connector })
    setShowWallets(false)
  }

  const handleDisconnect = () => {
    disconnect()
    setShowWallets(false)
  }

  const getWalletDisplayName = (connectorId: string): string => {
    const names: Record<string, string> = {
      'injected': 'MetaMask',
      'metaMask': 'MetaMask',
      'walletConnect': 'WalletConnect',
      'coinbaseWallet': 'Coinbase Wallet',
    }
    return names[connectorId] || connectorId.charAt(0).toUpperCase() + connectorId.slice(1)
  }

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowWallets(!showWallets)}
          className="flex items-center justify-center h-9 px-4 rounded-2xl text-sm md:text-base font-semibold bg-gradient-to-r from-pink-300 to-[#6d4253] hover:scale-105 transition text-white"
        >
          {address.slice(0, 6)}...{address.slice(-4)}
        </button>
        {showWallets && (
          <div className="absolute top-12 right-0 bg-[rgba(15,17,23,0.95)] backdrop-blur-md border border-white/10 rounded-lg p-2 z-50 min-w-max shadow-lg">
            <button
              onClick={handleDisconnect}
              className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 rounded transition"
            >
              ✕ Disconnect
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowWallets(!showWallets)}
        className="flex items-center justify-center h-9 px-4 rounded-2xl text-sm md:text-base font-semibold bg-gradient-to-r from-pink-300 to-[#6d4253] hover:scale-105 transition text-white"
      >
        Enter Space
      </button>
      {showWallets && (
        <div className="absolute top-12 right-0 bg-[rgba(15,17,23,0.95)] backdrop-blur-md border border-white/10 rounded-lg p-2 z-50 min-w-max shadow-lg">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => handleConnect(connector)}
              className="block w-full text-left px-4 py-2 text-sm text-[#b8b8d0] hover:bg-white/5 rounded transition whitespace-nowrap"
            >
              🔗 {getWalletDisplayName(connector.id)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default WalletButton