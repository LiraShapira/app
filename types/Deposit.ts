interface DepositForm {
  value: number;
  userId: string;
  binStatus?: 'empty' | 'full';
  compostSmell?: 'yes' | 'no';
  dryMatter?: 'no' | 'some' | 'yes',
  notes: string;
}
