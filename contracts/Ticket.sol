// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Event.sol";
import "./TicketType.sol";
import "hardhat/console.sol";

contract Ticket is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private ticketIDs;
    Event evt;
    TicketType tktType;

    constructor(
        address eventContractAddress_,
        address ticketTypeContractAddress_
    ) ERC721("TicketNFT", "TKT") {
        evt = Event(eventContractAddress_);
        tktType = TicketType(ticketTypeContractAddress_);
    }

    struct TicketData {
        uint256 eventID;
        uint256 ticketTypeID;
    }

    mapping(uint256 => TicketData) public tickets;

    event NewTicket(uint256 eventID, uint256 ticketTypeID, uint256 ticketID);
    event UpdateCurrentMintedTicketInTicketType(
        uint256 ticketTypeID,
        uint64 currentMintTickets
    );

    /**
     * @dev Function to buy ticket to specific event in primary market.
     * @param eventID_ Id of event
     * @param ticketTypeID_ Id of ticket class in that event
     * @notice Requires that the events exist.
     * @notice Requires that ticket type event exist.
     * @notice Requires that wallet has enough eth to buy ticket.
     * @notice Reverts if maximum number of ticket less than current minted ticket in ticket class.
     * @notice Reverts if ticket price is in ethereum and msg.value smaller then the ticket price.
     */
    function buyTicket(uint64 eventID_, uint64 ticketTypeID_) external payable {
        require(evt.isEventExist(eventID_) == true, "Event does not exist.");
        require(
            tktType.isTicketTypeEventExist(eventID_, ticketTypeID_) == true,
            "Ticket type event does not exist"
        );
        (
            uint64 currentMintTickets,
            uint64 maxTicketCount,
            uint64 priceFactor
        ) = tktType.getTicketTypeData(ticketTypeID_);

        uint256 currentTicketID = ticketIDs.current();

        require(
            currentMintTickets < maxTicketCount,
            "All tickets have been minted"
        );
        require(
            msg.sender.balance >= priceFactor * 1e18,
            "Please transfer some ETH to your wallet first"
        );

        _mint(msg.sender, currentTicketID);

        // update mapping tickets data
        tickets[currentTicketID].eventID = eventID_;
        tickets[currentTicketID].ticketTypeID = ticketTypeID_;

        uint64 currentMintedTicket = ++currentMintTickets;

        // update currentMintTickes in mapping ticket type
        tktType.updateCurrentMintTicket(ticketTypeID_, currentMintedTicket);
        ticketIDs.increment();

        console.log("Minted ticket with id: ", currentTicketID);

        emit NewTicket(eventID_, ticketTypeID_, currentTicketID);
        emit UpdateCurrentMintedTicketInTicketType(
            ticketTypeID_,
            currentMintedTicket
        );
    }
}
