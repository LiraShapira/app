import { Transaction } from "../types/Transaction";
import { User } from "../types/User";

export const mockTransaction: Transaction = {
  recipientUserID: '1234355',
  purchaserUserID: '1234',
  category: 'garden',
  amount: 10,
  date: new Date('2023-07-05').toDateString(),
  reason: 'bought a spade'
}

export const mockTransaction2: Transaction = {
  recipientUserID: '1234',
  purchaserUserID: '1234355',
  category: 'garden',
  amount: 14,
  date: new Date('2023-07-06').toDateString(),
  reason: 'bought seeds'
}

export const mockTransaction3: Transaction = {
  recipientUserID: '1234',
  purchaserUserID: '1234355',
  category: 'groceries',
  amount: 100,
  date: new Date('2023-07-08').toDateString(),
  reason: 'בקשה ממירון גלברד'
}

export const mockUser: User = {
  userName: 'shimon',
  userID: '1234',
  userLocalCompostStand: 4,
  accountBalance: 154,
  dateJoined: new Date('2023-07-05').toDateString(),
  transactions: [mockTransaction, mockTransaction2, mockTransaction3],
}

export const mockUser2: User = {
  userName: 'Bill',
  userID: '1234355',
  userLocalCompostStand: 4,
  accountBalance: 200,
  dateJoined: new Date('2023-07-05').toDateString(),
  transactions: [mockTransaction, mockTransaction2, mockTransaction3],
}

export const mockTransactions: Transaction[] = [mockTransaction, mockTransaction2, mockTransaction3]
