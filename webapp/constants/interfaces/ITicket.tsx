import { ITicketTypeWithRelation } from './ITicketType';

export interface ITicketWithRelation {
  id: string;
  ticketTypeID: number;
  eventID: number;
  ticketType: ITicketTypeWithRelation;
}
