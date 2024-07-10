import { Transaction } from "./Transaction"

export enum UserRole {
  BASIC,
  ADMIN
}

export interface User {
  id: string
  firstName: string
  lastName: string
  role: UserRole
  userLocalCompostStandId: number
  accountBalance: number
  createdAt: string
  transactions: Transaction[]
  phoneNumber: string
  adminCompostStandId: number | null;
}

export interface FetchUserArgs {
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
}
