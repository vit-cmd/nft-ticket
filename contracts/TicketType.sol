// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./Event.sol";

contract TicketType {
	using Counters for Counters.Counter;
	Counters.Counter private ticketTypeIds;
	address private eventContractAddress;

	constructor(address eventContractAddress_) {
		eventContractAddress = eventContractAddress_;
	}

	struct TicketTypeData {
		string name; // name of ticket class
		string description;
		string image;
		uint64 currentMintTickets; // current ticket minted in this ticket class
		uint64 maxTicketCount; // maximum number of tickets in ticket class
		uint64 priceFactor; // multiply by priceUnit for real price
	}

	mapping(uint256 => mapping(uint256 => TicketTypeData)) listTicketTypeData;

	// Function

	/**
	 * @dev Allows the Owner of event to create ticket class after create event
	 * @notice isOwnerOfEvent modifier should be invoked
	 * @notice params is id of event & data of ticket class struct
	 * @notice emit NewTicketClass after create ticket class
	 */
	function createTicketClass(
		uint64 eventId_,
		string memory name_,
		string memory description_,
		string memory image_,
		uint64 maxTicketCount_,
		uint64 priceFactor_
	) external returns (uint256) {
		Event events = Event(eventContractAddress);
		require(
			events.getApprovedEventManager(msg.sender) == true,
			"Only Event Managers are allowed to do this action"
		);
		uint256 currentTicketClassId = ticketTypeIds.current();

		listTicketTypeData[eventId_][currentTicketClassId].name = name_;
		listTicketTypeData[eventId_][currentTicketClassId]
			.description = description_;
		listTicketTypeData[eventId_][currentTicketClassId].image = image_;
		listTicketTypeData[eventId_][currentTicketClassId]
			.maxTicketCount = maxTicketCount_;
		listTicketTypeData[eventId_][currentTicketClassId]
			.currentMintTickets = 0;
		listTicketTypeData[eventId_][currentTicketClassId]
			.priceFactor = priceFactor_;
		ticketTypeIds.increment();

		// emit NewTicketClass(
		//     currentTicketClassId,
		//     name_,
		//     maxTicketCount_,
		//     priceFactor_
		// );
		return currentTicketClassId;
	}

	function viewTicketClass(uint64 eventID_, uint64 ticketClassID_)
		external
		view
		returns (
			string memory,
			uint64,
			uint64,
			uint64
		)
	{
		return (
			listTicketTypeData[eventID_][ticketClassID_].name,
			listTicketTypeData[eventID_][ticketClassID_].currentMintTickets,
			listTicketTypeData[eventID_][ticketClassID_].maxTicketCount,
			listTicketTypeData[eventID_][ticketClassID_].priceFactor
		);
	}
}
