// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Greeter {
    string greeting = "Hello World";

    function set(string memory greeting_) public {
        greeting = greeting_;
    }

    function get() public view returns (string memory) {
        return greeting;
    }
}
