interface DepositForm {
  amount: number;
  binStatus?: 'empty' | 'full';
  compostSmell?: boolean;
  dryMatter?: 'no' | 'some' | 'yes',
  notes: string;
}
