import { Transaction } from "../types/Transaction";
import { User, UserRole } from "../types/User";

export const mockTransaction: Transaction = {
  recipientId: '1234355',
  purchaserId: '1234',
  category: 'garden',
  amount: 10,
  createdAt: new Date('2023-07-05').toDateString(),
  reason: 'bought a spade',
  id: '123456'
}

export const mockTransaction2: Transaction = {
  recipientId: '1234',
  purchaserId: '1234355',
  category: 'garden',
  amount: 14,
  createdAt: new Date('2023-07-06').toDateString(),
  reason: 'bought seeds',
  id: '1234567'
}

export const mockTransaction3: Transaction = {
  recipientId: '1234',
  purchaserId: '1234355',
  category: 'groceries',
  amount: 100,
  createdAt: new Date('2023-07-08').toDateString(),
  reason: 'בקשה ממירון גלברד',
  id: '12345678'
}

export const mockUser: User = {
  firstName: 'simon',
  lastName: 'test',
  id: '1234',
  userLocalCompostStandId: 4,
  accountBalance: 154,
  createdAt: new Date('2023-07-05').toDateString(),
  transactions: [mockTransaction, mockTransaction2, mockTransaction3],
  phoneNumber: '123456789',
  role: UserRole.ADMIN
}

export const mockUser2: User = {
  firstName: 'Bill',
  lastName: 'Withers',
  id: '1234355',
  userLocalCompostStandId: 4,
  accountBalance: 200,
  createdAt: new Date('2023-07-05').toDateString(),
  transactions: [mockTransaction, mockTransaction2, mockTransaction3],
  phoneNumber: '987654321',
  role: UserRole.BASIC
}

export const mockTransactions: Transaction[] = [mockTransaction, mockTransaction2, mockTransaction3]
