import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { NewTicketType } from "../generated/TicketType/TicketType"

export function createNewTicketTypeEvent(
  eventId: BigInt,
  name: string,
  description: string,
  hashImage: string,
  currentMintTickets: BigInt,
  maxTicketCount: BigInt,
  priceFactor: BigInt
): NewTicketType {
  let newTicketTypeEvent = changetype<NewTicketType>(newMockEvent())

  newTicketTypeEvent.parameters = new Array()

  newTicketTypeEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  newTicketTypeEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  newTicketTypeEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  newTicketTypeEvent.parameters.push(
    new ethereum.EventParam("hashImage", ethereum.Value.fromString(hashImage))
  )
  newTicketTypeEvent.parameters.push(
    new ethereum.EventParam(
      "currentMintTickets",
      ethereum.Value.fromUnsignedBigInt(currentMintTickets)
    )
  )
  newTicketTypeEvent.parameters.push(
    new ethereum.EventParam(
      "maxTicketCount",
      ethereum.Value.fromUnsignedBigInt(maxTicketCount)
    )
  )
  newTicketTypeEvent.parameters.push(
    new ethereum.EventParam(
      "priceFactor",
      ethereum.Value.fromUnsignedBigInt(priceFactor)
    )
  )

  return newTicketTypeEvent
}
