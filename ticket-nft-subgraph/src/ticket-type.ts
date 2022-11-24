import { NewTicketType } from '../generated/TicketType/TicketType';
import { TicketType } from '../generated/schema';
import { BigDecimal, BigInt, log } from '@graphprotocol/graph-ts';

export function handleNewTicketType(event: NewTicketType): void {
  log.info('handleNewTicketType {}', [event.params.ticketTypeID.toString()]);
  let entity = new TicketType(event.params.ticketTypeID.toString());
  entity.eventID = event.params.eventID;
  entity.name = event.params.name;
  entity.description = event.params.description;
  entity.hashImage = event.params.hashImage;
  entity.currentMintTickets = BigInt.fromString('0');
  entity.maxTicketCount = event.params.maxTicketCount;
  entity.priceFactor = event.params.price.divDecimal(
    BigDecimal.fromString(`1000`)
  );
  entity.exist = true;
  entity.event = event.params.eventID.toString();
  entity.save();
}
