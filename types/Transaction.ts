export type Category = 'groceries' | 'garden' | 'misc' | 'gift';

export interface Transaction {
  id: string;
  recipientId: string
  purchaserId: string
  category: Category
  amount: number
  createdAt: string,
  reason: string
}

export type saveTransactionArgs = Pick<Transaction, 'category' | 'amount' | 'purchaserId' | 'reason'> & {
  recipientPhoneNumber: string;
};
