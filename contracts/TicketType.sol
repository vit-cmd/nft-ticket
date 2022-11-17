// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./Event.sol";
import "hardhat/console.sol";

contract TicketType {
    using Counters for Counters.Counter;
    Counters.Counter private ticketTypeIDs;
    Event evt;

    constructor(address eventContractAddress_) {
        evt = Event(eventContractAddress_);
    }

    struct TicketTypeData {
        uint256 eventID;
        string name; // name of ticket class
        string description;
        string hashImage;
        uint64 currentMintTickets; // current ticket minted in this ticket class
        uint64 maxTicketCount; // maximum number of tickets in ticket class
        uint64 priceFactor; // multiply by priceUnit for real price
        bool exist;
    }

    mapping(uint256 => TicketTypeData) public ticketTypes;

    event NewTicketType(
        uint256 ticketTypeID,
        uint256 eventID,
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
        uint256 eventID_,
        string memory name_,
        string memory description_,
        string memory hashImage_,
        uint64 maxTicketCount_,
        uint64 priceFactor_
    ) external returns (uint256) {
        require(evt.isEventExist(eventID_) == true, "Event does not exist");
        require(
            evt.getApprovedEventManager(msg.sender) == true,
            "Only Event Managers are allowed to do this action"
        );
        require(
            evt.isOwnerOfEvent(eventID_) == true,
            "Only Event Owner are allowed to do this action"
        );
        uint256 currentTicketTypeID = ticketTypeIDs.current();

        ticketTypes[currentTicketTypeID] = TicketTypeData(
            eventID_,
            name_,
            description_,
            hashImage_,
            0,
            maxTicketCount_,
            priceFactor_,
            true
        );

        ticketTypeIDs.increment();

        emit NewTicketType(
            currentTicketTypeID,
            eventID_,
            name_,
            description_,
            hashImage_,
            ticketTypes[currentTicketTypeID].currentMintTickets,
            maxTicketCount_,
            priceFactor_
        );

        console.log("Create ticket type with id: ", currentTicketTypeID);

        return currentTicketTypeID;
    }

    function isTicketTypeEventExist(uint256 eventID_, uint256 ticketTypeID_)
        external
        view
        returns (bool)
    {
        if (
            ticketTypes[ticketTypeID_].exist &&
            ticketTypes[ticketTypeID_].eventID == eventID_
        ) {
            return true;
        }
        return false;
    }

    function updateCurrentMintTicket(
        uint256 ticketTypeID_,
        uint64 currentMintTickets_
    ) external {
        ticketTypes[ticketTypeID_].currentMintTickets = currentMintTickets_;
    }

    function getTicketTypeData(uint256 ticketTypeID_)
        external
        view
        returns (
            uint64 currentMintTickets,
            uint64 maxTicketCount,
            uint64 priceFactor
        )
    {
        return (
            ticketTypes[ticketTypeID_].currentMintTickets,
            ticketTypes[ticketTypeID_].maxTicketCount,
            ticketTypes[ticketTypeID_].priceFactor
        );
    }
}
