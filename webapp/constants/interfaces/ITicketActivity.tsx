export interface IActivity {
  id: string;
  ticketID: number;
  from: string;
  to: string;
  date: number;
  price: number;
  activityType: ActivityType;
}

enum ActivityType {
  TRANSFER = 'TRANSFER',
  LISTING = 'LISTING',
  CANCEL = 'CANCEL',
  SOLD = 'SOLD',
}
