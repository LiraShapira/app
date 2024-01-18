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
        firstName: string;
        lastName: string;
      }
  ]
}

export type saveTransactionArgs = Pick<
  Transaction,
  'category' | 'amount' | 'purchaserId' | 'reason'
> & {
  recipientPhoneNumber: string;
};
