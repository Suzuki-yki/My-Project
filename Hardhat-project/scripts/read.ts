import { network } from "hardhat";
import fs from "fs";

async function main() {
    const { ethers } = await network.connect();

    const deploymentFile = fs.readFileSync(
        "./deployments/sepolia.json",
        "utf-8"
    );
    const deployments = JSON.parse(deploymentFile);
    const contractAddress = deployments.LumiPossessions;

    const contract = await ethers.getContractAt(
        "LumiPossessions",
        contractAddress
    )

    const owner = await contract.ownerOf(0);
    const metadataURI = await contract.tokenURI(0);
    console.log("Owner:", owner);
    console.log("Token URI:", metadataURI);
}
main().catch(error => {
    console.error(error);
    process.exitCode = 1;
})