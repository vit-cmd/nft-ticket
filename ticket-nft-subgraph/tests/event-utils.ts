// import { newMockEvent } from "matchstick-as";
// import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";
// import { NewEvent, OwnershipTransferred } from "../generated/Event/Event";

// export function createNewEventEvent(
//   eventId: BigInt,
//   name: string,
//   location: string,
//   description: string,
//   image: string,
//   eventManager: Address,
//   priceUnit: BigInt,
//   startDay: BigInt,
//   endDay: BigInt
// ): NewEvent {
//   let newEventEvent = changetype<NewEvent>(newMockEvent());

//   newEventEvent.parameters = new Array();

//   newEventEvent.parameters.push(
//     new ethereum.EventParam(
//       "eventId",
//       ethereum.Value.fromUnsignedBigInt(eventId)
//     )
//   );
//   newEventEvent.parameters.push(
//     new ethereum.EventParam("name", ethereum.Value.fromString(name))
//   );
//   newEventEvent.parameters.push(
//     new ethereum.EventParam("location", ethereum.Value.fromString(location))
//   );
//   newEventEvent.parameters.push(
//     new ethereum.EventParam(
//       "description",
//       ethereum.Value.fromString(description)
//     )
//   );
//   newEventEvent.parameters.push(
//     new ethereum.EventParam("image", ethereum.Value.fromString(image))
//   );
//   newEventEvent.parameters.push(
//     new ethereum.EventParam(
//       "eventManager",
//       ethereum.Value.fromAddress(eventManager)
//     )
//   );
//   newEventEvent.parameters.push(
//     new ethereum.EventParam(
//       "priceUnit",
//       ethereum.Value.fromUnsignedBigInt(priceUnit)
//     )
//   );
//   newEventEvent.parameters.push(
//     new ethereum.EventParam(
//       "startDay",
//       ethereum.Value.fromUnsignedBigInt(startDay)
//     )
//   );
//   newEventEvent.parameters.push(
//     new ethereum.EventParam("endDay", ethereum.Value.fromUnsignedBigInt(endDay))
//   );

//   return newEventEvent;
// }

// export function createOwnershipTransferredEvent(
//   previousOwner: Address,
//   newOwner: Address
// ): OwnershipTransferred {
//   let ownershipTransferredEvent = changetype<OwnershipTransferred>(
//     newMockEvent()
//   );

//   ownershipTransferredEvent.parameters = new Array();

//   ownershipTransferredEvent.parameters.push(
//     new ethereum.EventParam(
//       "previousOwner",
//       ethereum.Value.fromAddress(previousOwner)
//     )
//   );
//   ownershipTransferredEvent.parameters.push(
//     new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
//   );

//   return ownershipTransferredEvent;
// }
