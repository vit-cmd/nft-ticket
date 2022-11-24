import { IActivity } from './ITicketActivity';
import { ITicketTypeWithRelation } from './ITicketType';

export interface ITicketWithRelation {
  id: string;
  ticketTypeID: number;
  eventID: number;
  owner: string;
  forSale: boolean;
  price: number;
  ticketType: ITicketTypeWithRelation;
  activities: IActivity[];
}
