pragma solidity ^0.5.8;

contract Exchange {

  // An item
  struct Item {
    uint id;
    string name;
    string description;
    uint price;
    address payable owner;
    bool sold;
  }

  // Objects available
  mapping(uint => Item) public items;

  // Store Items count
  uint public itemsCount;

  constructor () public {
    add_Item ("Item1", "Desc1", 0x8FB973565A620DB066B5791c42F84eCe8256e258, 20);
    itemsCount = 1;
  }

  function add_Item (string memory _name, string memory _desc, address payable _owner, uint _price) public{
    // TODO: Add fields verifications
    // TODO: verify duplicate objects (by name)
    Item memory  t_item = Item (itemsCount, _name, _desc, _price, _owner, false);
    items[itemsCount] = t_item;
    itemsCount++;
  }

  function buy_Item (uint _id) payable public {
    // TODO: Verify object exists
    require(_id < itemsCount);
    require(0 <= _id);
    // TODO: Verify if price is enough to sell
    items[_id].owner.transfer(items[_id].price); // Not sure of this will send the money...
    items[_id].sold = true;
  }
}
