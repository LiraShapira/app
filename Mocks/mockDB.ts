import { Transaction } from "../types/Transaction";
import { User } from "../types/User";

export const mockUser: User = {
  userName: 'shimon',
  userID: '1234',
  userLocalCompostStand: 4,
  accountBalance: 200,
  dateJoined: new Date('2023-07-05'),
  transactions: []
}

export const mockTransaction: Transaction = {
  recipientUserID: '1234355',
  purchaserUserID: '1234',
  category: 'garden',
  amount: 10,
  date: new Date('2023-07-05')
}

export const mockTransaction2: Transaction = {
  recipientUserID: '1234',
  purchaserUserID: '1234355',
  category: 'garden',
  amount: 14,
  date: new Date('2023-07-06')
}

export const mockTransaction3: Transaction = {
  recipientUserID: '1234',
  purchaserUserID: '1234355',
  category: 'groceries',
  amount: 100,
  date: new Date('2023-07-08')
}

export const mockTransactions: Transaction[] = [mockTransaction, mockTransaction2, mockTransaction3]
