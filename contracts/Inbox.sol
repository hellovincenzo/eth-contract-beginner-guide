// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Inbox {
    string public message;

    function setMessage(string calldata initialMessage) public {
        message = initialMessage;
    }
}
