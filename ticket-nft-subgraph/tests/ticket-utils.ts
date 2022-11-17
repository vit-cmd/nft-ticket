import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  NewTicket,
  Transfer,
  UpdateCurrentMintedTicketInTicketType
} from "../generated/Ticket/Ticket"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createNewTicketEvent(
  eventID: BigInt,
  ticketTypeID: BigInt,
  id: BigInt
): NewTicket {
  let newTicketEvent = changetype<NewTicket>(newMockEvent())

  newTicketEvent.parameters = new Array()

  newTicketEvent.parameters.push(
    new ethereum.EventParam(
      "eventID",
      ethereum.Value.fromUnsignedBigInt(eventID)
    )
  )
  newTicketEvent.parameters.push(
    new ethereum.EventParam(
      "ticketTypeID",
      ethereum.Value.fromUnsignedBigInt(ticketTypeID)
    )
  )
  newTicketEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return newTicketEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createUpdateCurrentMintedTicketInTicketTypeEvent(
  ticketTypeID: BigInt,
  currentMintTickets: BigInt
): UpdateCurrentMintedTicketInTicketType {
  let updateCurrentMintedTicketInTicketTypeEvent = changetype<
    UpdateCurrentMintedTicketInTicketType
  >(newMockEvent())

  updateCurrentMintedTicketInTicketTypeEvent.parameters = new Array()

  updateCurrentMintedTicketInTicketTypeEvent.parameters.push(
    new ethereum.EventParam(
      "ticketTypeID",
      ethereum.Value.fromUnsignedBigInt(ticketTypeID)
    )
  )
  updateCurrentMintedTicketInTicketTypeEvent.parameters.push(
    new ethereum.EventParam(
      "currentMintTickets",
      ethereum.Value.fromUnsignedBigInt(currentMintTickets)
    )
  )

  return updateCurrentMintedTicketInTicketTypeEvent
}
