import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],

  connectors: [
    injected(),
    metaMask(),
  ],

  transports: {
    [mainnet.id]: http('https://ethereum-rpc.publicnode.com'),

    [sepolia.id]: http(
      import.meta.env.VITE_ALCHEMY_SEPOLIA_URL,
    ),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}