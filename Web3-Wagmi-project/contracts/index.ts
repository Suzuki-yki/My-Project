import Lumipossessions from "../../Hardhat-project/artifacts/contracts/LumiPossessions.sol//LumiPossessions.json";
import deplomentAddress from "../../Hardhat-project/deployments/sepolia.json";

export const LUMI_POSSESSIONS_ADDRESS = deplomentAddress.LumiPossessions as `0x${string}`;

export const LUMI_POSSESSIONS_ABI = Lumipossessions.abi;