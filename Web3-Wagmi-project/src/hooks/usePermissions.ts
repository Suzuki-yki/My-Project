import { LUMI_POSSESSIONS_ADDRESS } from "../../contracts/index";
import { useReadContract, useChainId } from "wagmi";
import { useUserInfo } from "./useUserInfo";
import { LUMI_POSSESSIONS_ABI } from "../../contracts/index";

export function usePermissions() {
    const { address: walletAddress } = useUserInfo();

     const chainId = useChainId();

     console.log("CURRENT CHAIN:", chainId);
    const { data: balance } = useReadContract({
        address: LUMI_POSSESSIONS_ADDRESS,     
        abi: LUMI_POSSESSIONS_ABI,  
        functionName: "balanceOf",
        args: [walletAddress],
    })

    const hasCharacter = balance ? balance > 0n : false;
    const canAccessPersona = hasCharacter;
    const canAccessRoom = hasCharacter;
    const canAccessCollections = hasCharacter;

    return {
        hasCharacter,
        canAccessPersona,
        canAccessRoom,
        canAccessCollections,
    }
}