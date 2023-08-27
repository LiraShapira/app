import { Transaction } from "./Transaction"

export interface User {
  userID: string
  firstName: string
  lastName: string
  userLocalCompostStand: number
  accountBalance: number
  dateJoined: string
  transactions: Transaction[]
  phoneNumber: string
}

export type FetchUserArgs = Pick<User, 'firstName' | 'lastName' | 'phoneNumber'>
