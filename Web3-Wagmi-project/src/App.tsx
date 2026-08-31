import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { useState } from 'react'
import { config } from './wagmi'
import Header from "./components/header/Header"
import Main from "./components/main/Main.tsx"

const queryClient = new QueryClient()

function AppContent() {
  const [currentPage, setCurrentPage] = useState('Room')

  return (
    <div className="min-h-screen bg-[#0f1117] text-[#b8b8d0] overflow-hidden">
      <Header onPageChange={setCurrentPage}  />
      <main className="w-full px-4 md:px-8 xl:px-16 pt-28 pb-8">
        <Main currentPage={currentPage} />
      </main>
    </div>
  )
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AppContent />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App