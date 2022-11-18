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
