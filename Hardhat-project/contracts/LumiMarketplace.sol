//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

contract LumiMarketplace{

    struct listing {
        address nftcontract;
        uint256 tokenId;
        uint256 price;
        address seller;
    }

    mapping(address => mapping(uint256 => listing)) public Listings;
    //1.Create listings
    
    function listItem(address seller, uint256 price) external {
        require(seller == msg.sender, "Your are not Owner");
        listings[1] = Listing(msg.sender, price);
    }

    //2.Cancel listings
    function cancelListings(uint256 tokenId) external {

    }

    //Buy NFT and delect listings
    function buyItem( uint256 tokenId ) external {

    }
}