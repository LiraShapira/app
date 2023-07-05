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
