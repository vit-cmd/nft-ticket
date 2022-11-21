import {
  NewTicket,
  TicketForSale,
  TicketPriceChanged,
  TicketSaleCancelled,
  TicketSold,
  Transfer as TransferEvent,
  UpdateCurrentMintedTicketInTicketType,
} from '../generated/Ticket/Ticket';
import {
  Sale,
  Ticket,
  TicketType,
  Transfer,
  Listing,
  Cancel,
} from '../generated/schema';
import { BigDecimal, log } from '@graphprotocol/graph-ts';

export function handleNewTicket(event: NewTicket): void {
  log.info('handleNewTicket {}', [event.params.ticketID.toString()]);
  let entity = new Ticket(event.params.ticketID.toString());
  entity.eventID = event.params.eventID;
  entity.ticketTypeID = event.params.ticketTypeID;
  entity.owner = event.params.owner;
  entity.ticketType = event.params.ticketTypeID.toString();
  entity.forSale = false;
  entity.save();
}

export function handleUpdateCurrentMintedTicketInTicketType(
  event: UpdateCurrentMintedTicketInTicketType
): void {
  log.info('handleUpdateCurrentMintedTicketInTicketType {}', [
    event.params.ticketTypeID.toString(),
  ]);
  let entity = new TicketType(event.params.ticketTypeID.toString());
  entity.currentMintTickets = event.params.currentMintTickets;
  entity.save();
}

export function handleTransferTicket(event: TransferEvent): void {
  let entity = new Transfer(`${event.transaction.hash}-${event.logIndex}`);
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.ticketID = event.params.tokenId;
  entity.date = event.block.timestamp;
  entity.ticket = event.params.tokenId.toString();
  entity.save();

  // Update owner
  let ticket = Ticket.load(event.params.tokenId.toString());
  ticket!.owner = event.params.to;
  ticket!.save();
}

export function handleTicketForSale(event: TicketForSale): void {
  log.info('handleTicketForSale {}', ['true', event.params.price.toString()]);
  // Set forSale -> true, set price
  let ticket = Ticket.load(event.params.ticketID.toString());
  ticket!.forSale = true;
  ticket!.price = event.params.price.divDecimal(BigDecimal.fromString(`1000`));
  ticket!.save();

  // Create listing data for that ticket
  let listing = new Listing(`${event.transaction.hash}-${event.logIndex}`);
  listing.price = event.params.price.divDecimal(BigDecimal.fromString(`1000`));
  listing.from = event.params.by;
  listing.ticketID = event.params.ticketID;
  listing.date = event.block.timestamp;
  listing.ticket = event.params.ticketID.toString();
  listing.save();
}

export function handleTicketSaleCancelled(event: TicketSaleCancelled): void {
  // Change forSale -> false
  // let entity = Ticket.load(event.params.ticketID.toString());
  // entity!.forSale = false;
  // entity!.save();
  // // Create cancel data for that ticket
  // let cancel = new Cancel(`${event.transaction.hash}-${event.logIndex}`);
  // cancel.price = event.params.price;
  // cancel.from = event.params.by;
  // cancel.ticketID = event.params.ticketID;
  // cancel.save();
}

export function hanldeTicketPriceChanged(event: TicketPriceChanged): void {
  log.info('hanldeTicketPriceChanged {}', [event.params.price.toString()]);
  // Update price
  let ticket = Ticket.load(event.params.ticketID.toString());
  ticket!.price = event.params.price.divDecimal(BigDecimal.fromString(`1000`));
  ticket!.save();

  log.info('createListingData {} {} {}', [
    event.params.price.toString(),
    event.params.by.toString(),
    event.params.ticketID.toString(),
  ]);
  // Create listing data
  let listing = new Listing(`${event.transaction.hash}-${event.logIndex}`);
  listing.price = event.params.price.divDecimal(BigDecimal.fromString(`1000`));
  listing.from = event.params.by;
  listing.ticketID = event.params.ticketID;
  listing.date = event.block.timestamp;
  listing.ticket = event.params.ticketID.toString();
  listing.save();
}

export function hanldeTicketSold(event: TicketSold): void {
  // Update forSale -> false
  let ticket = Ticket.load(event.params.ticketID.toString());
  ticket!.owner = event.params.to;
  ticket!.forSale = false;
  ticket!.save();

  // Create sale data
  let sale = new Sale(`${event.transaction.hash}-${event.logIndex}`);
  sale.from = event.params.by;
  sale.to = event.params.to;
  sale.ticketID = event.params.ticketID;
  sale.price = event.params.price.divDecimal(BigDecimal.fromString(`1000`));
  sale.date = event.block.timestamp;
  sale.ticket = event.params.ticketID.toString();
  sale.save();
}
