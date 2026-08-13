import { network } from "hardhat";
import fs from "fs";

async function main() {
    //connect  to the network(sepolia)
    const { ethers } = await network.connect();

    //get the contract address from the deployment file
    const deploymentFile = fs.readFileSync(
        "./deployments/sepolia.json",
        "utf-8"
    );
    const deployments = JSON.parse(deploymentFile);
    const contractAddress = deployments.LumiPossessions;

    //get the contract instance
    const contract = await ethers.getContractAt(
        "LumiPossessions",
        contractAddress
    );

    //mint an NFT to the specified address with the specified metadata URI
    const tx = await contract.mint(
        "0xCeA00836d29B5756345c93E2bcb88778d5D0F789",
        "ipfs://bafkreiagpkhskhkk4rrxyuk4yksadnfw25joicezhkkckvdmikm36wtqwm"
    );

    //wait for the transaction to be mined and log the transaction hash
    await tx.wait();
    console.log(
        "Transaction Hash:",
        tx.hash
    );
}
main().catch(error => {
    console.error(error);
    process.exitCode = 1;
})