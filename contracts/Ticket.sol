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
        bool forSale;
        uint64 price;
    }

    mapping(uint256 => TicketData) public tickets;

    event NewTicket(
        uint256 eventID,
        uint256 ticketTypeID,
        uint256 ticketID,
        address owner
    );
    event TicketForSale(address by, uint256 ticketID, uint64 price);
    event TicketSaleCancelled(address by, uint256 ticketID);
    event TicketSold(address by, address to, uint256 ticketID, uint64 price);
    event TicketPriceChanged(address by, uint256 ticketID, uint64 price);
    event UpdateCurrentMintedTicketInTicketType(
        uint256 ticketTypeID,
        uint64 currentMintTickets
    );

    /**
     * @dev check if the function caller is the ticket owner
     */
    modifier isTicketOwner(uint256 ticketID_) {
        require((ownerOf(ticketID_) == msg.sender), "You're not owner");
        _;
    }

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
            uint64 price
        ) = tktType.getTicketTypeData(ticketTypeID_);

        uint256 currentTicketID = ticketIDs.current();

        require(
            currentMintTickets < maxTicketCount,
            "All tickets have been minted"
        );
        console.log(msg.value);
        console.log(price * 1e15);
        require(
            msg.value >= price * 1e15,
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

        emit NewTicket(eventID_, ticketTypeID_, currentTicketID, msg.sender);
        emit UpdateCurrentMintedTicketInTicketType(
            ticketTypeID_,
            currentMintedTicket
        );
    }

    /**
     * @dev buy request for a ticket available on secondary market (callable from any approved account/contract)
     */
    function buyTicketFromAttendee(uint256 ticketID_) external payable {
        require(tickets[ticketID_].forSale == true, "Ticket not for sale");
        uint64 _priceToPay = tickets[ticketID_].price;
        address payable _seller = payable(ownerOf(ticketID_));
        require((msg.value >= _priceToPay * 1e18), "Not enough money");

        // pay the seller (price - fee)
        _seller.transfer(_priceToPay);

        emit TicketSold(_seller, msg.sender, ticketID_, _priceToPay);
        safeTransferFrom(_seller, msg.sender, ticketID_);
        tickets[ticketID_].forSale = false;
    }

    /**
     * @dev Set ticket for sale and set price
     */
    function setTicketForSale(uint256 ticketID_, uint64 price_)
        external
        isTicketOwner(ticketID_)
    {
        tickets[ticketID_].forSale = true;
        tickets[ticketID_].price = price_;
        emit TicketForSale(msg.sender, ticketID_, price_);
    }

    /**
     * @dev set individual ticket price
     */
    function setTicketPrice(uint256 ticketID_, uint64 price_)
        public
        isTicketOwner(ticketID_)
    {
        tickets[ticketID_].price = price_;
        emit TicketPriceChanged(msg.sender, ticketID_, price_);
    }

    function cancelTicketSale(uint256 ticketID_)
        external
        isTicketOwner(ticketID_)
    {
        tickets[ticketID_].forSale = false;
        emit TicketSaleCancelled(msg.sender, ticketID_);
    }
}
