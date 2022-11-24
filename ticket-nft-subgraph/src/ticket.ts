import {
  NewTicket,
  TicketForSale,
  TicketPriceChanged,
  TicketSaleCancelled,
  TicketSold,
  Transfer as TransferEvent,
} from '../generated/Ticket/Ticket';
import { Ticket, TicketType, Activity } from '../generated/schema';
import { BigDecimal, log } from '@graphprotocol/graph-ts';

// namespace ActivityType {
//   const TRANSFER = 'TRANSFER';
//   const LISTING = 'LISTING';
//   const CANCEL = 'CANCEL';
//   const SOLD = 'SOLD';
// }

export function handleNewTicket(event: NewTicket): void {
  log.info('handleNewTicket {}', [event.params.ticketID.toString()]);
  // Create ticket
  let ticket = new Ticket(event.params.ticketID.toString());
  ticket.eventID = event.params.eventID;
  ticket.ticketTypeID = event.params.ticketTypeID;
  ticket.owner = event.params.owner;
  ticket.ticketType = event.params.ticketTypeID.toString();
  ticket.forSale = false;
  ticket.save();

  // Update currentMintTickets in TicketType
  let ticketType = TicketType.load(event.params.ticketTypeID.toString());
  if (ticketType) {
    ticketType.currentMintTickets = event.params.currentMintedTicket;
    ticketType.save();
  }
}

export function handleTransferTicket(event: TransferEvent): void {
  // Create transfer activity
  let entity = new Activity(
    `${event.transaction.hash.toHex()}-${event.logIndex}`
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.ticketID = event.params.tokenId;
  entity.date = event.block.timestamp;
  entity.activityType = 'TRANSFER';
  entity.ticket = event.params.tokenId.toString();
  entity.save();

  // Update owner, forSale after transfer
  let ticket = Ticket.load(event.params.tokenId.toString());
  if (ticket) {
    ticket.owner = event.params.to;
    ticket.forSale = false;
    ticket.save();
  }
}

export function handleTicketForSale(event: TicketForSale): void {
  log.info('handleTicketForSale {}', ['true', event.params.price.toString()]);
  // Set forSale -> true, set price
  let ticket = Ticket.load(event.params.ticketID.toString());
  ticket!.forSale = true;
  ticket!.price = event.params.price.divDecimal(BigDecimal.fromString(`1000`));
  ticket!.save();

  // Create listing data for that ticket
  let entity = new Activity(
    `${event.transaction.hash.toHex()}-${event.logIndex}`
  );
  entity.price = event.params.price.divDecimal(BigDecimal.fromString(`1000`));
  entity.from = event.params.by;
  entity.ticketID = event.params.ticketID;
  entity.date = event.block.timestamp;
  entity.activityType = 'LISTING';
  entity.ticket = event.params.ticketID.toString();
  entity.save();
}

export function handleTicketSaleCancelled(event: TicketSaleCancelled): void {
  // Change forSale -> false
  let ticket = Ticket.load(event.params.ticketID.toString());
  if (ticket) {
    ticket.forSale = false;
    ticket.save();
  }

  // Create cancel data for that ticket
  let entity = new Activity(
    `${event.transaction.hash.toHex()}-${event.logIndex}`
  );
  entity.price = entity.price;
  entity.from = event.params.by;
  entity.date = event.block.timestamp;
  entity.ticketID = event.params.ticketID;
  entity.activityType = 'CANCEL';
  entity.ticket = event.params.ticketID.toString();
  entity.save();
}

export function hanldeTicketPriceChanged(event: TicketPriceChanged): void {
  log.info('hanldeTicketPriceChanged {}', [event.params.price.toString()]);
  // Update ticket price
  let ticket = Ticket.load(event.params.ticketID.toString());
  if (ticket) {
    ticket.price = event.params.price.divDecimal(BigDecimal.fromString(`1000`));
    ticket.save();
  }

  log.info('createListingData {} {} {}', [
    event.params.price.toString(),
    event.params.by.toString(),
    event.params.ticketID.toString(),
  ]);
  // Create listing data
  let entity = new Activity(
    `${event.transaction.hash.toHex()}-${event.logIndex}`
  );
  entity.price = event.params.price.divDecimal(BigDecimal.fromString(`1000`));
  entity.from = event.params.by;
  entity.ticketID = event.params.ticketID;
  entity.date = event.block.timestamp;
  entity.activityType = 'LISTING';
  entity.ticket = event.params.ticketID.toString();
  entity.save();
}

export function hanldeTicketSold(event: TicketSold): void {
  // Update forSale -> false
  let ticket = Ticket.load(event.params.ticketID.toString());
  ticket!.owner = event.params.to;
  ticket!.forSale = false;
  ticket!.save();

  // Create sold data
  let entity = new Activity(
    `${event.transaction.hash.toHex()}-${event.logIndex}`
  );
  entity.from = event.params.by;
  entity.to = event.params.to;
  entity.ticketID = event.params.ticketID;
  entity.price = event.params.price.divDecimal(BigDecimal.fromString(`1000`));
  entity.date = event.block.timestamp;
  entity.activityType = 'SOLD';
  entity.ticket = event.params.ticketID.toString();
  entity.save();
}
