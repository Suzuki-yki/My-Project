import { network } from "hardhat";
import fs from "fs";
import Character from "../types/CharacterIntf.js";

async function main() {
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

    //get the metadata URI for the token with ID 0 and log it to the console
    const URI = await contract.tokenURI(0);
    console.log("Metadata URI for token 0:", URI);
    
    //read the JSON file from the metadata URI
    const httpUrl = URI.replace(
        "ipfs://",
        "https://gateway.pinata.cloud/ipfs/"
    ); 
    console.log("HTTP URL for token 0 metadata:", httpUrl);

    //fetch the JSON file from the metadata URI
    const response = await fetch(httpUrl);
    console.log("HTTP response status:", response.status);

    //parse the JSON file
    const jsonData = await response.json() as Character;
    console.log("Metadata for token 0:", jsonData);

    //read the image file from the metadata URI and log the image URL to the console
    const imageURI = jsonData.image;
    console.log("Image URL for token 0:", imageURI);

    //convert the image URI to an HTTP URL and log it to the console
    const imageHttpUrl = imageURI.replace(
        "ipfs://",
        "https://gateway.pinata.cloud/ipfs/"
    );
    console.log("HTTP URL for token 0 image:", imageHttpUrl);
    
    //fetch the image file from the metadata URI and log the response status to the console
    const imageResponse = await fetch(imageHttpUrl);
    console.log("HTTP response status for token 0 image:", imageResponse.status);
}
main().catch(error => {
    console.error(error);
    process.exitCode = 1;
})