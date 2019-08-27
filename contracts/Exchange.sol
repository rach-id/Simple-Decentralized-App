pragma solidity ^0.5.8;

contract Exchange {
    
    // An item
    struct Item {
        uint id;
        string name;
        uint price;
        string description;
        address payable owner;
        bool sold;
    }

    // Objects available
    mapping(uint => Item) public items;
    
    // Store Items count
    uint public itemsCount;

    constructor () public {
        itemsCount = 0;
    }

    function add_Item (string memory _name, string memory _desc, address payable _owner, uint _price) public{
        // TODO: Add fields verifications
        // TODO: verify duplicate objects (by name) 
        Item memory  t_item = Item (itemsCount, _name, _price, _desc, _owner, false);
        items[itemsCount] = t_item;
        itemsCount++;
    }

    function buy_Item (uint _id) public {
        // TODO: Verify object exists
        // TODO: Verify if price is enough to sell
        items[_id].owner.transfer(items[_id].price); // Not sure of this will send the money...
        items[_id].sold = true;
    }
}
