export type Category = 'groceries' | 'garden'

export interface Transaction {
  recipientUserID: string
  purchaserUserID: string
  category: Category
  amount: number
  date: Date
}
