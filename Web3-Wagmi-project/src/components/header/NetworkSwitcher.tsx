import { useChainId, useSwitchChain} from 'wagmi'

function NetworkSwitcher() {
    const chainId = useChainId()
    const {switchChain} = useSwitchChain()

    return(
        <button onClick={() => switchChain({ chainId: chainId === 1 ? 11155111 : 1,})}
        className="px-4 py-2 rounded-3xl bg-[#1a1a22] text-[#b8b8d0] border border-pink-300 hover:bg-[#2a2a35] transition">
        {chainId === 1 ? 'Switch to Sepolia' : 'Switch to Mainnet'}
        </button>
    )

}

export default NetworkSwitcher