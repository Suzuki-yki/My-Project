//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

contract LumiMarketplace {
    struct Listing {
        address nftContract;
        uint256 tokenId;
        uint256 price;
        address seller;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    function listItem(address nftContract, uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than zero");

        listings[nftContract][tokenId] = Listing({
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            seller: msg.sender
        });
    }

    function cancelListing(address nftContract, uint256 tokenId) external {
        Listing storage listingItem = listings[nftContract][tokenId];
        require(listingItem.seller == msg.sender, "Not the seller");

        delete listings[nftContract][tokenId];
    }

    function buyItem(address nftContract, uint256 tokenId) external payable {
        Listing storage listingItem = listings[nftContract][tokenId];
        require(listingItem.seller != address(0), "Listing not found");
        require(msg.value >= listingItem.price, "Insufficient payment");

        delete listings[nftContract][tokenId];
    }
}