//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LumiPossessions is ERC721URIStorage, Ownable {
    uint256 private nextTokenId;
    constructor()
    ERC721("Lumi Possessions","LMPoss")
    Ownable(msg.sender)    
    {}

    function mint(address to, string memory metadataURI) public onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
        nextTokenId++;
    }
}