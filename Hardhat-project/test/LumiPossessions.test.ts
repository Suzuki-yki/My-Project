import { network } from "hardhat";
import { expect } from "chai";

describe("LumiPossessions", () => {
    let owner :any;
    let alice :any;
    let bob :any;
    let contract :any;

    beforeEach( async () => {
        const { ethers } = await network.connect();
        [owner, alice, bob] = await ethers.getSigners();
        const factory = await ethers.getContractFactory("LumiPossessions");
        contract = await factory.deploy();
    });

    it( "Owner can mint NFTs", async () =>{
        await contract.mint(owner.address, "ipfs://bafkreiagpkhskhkk4rrxyuk4yksadnfw25joicezhkkckvdmikm36wtqwm");
        const NFTOwner = await contract.ownerOf(0);
        expect(NFTOwner).to.equal(owner.address);
    });

    it("Other users can't mint NFTs", async () => {
        await expect(contract.connect(alice).mint(alice.address, "ipfs://bafkreiagpkhskhkk4rrxyuk4yksadnfw25joicezhkkckvdmikm36wtqwm")
    ).to.be.revertedWithCustomError( contract ,"OwnableUnauthorizedAccount");
    });

    it("NFT ownership is correct", async () => {
        await contract.mint(alice.address, "ipfs://bafkreiagpkhskhkk4rrxyuk4yksadnfw25joicezhkkckvdmikm36wtqwm");
        const NFTOwner = await contract.ownerOf(0);
        expect(NFTOwner).to.equal(alice.address);
    });

    it("NFT metadata is correct", async () => {
        await contract.mint(alice.address, "ipfs://bafkreiagpkhskhkk4rrxyuk4yksadnfw25joicezhkkckvdmikm36wtqwm");
        const URI = await contract.tokenURI(0);
        expect(URI).to.equal("ipfs://bafkreiagpkhskhkk4rrxyuk4yksadnfw25joicezhkkckvdmikm36wtqwm");
    });
    it("NextTokenId++ is correct", async () => {
        await contract.mint(owner.address, "ipfs://bafkreiagpkhskhkk4rrxyuk4yksadnfw25joicezhkkckvdmikm36wtqwm")
        await contract.mint(alice.address, "ipfs://bafkreigjdcasqi3pkmnjnvfwgumicb7pbdevrk2natmxuwczcuxwcs6jw4")
        expect(await contract.tokenURI(0)).to.equal("ipfs://bafkreiagpkhskhkk4rrxyuk4yksadnfw25joicezhkkckvdmikm36wtqwm");
        expect(await contract.tokenURI(1)).to.equal("ipfs://bafkreigjdcasqi3pkmnjnvfwgumicb7pbdevrk2natmxuwczcuxwcs6jw4");
    });
});