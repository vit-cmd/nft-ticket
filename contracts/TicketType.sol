// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./Event.sol";

contract TicketType {
    using Counters for Counters.Counter;
    Counters.Counter private ticketTypeIds;
    address private eventContractAddress;

    constructor(address eventContractAddress_) {
        eventContractAddress = eventContractAddress_;
    }

    struct TicketTypeData {
        uint256 eventId;
        string name; // name of ticket class
        string description;
        string hashImage;
        uint64 currentMintTickets; // current ticket minted in this ticket class
        uint64 maxTicketCount; // maximum number of tickets in ticket class
        uint64 priceFactor; // multiply by priceUnit for real price
    }

    mapping(uint256 => TicketTypeData) ticketTypes;

    event NewTicketType(
      uint256 eventId,
      string name,
      string description,
      string hashImage,
      uint64 currentMintTickets,
      uint64 maxTicketCount,
      uint64 priceFactor
    );

    // Function

    /**
     * @dev Allows the Owner of event to create ticket type after create event
     * @notice isOwnerOfEvent modifier should be invoked
     * @notice params is id of event & data of ticket type struct
     * @notice emit NewTicketType after create ticket type
     */
    function createTicketType(
        uint64 eventId_,
        string memory name_,
        string memory description_,
        string memory hashImage_,
        uint64 maxTicketCount_,
        uint64 priceFactor_
    ) external returns (uint256) {
        Event events = Event(eventContractAddress);
        require(
            events.getApprovedEventManager(msg.sender) == true,
            "Only Event Managers are allowed to do this action"
        );
        require(
          events.isOwnerOfEvent(eventId_) == true,
          "Only Owner of Event are allowed to do this action"
        );
        uint256 currentTicketTypeId = ticketTypeIds.current();

        ticketTypes[currentTicketTypeId].eventId = eventId_;
        ticketTypes[currentTicketTypeId].name = name_;
        ticketTypes[currentTicketTypeId].description = description_;
        ticketTypes[currentTicketTypeId].hashImage = hashImage_;
        ticketTypes[currentTicketTypeId].maxTicketCount = maxTicketCount_;
        ticketTypes[currentTicketTypeId].currentMintTickets = 0;
        ticketTypes[currentTicketTypeId].priceFactor = priceFactor_;
        ticketTypeIds.increment();

        emit NewTicketType(
          eventId_,
          name_,
          description_,
          hashImage_,
          ticketTypes[currentTicketTypeId].currentMintTickets,
          maxTicketCount_,
          priceFactor_
        );
        return currentTicketTypeId;
    }
}
