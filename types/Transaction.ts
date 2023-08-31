export type Category = 'groceries' | 'garden'

export interface Transaction {
  id: string;
  recipientId: string
  purchaserId: string
  category: Category
  amount: number
  createdAt: string,
  reason: string
}
