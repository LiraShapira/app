export enum Category {
  GROCERIES = 'GROCERIES',
  GARDEN = 'GARDEN',
  MISC = 'MISC',
  GIFT = 'GIFT',
  DEPOSIT = 'DEPOSIT',
}

export interface Transaction {
  id: string;
  recipientId: string;
  purchaserId: string;
  category: Category;
  amount: number;
  createdAt: string;
  reason: string;
  isRequest: boolean;
  users: [
    {
      id: string;
      userLocalCompostStandId: number
      accountBalance: number
      createdAt: string
      transactions: Transaction[]
      phoneNumber: string
      adminCompostStandId: number | null;
      firstName: string;
      lastName: string;
    }
  ]
}

export type SaveTransactionArgs = Pick<
  Transaction,
  'category' | 'amount' | 'purchaserId' | 'reason' | 'isRequest'
> & {
  recipientPhoneNumber: string;
};
