import {
  NewTicket,
  UpdateCurrentMintedTicketInTicketType,
} from '../generated/Ticket/Ticket';
import { Ticket, TicketType } from '../generated/schema';

export function handleNewTicket(event: NewTicket): void {
  let entity = new Ticket(event.params.ticketID.toString());
  entity.eventID = event.params.eventID;
  entity.ticketTypeID = event.params.ticketTypeID;
  entity.ticketType = event.params.ticketTypeID.toString();
  entity.save();
}

export function handleUpdateCurrentMintedTicketInTicketType(
  event: UpdateCurrentMintedTicketInTicketType
): void {
  let entity = new TicketType(event.params.ticketTypeID.toString());
  entity.currentMintTickets = event.params.currentMintTickets;
  entity.save();
}
