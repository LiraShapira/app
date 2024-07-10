import { User } from "./User";

export enum AttendeeRole {
  seller = 'seller',
  attendee = 'attendee',
  volunteer = 'volunteer'
}

export interface Seller {
  role: AttendeeRole.seller;
  productsForSale: string[];
  user: User
  userId: string;
}

export type Attendee = {
  role: AttendeeRole.attendee | AttendeeRole.volunteer;
  user: User;
  userId: string;
} | Seller

export interface LSEvent {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  description: string;
  attendees: Attendee[]
  location: {
    name: string;
    coordinates: string;
    address: string;
    link: string;
  }
}
