// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './ItemManager.sol';

contract Item {
  uint public priceInWei;
  uint public pricePaid;
  uint public index;
  ItemManager parentContract;

  constructor(ItemManager _parentContract, uint _priceInWei, uint _index) public {
    parentContract = _parentContract;
    priceInWei = _priceInWei;
    index = _index;
  }

  receive() external payable {
    require(pricePaid == 0, "Item is paid already");
    require(priceInWei == msg.value, "Only full payments allowed");
    (bool success,) = address(parentContract).call{value: msg.value}(abi.encodeWithSignature('triggerPayment(uint256)', index));
    require(success, "The transaction wasn't successful, canceling...");
    pricePaid += msg.value;
  }
}
