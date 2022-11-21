import { ITicketType } from './ITicketType';

export interface IEvent {
  description: string;
  endDay: number;
  eventManager: string;
  id: number;
  hashImage: string;
  location: string;
  name: number;
  startDay: number;
  exist: boolean;
  ticketTypes?: ITicketType[];
}
