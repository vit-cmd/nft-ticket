import { IEvent } from './IEvent';

export interface ITicketType {
  eventID: number;
  name: string;
  description: string;
  hashImage: string;
  currentMintTickets: number;
  maxTicketCount: number;
  priceFactor: number;
  exist: boolean;
}

export interface ITicketTypeWithRelation {
  id: string;
  name: string;
  eventID: number;
  description: string;
  hashImage: string;
  currentMintTickets: number;
  maxTicketCount: number;
  priceFactor: number;
  event: IEvent;
}
