import { NewTicketType as NewTicketTypeEvent } from "../generated/TicketType/TicketType"
import { NewTicketType } from "../generated/schema"

export function handleNewTicketType(event: NewTicketTypeEvent): void {
  let entity = new NewTicketType(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.eventId = event.params.eventId
  entity.name = event.params.name
  entity.description = event.params.description
  entity.hashImage = event.params.hashImage
  entity.currentMintTickets = event.params.currentMintTickets
  entity.maxTicketCount = event.params.maxTicketCount
  entity.priceFactor = event.params.priceFactor
  entity.save()
}
