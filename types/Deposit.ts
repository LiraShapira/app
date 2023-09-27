interface DepositForm {
  amount: number;
  binStatus?: 'empty' | 'full';
  compostSmell?: 'yes' | 'no';
  dryMatter?: 'no' | 'some' | 'yes',
  notes?: string;
}
