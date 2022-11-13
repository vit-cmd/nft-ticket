// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Ticket {
    using Counters for Counters.Counter;
    Counters.Counter private ticketIds;
    struct TicketData {
        uint256 eventId;
        uint256 ticketCategoryId;
    }

    mapping(uint256 => TicketData) tickets;
}
