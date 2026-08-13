import { network } from "hardhat";

async function main() {

    const { ethers } = await network.connect();

    const LumiNFT = await ethers.deployContract("LumiPossessions");

    await LumiNFT.waitForDeployment();

    console.log("Contract deployed to:", await LumiNFT.getAddress());
}
main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});