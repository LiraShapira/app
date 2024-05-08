import { User } from "./User";

interface Seller {
  role: 'seller';
  productsForSale: string[];
  user: User
}

export type Attendee = {
  role: 'attendee' | 'volunteer';
  user: User
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
  }
}
