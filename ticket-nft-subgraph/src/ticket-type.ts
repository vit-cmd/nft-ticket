import { NewTicketType } from '../generated/TicketType/TicketType';
import { TicketType } from '../generated/schema';

export function handleNewTicketType(event: NewTicketType): void {
  let entity = new TicketType(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.eventID = event.params.eventID;
  entity.name = event.params.name;
  entity.description = event.params.description;
  entity.hashImage = event.params.hashImage;
  entity.currentMintTickets = event.params.currentMintTickets;
  entity.maxTicketCount = event.params.maxTicketCount;
  entity.priceFactor = event.params.priceFactor;
  entity.save();
}
