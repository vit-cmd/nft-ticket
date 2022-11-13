// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.17;

// import "@openzeppelin/contracts/utils/Counters.sol";
// import "./Event.sol";

// contract TicketType {
//     using Counters for Counters.Counter;
//     Counters.Counter private ticketTypeIds;
//     address private eventContractAddress;

//     constructor(address eventContractAddress_) {
//         eventContractAddress = eventContractAddress_;
//     }

//     struct TicketTypeData {
//         uint256 eventId;
//         string name; // name of ticket class
//         string description;
//         string hashImage;
//         uint64 currentMintTickets; // current ticket minted in this ticket class
//         uint64 maxTicketCount; // maximum number of tickets in ticket class
//         uint64 priceFactor; // multiply by priceUnit for real price
//     }

//     mapping(uint256 => TicketTypeData) ticketTypes;

//     // Function

//     /**
//      * @dev Allows the Owner of event to create ticket class after create event
//      * @notice isOwnerOfEvent modifier should be invoked
//      * @notice params is id of event & data of ticket class struct
//      * @notice emit NewTicketClass after create ticket class
//      */
//     function createTicketClass(
//         uint64 eventId_,
//         string memory name_,
//         string memory description_,
//         string memory image_,
//         uint64 maxTicketCount_,
//         uint64 priceFactor_
//     ) external returns (uint256) {
//         Event events = Event(eventContractAddress);
//         require(
//             events.getApprovedEventManager(msg.sender) == true,
//             "Only Event Managers are allowed to do this action"
//         );
//         uint256 currentTicketClassId = ticketTypeIds.current();

//         ticketTypes[currentTicketClassId].name = eventId_;
//         ticketTypes[currentTicketClassId].name = name_;
//         ticketTypes[currentTicketClassId].description = description_;
//         ticketTypes[currentTicketClassId].hashImage = image_;
//         ticketTypes[currentTicketClassId].maxTicketCount = maxTicketCount_;
//         ticketTypes[currentTicketClassId].currentMintTickets = 0;
//         ticketTypes[currentTicketClassId].priceFactor = priceFactor_;
//         ticketTypeIds.increment();

//         // emit NewTicketClass(
//         //     currentTicketClassId,
//         //     name_,
//         //     maxTicketCount_,
//         //     priceFactor_
//         // );
//         return currentTicketClassId;
//     }
// }
